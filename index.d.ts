interface Chapter {
  bookId: string;
  chapterIdx: number;
  chapterUid: number;
  title: string;
}

interface Bookmark {
  chapterUid: number;
  markText: string;
  createTime: number;
  bookmarkId: string;
  colorStyle: 1 | 2 | 3 | 4 | 5;
  style: 0 | 1 | 2;
}

interface Review {
  abstract: string;
  content: string;
  createTime: number;
  chapterUid: number;
  chapterTitle: string;
  chapterIdx: number;
}

interface Reviews {
  review: Review;
  reviewId: string;
}

interface Book {
  bookId: string;
  title: string;
  cover: string;
  author: string;
}
