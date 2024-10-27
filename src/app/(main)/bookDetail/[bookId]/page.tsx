"use client";
import { Button } from "@/components/ui/button";
import Loading from "@/components/ui/loading";
import { formatBookDetail, getColorStyle } from "@/util";
import { clientFetcher } from "@/util/fetcher";
import { ChevronLeft, LetterText, Speech } from "lucide-react";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import type { CSSProperties } from "react";
import { useEffect } from "react";
import useSWR from "swr";

export default function BookDetail() {
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
    return <Loading />;
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

  return (
    <div className="flex flex-col gap-5">
      <div className="flex items-center gap-2">
        <Button onClick={handleBack} variant="outline" size="icon">
          <ChevronLeft />
        </Button>
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
  return (
    <div className="flex gap-3 rounded-lg bg-foreground/5 p-4">
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

  return (
    <div className="flex gap-3 rounded-lg bg-foreground/5 p-4">
      <div>
        <LetterText className="rounded-lg bg-gray-300 p-1" />
      </div>
      <div style={renderStyle()}>{bookmark.markText}</div>
    </div>
  );
};
