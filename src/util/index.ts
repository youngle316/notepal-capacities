export const formatBookDetail = (
  review: Reviews[],
  bookmark: Bookmark[],
  chapters: Chapter[],
) => {
  if (chapters.length === 0) {
    return [];
  }
  const sortedChapters = [...chapters].sort(
    (a, b) => a.chapterUid - b.chapterUid,
  );
  const sortedReviews = [...review].sort(
    (a, b) => a.review.createTime - b.review.createTime,
  );
  const sortedBookmarks = [...bookmark].sort(
    (a, b) => a.createTime - b.createTime,
  );

  const chaptersWithContent = sortedChapters.map((chapter) => {
    const chapterContent = {
      reviews: sortedReviews.filter(
        (r) => r.review.chapterUid === chapter.chapterUid,
      ),
      bookmarks: sortedBookmarks.filter(
        (b) => b.chapterUid === chapter.chapterUid,
      ),
    };
    return {
      ...chapter,
      Content: chapterContent,
    };
  });

  console.log("chaptersWithContent", chaptersWithContent);

  return chaptersWithContent;
};

export const getColorStyle = (style: number) => {
  switch (style) {
    case 1:
      return "#fb7185";
    case 2:
      return "#a78bfa";
    case 3:
      return "#60a5fa";
    case 4:
      return "#4ade80";
    case 5:
      return "#fbbf24";
    default:
      return "#fb7185";
  }
};
