"use client";
import Loading from "@/components/ui/loading";
import { useNotebooksStore, useUserInfoStore } from "@/store/main";
import { getWereadUserId } from "@/util/cookies";
import { clientFetcher } from "@/util/fetcher";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "./header";
import Notebooks from "./notebooks";

export default function Home() {
  const [wrVid, setWrVid] = useState<string | null>(null);
  const router = useRouter();

  const { setUserInfo } = useUserInfoStore();
  const { notebooks: allNoteBooks, setNotebooks } = useNotebooksStore();

  // biome-ignore lint/correctness/useExhaustiveDependencies:
  useEffect(() => {
    const wereadUserId = getWereadUserId();
    if (wereadUserId) {
      setWrVid(wereadUserId);
    }
    if (data?.error || notebooks?.error || !wereadUserId) {
      router.push("/login");
    }
  }, [router, wrVid]);

  const { data, isLoading } = useSWR(
    wrVid ? `/api/userInfo?userVid=${wrVid}` : null,
    clientFetcher
  );

  useEffect(() => {
    if (data && !isLoading) {
      setUserInfo(data);
    }
  }, [data, isLoading, setUserInfo]);

  const { data: notebooks, isLoading: notebooksLoading } = useSWR(
    wrVid ? "/api/notebook" : null,
    clientFetcher
  );

  useEffect(() => {
    if (notebooks && !notebooksLoading) {
      setNotebooks(notebooks.books);
    }
  }, [notebooks, notebooksLoading, setNotebooks]);

  if (!wrVid || isLoading || notebooksLoading)
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <Loading />
      </div>
    );

  return (
    <div className="flex flex-col gap-4">
      {allNoteBooks?.length > 0 && (
        <>
          <Header />
          <Notebooks />
        </>
      )}
    </div>
  );
}
