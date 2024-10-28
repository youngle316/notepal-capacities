interface ChapterWithContent {
  Content: {
    reviews: Reviews[];
    bookmarks: Bookmark[];
  };
  bookId: string;
  chapterIdx: number;
  chapterUid: number;
  title: string;
}

interface ChapterWithoutBookmarks {
  chapterIdx: number;
  chapterTitle: string;
  reviews: Reviews[];
}

export const convertToMarkdown = (
  chaptersWithContent: ChapterWithContent[],
  bookInfo: Book,
) => {
  const authorInfo = bookInfo.author ? `作者：${bookInfo.author}\n\n` : "";
  const markdown = chaptersWithContent
    .map((chapter) => {
      const chapterTitle = `### ${chapter.title}\n\n`;

      const reviews = chapter.Content.reviews
        .map(
          (review) =>
            `${review.review.abstract}\n\n> ${review.review.content}\n`,
        )
        .join("\n");

      const bookmarks = chapter.Content.bookmarks.length
        ? `\n${chapter.Content.bookmarks
            .map((bookmark) => `${bookmark.markText}`)
            .join("\n\n")}`
        : "";

      return `${chapterTitle}${reviews}${bookmarks}`;
    })
    .join("\n\n");

  return `${authorInfo}${markdown}`;
};

export const convertToMarkdownWithoutBookmarks = (
  chaptersWithContent: ChapterWithoutBookmarks[],
  bookInfo: Book,
) => {
  const authorInfo = bookInfo.author ? `作者：${bookInfo.author}\n\n` : "";

  const markdown = chaptersWithContent
    .map((chapter) => {
      const chapterTitle = `### ${chapter.chapterTitle}\n\n`;
      const reviews = chapter.reviews
        .map((review) => convertSingleToMarkdown(review.review))
        .join("\n\n");
      return `${chapterTitle}${reviews}`;
    })
    .join("\n\n");

  return `${authorInfo}${markdown}`;
};

export const convertSingleToMarkdown = (review: Review) => {
  return `${review.abstract}\n\n> ${review.content}\n`;
};
