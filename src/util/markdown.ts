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

export const convertSingleToMarkdown = (review: Review) => {
  return `${review.abstract}\n\n> ${review.content}\n`;
};
