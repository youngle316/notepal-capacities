"use client";
import { SettingsDialog } from "@/components/settings";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { formatBookDetail, getColorStyle } from "@/util";
import { clientFetcher } from "@/util/fetcher";
import { convertToMarkdown } from "@/util/markdown";
import {
  ChevronLeft,
  LetterText,
  LoaderPinwheel,
  RefreshCw,
  Speech,
} from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useSWR from "swr";

export default function BookDetail() {
  const [isSyncing, setIsSyncing] = useState(false);

  const params = useParams();
  const bookId = params.bookId as string;
  const router = useRouter();

  const { data: bookmarkList, isLoading: bookmarkListLoading } = useSWR(
    `/api/bookmarklist?bookId=${bookId}`,
    clientFetcher
  );

  const { data: reviewList, isLoading: reviewListLoading } = useSWR(
    `/api/reviewlist?bookId=${bookId}`,
    clientFetcher
  );

  const handleBack = () => {
    router.push("/");
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    if (bookmarkList?.errCode || reviewList?.error) {
      router.push("/");
    }
  }, [bookmarkList, reviewList]);

  if (bookmarkListLoading || reviewListLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );
  }

  const bookInfo = bookmarkList?.book as Book;
  const reviewInfo = reviewList?.reviews as Reviews[];
  const bookmarkInfo = bookmarkList?.updated as Bookmark[];
  const chapterInfo = (bookmarkList?.chapters as Chapter[]) || [];

  if (chapterInfo.length === 0) {
    return <div>No chapters</div>;
  }

  const chaptersWithContent = formatBookDetail(
    reviewInfo,
    bookmarkInfo,
    chapterInfo
  );

  const handleSync = async () => {
    const token = window.localStorage.getItem("capacities_token");
    const selectedSpace = window.localStorage.getItem("capacities_space");

    if (!selectedSpace) {
      // TODO: 提示用户选择空间
      return;
    }
    const markdown = convertToMarkdown(chaptersWithContent, bookInfo);
    const data = {
      spaceId: selectedSpace,
      url: "https://book.douban.com/subject/36284266/",
      titleOverwrite: bookInfo?.title,
      descriptionOverwrite: "",
      tags: [],
      mdText: markdown,
    };
    setIsSyncing(true);
    fetch("/api/saveWeblink", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success("同步成功, 请在 Capacities-Weblinks 中查看");
      })
      .catch(() => {
        toast.error("同步失败");
      })
      .finally(() => {
        setIsSyncing(false);
      });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center justify-between gap-2">
        <Button onClick={handleBack} variant="outline" size="icon">
          <ChevronLeft />
        </Button>
        <SettingsDialog />
      </div>
      <div className="flex flex-col items-center justify-center gap-6">
        <div>
          <Image
            src={bookInfo?.cover}
            alt={bookInfo?.title}
            width={140}
            height={200}
          />
        </div>
        <div className="flex flex-col items-center gap-2">
          <div className="font-bold text-lg">{bookInfo?.title} </div>
          <div className="text-gray-500 text-sm">{bookInfo?.author}</div>
        </div>
      </div>
      <div className="flex items-center justify-between gap-2">
        <div className="flex gap-2">
          <span className="text-gray-500 text-sm">
            {reviewInfo.length} 条想法
          </span>
          <span className="text-gray-500 text-sm">
            {bookmarkInfo.length} 条划线
          </span>
        </div>
        <div>
          <Button disabled={isSyncing} onClick={handleSync}>
            {isSyncing && <RefreshCw className="animate-spin" />}
            全部同步
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        {chaptersWithContent.map((chapter) => (
          <div key={chapter.chapterUid} className="flex flex-col gap-2">
            <div className="font-bold text-lg">{chapter.title}</div>
            <div className="flex flex-col gap-2">
              {chapter.Content.reviews.map((review) => (
                <div key={review.reviewId}>
                  <Review review={review.review} />
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              {chapter.Content.bookmarks.map((bookmark) => (
                <div key={bookmark.bookmarkId}>
                  <Bookmark bookmark={bookmark} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

const Review = ({ review }: { review: Review }) => {
  const handleSync = () => {
    const token = window.localStorage.getItem("capacities_token");
    const selectedSpace = window.localStorage.getItem("capacities_space");

    const data = {
      spaceId: selectedSpace,
      mdText: `${review.abstract}\n\n> ${review.content}\n`,
      origin: "commandPalette",
      noTimeStamp: true,
    };
    fetch("/api/saveToDailyNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success("同步成功, 请在 Capacities-DailyNotes 中查看");
      })
      .catch(() => {
        toast.error("同步失败");
      })
      .finally(() => {});
  };

  return (
    <div className="flex justify-between gap-3 rounded-lg bg-foreground/5 p-4">
      <div className="flex gap-3">
        <div>
          <Speech className="rounded-lg bg-gray-300 p-1" />
        </div>
        <div className="flex flex-col gap-3">
          <div>{review.abstract}</div>
          <div className="border-gray-500 border-l-2 pl-2 text-gray-500 text-sm">
            {review.content}
          </div>
        </div>
      </div>
      <div className="flex items-end">
        <LoaderPinwheel
          onClick={handleSync}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
    </div>
  );
};

const Bookmark = ({ bookmark }: { bookmark: Bookmark }) => {
  const renderStyle = (): CSSProperties => {
    if (bookmark.style === 0) {
      return {
        textDecoration: "underline",
        textUnderlineOffset: "4px",
        textDecorationColor: getColorStyle(bookmark.colorStyle),
      };
    }
    if (bookmark.style === 1) {
      return {
        backgroundColor: getColorStyle(bookmark.colorStyle),
      };
    }
    if (bookmark.style === 2) {
      return {
        textDecoration: "underline wavy",
        textDecorationThickness: "1px",
        textDecorationStyle: "wavy",
        textUnderlineOffset: "4px",
        textDecorationColor: getColorStyle(bookmark.colorStyle),
      };
    }
    return {
      backgroundColor: getColorStyle(bookmark.colorStyle),
    };
  };

  const handleSync = () => {
    const token = window.localStorage.getItem("capacities_token");
    const selectedSpace = window.localStorage.getItem("capacities_space");

    const data = {
      spaceId: selectedSpace,
      mdText: `${bookmark.markText}`,
      origin: "commandPalette",
      noTimeStamp: true,
    };

    fetch("/api/saveToDailyNote", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    })
      .then(() => {
        toast.success("同步成功, 请在 Capacities-DailyNotes 中查看");
      })
      .catch(() => {
        toast.error("同步失败");
      })
      .finally(() => {});
  };

  return (
    <div className="flex justify-between gap-3 rounded-lg bg-foreground/5 p-4">
      <div className="flex gap-3">
        <div>
          <LetterText className="rounded-lg bg-gray-300 p-1" />
        </div>
        <div style={renderStyle()}>{bookmark.markText}</div>
      </div>

      <div className="flex items-end">
        <LoaderPinwheel
          onClick={handleSync}
          className="h-6 w-6 cursor-pointer"
        />
      </div>
    </div>
  );
};
