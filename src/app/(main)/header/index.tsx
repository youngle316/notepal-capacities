import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useUserInfoStore } from "@/store/main";

export default function Header() {
  const { userInfo } = useUserInfoStore();
  return (
    <div className="flex items-center justify-between">
      <div className="flex gap-2">
        <div>
          <Avatar className="h-12 w-12">
            <AvatarImage src={userInfo.avatar} alt={userInfo.name} />
            <AvatarFallback>{userInfo.name}</AvatarFallback>
          </Avatar>
        </div>
        <div className="flex flex-col justify-between">
          <div className="text-gray-500 text-sm">Hi</div>
          <div className="font-bold">{userInfo.name}</div>
        </div>
      </div>
    </div>
  );
}
