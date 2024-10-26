import { useNotebooksStore } from "@/store/main";
import { ChevronRight, LoaderPinwheel } from "lucide-react";
import Image from "next/image";

export default function Notebooks() {
  const { notebooks } = useNotebooksStore();

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {notebooks.map((notebook) => (
        <div
          className="flex items-center gap-4 rounded-lg bg-foreground/5 p-5"
          key={notebook.bookId}
        >
          <div className="">
            <Image
              src={notebook.book.cover}
              alt={notebook.book.title}
              width={58}
              height={86}
              className="rounded-lg bg-cover object-cover"
            />
          </div>
          <div className="flex min-w-[0] flex-1 flex-col justify-between">
            <div className="flex flex-col gap-2">
              <div className="w-full truncate font-bold text-lg ">
                {notebook.book.title}
              </div>
              <div className="truncate text-foreground/50">
                {notebook.book.author}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div>
                <span className="font-bold text-lg">{notebook.noteCount}</span>{" "}
                条划线
              </div>
              <div>|</div>
              <div>
                <span className="font-bold text-lg">
                  {notebook.reviewCount}
                </span>{" "}
                条想法
              </div>
            </div>
          </div>
          <div className="flex h-full flex-col items-center justify-between gap-2">
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-foreground/5">
              <ChevronRight />
            </div>
            <div className="flex h-8 w-8 cursor-pointer items-center justify-center rounded-full hover:bg-foreground/5">
              <LoaderPinwheel />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
