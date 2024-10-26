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
