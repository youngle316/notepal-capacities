"use client";
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

  useEffect(() => {
    const wereadUserId = getWereadUserId();
    if (wereadUserId) {
      setWrVid(wereadUserId);
    } else {
      router.push("/login");
    }
  }, [router]);

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
    "/api/notebook",
    clientFetcher
  );

  useEffect(() => {
    if (notebooks && !notebooksLoading) {
      setNotebooks(notebooks.books);
    }
  }, [notebooks, notebooksLoading, setNotebooks]);

  if (isLoading) return <div>Loading...</div>;

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
