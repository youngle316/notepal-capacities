import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type Space, useSettingsStore, useSpacesStore } from "@/store/main";
import { clientFetcherWithToken } from "@/util/fetcher";
import { Settings } from "lucide-react";
import { useEffect } from "react";
import useSWR from "swr";
import Loading from "../ui/loading";

export function SettingsDialog() {
  const { open, setOpen, token, setToken } = useSettingsStore();
  const {
    spaces: allSpaces,
    setSpaces,
    selectedSpace,
    setSelectedSpace,
  } = useSpacesStore();

  useEffect(() => {
    const token = window.localStorage.getItem("capacities_token");
    const space = window.localStorage.getItem("capacities_space");
    if (token) {
      setToken(token);
    }
    if (space) {
      setSelectedSpace(space);
    }
  }, [setToken, setSelectedSpace]);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    window.localStorage.setItem("capacities_token", e.target.value);
    setToken(e.target.value);
  };

  const { data: spaces, isLoading: spacesLoading } = useSWR(
    token && open ? ["/api/spaces", token] : null,
    clientFetcherWithToken
  );

  useEffect(() => {
    if (spaces && !spacesLoading) {
      setSpaces(spaces?.spaces);
    }
  }, [spaces, spacesLoading, setSpaces]);

  const onSpaceChange = (value: string) => {
    setSelectedSpace(value);
    window.localStorage.setItem("capacities_space", value);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <Settings />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>同步设置</DialogTitle>
          {/* <DialogDescription>同步设置</DialogDescription> */}
        </DialogHeader>
        <div className="grid w-full items-center gap-2">
          <Label htmlFor="token">Capacities API Token</Label>
          <Input
            value={token}
            className="w-full"
            type="text"
            id="token"
            placeholder="Token"
            onChange={onChange}
          />
        </div>
        {spacesLoading ? (
          <div className="flex w-full items-center justify-center">
            <Loading />
          </div>
        ) : (
          <div className="grid w-full items-center gap-2">
            <Label htmlFor="space">选择 Spaces</Label>
            <Select
              defaultValue={selectedSpace}
              value={selectedSpace}
              onValueChange={onSpaceChange}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="选择 Spaces" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {allSpaces?.map((space: Space) => (
                    <SelectItem key={space.id} value={space.id}>
                      {space.title}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
