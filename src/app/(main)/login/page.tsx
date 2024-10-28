"use client";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { setWereadCookie } from "@/util/cookies";
import { MoveRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Login() {
  const [cookie, setCookie] = useState("");
  const router = useRouter();
  const handleSetCookie = () => {
    setWereadCookie(cookie);
    router.push("/");
  };

  return (
    <>
      <div className="flex h-full w-full flex-col gap-4 pt-40 text-center">
        <div className="flex items-center justify-center">
          <img src="/logo.png" alt="logo" className="h-16 w-16" />
        </div>
        <div className="font-bold text-4xl">BookCities</div>
        <div className="flex items-center justify-center gap-2 text-md">
          WeRead <MoveRight /> Capacities
        </div>
      </div>
      <div className="mt-20 flex flex-col gap-4">
        <Textarea
          placeholder="请输入微信读书的 Cookie"
          value={cookie}
          onChange={(e) => setCookie(e.target.value)}
        />
        <Button onClick={handleSetCookie}>保存</Button>
      </div>
    </>
  );
}
