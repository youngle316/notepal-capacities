import { Loader } from "lucide-react";

export default function Loading() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Loader className="animate-spin" />
    </div>
  );
}
