import { create } from "zustand";

interface UserInfo {
  name: string;
  avatar: string;
}

interface Notebook {
  book: {
    bookId: string;
    title: string;
    author: string;
    cover: string;
  };
  bookId: string;
  noteCount: number;
  reviewCount: number;
}

export interface Space {
  id: string;
  title: string;
}

export const useUserInfoStore = create<{
  userInfo: UserInfo;
  setUserInfo: (userInfo: UserInfo) => void;
}>((set) => ({
  userInfo: {
    name: "",
    avatar: "",
  },
  setUserInfo: (info: UserInfo) => set({ userInfo: info }),
}));

export const useNotebooksStore = create<{
  notebooks: Notebook[];
  setNotebooks: (notebooks: Notebook[]) => void;
}>((set) => ({
  notebooks: [],
  setNotebooks: (notebooks) => set({ notebooks }),
}));

export const useSettingsStore = create<{
  token: string;
  setToken: (token: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}>((set) => ({
  token: "",
  setToken: (token) => set({ token }),
  open: false,
  setOpen: (open) => set({ open }),
}));

export const useSpacesStore = create<{
  spaces: Space[];
  setSpaces: (spaces: Space[]) => void;
  selectedSpace: string;
  setSelectedSpace: (space: string) => void;
}>((set) => ({
  spaces: [],
  setSpaces: (spaces) => set({ spaces }),
  selectedSpace: "",
  setSelectedSpace: (space) => set({ selectedSpace: space }),
}));
