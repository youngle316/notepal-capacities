import { SettingsDialog } from "@/components/settings";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useUserInfoStore } from "@/store/main";
import { clearAllCookies } from "@/util/cookies";
import { Github, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Header() {
  const { userInfo } = useUserInfoStore();
  const router = useRouter();
  const handleLogout = () => {
    clearAllCookies();
    router.push("/login");
  };

  const goHome = () => {
    router.push("/");
  };

  const goSettings = () => {
    router.push("/settings");
  };

  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <div>
          <Avatar className="h-12 w-12 cursor-pointer" onClick={goHome}>
            <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
            <AvatarFallback>{userInfo.name}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-gray-500 text-sm">Hi</div>
          <div className="font-bold">{userInfo.name}</div>
        </div>
      </div>
      <div className="flex gap-2">
        <Button
          onClick={() =>
            window.open("https://github.com/youngle316/notepal-capacities")
          }
          variant="outline"
          size="icon"
        >
          <Github />
        </Button>
        <SettingsDialog />
        <Button onClick={handleLogout} variant="outline" size="icon">
          <LogOut />
        </Button>
      </div>
    </div>
  );
}
