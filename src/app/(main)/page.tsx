"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useNotebooksStore, useUserInfoStore } from "@/store/main";
import { getWereadUserId, setWereadCookie } from "@/util/cookies";
import { clientFetcher } from "@/util/fetcher";
import { useEffect, useState } from "react";
import useSWR from "swr";
import Header from "./header";
import Notebooks from "./notebooks";
export default function Home() {
  const [wrVid, setWrVid] = useState<string | null>(null);
  const [cookie, setCookie] = useState<string>("");

  const { setUserInfo } = useUserInfoStore();
  const { setNotebooks } = useNotebooksStore();

  useEffect(() => {
    const wereadUserId = getWereadUserId();
    if (wereadUserId) {
      setWrVid(wereadUserId);
    }
  }, []);

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

  const handleSetCookie = () => {
    setWereadCookie(cookie);
  };

  if (!wrVid || data?.errCode)
    return (
      <div>
        <Textarea value={cookie} onChange={(e) => setCookie(e.target.value)} />
        <Button onClick={handleSetCookie}>Button</Button>
      </div>
    );
  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="flex flex-col gap-4">
      <Header />
      <Notebooks />
    </div>
  );
}
