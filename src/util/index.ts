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

  return chaptersWithContent;
};

export const formatDetailWithoutChapter = (review: Reviews[]) => {
  if (!review || review.length === 0) {
    return [];
  }
  const uniqueChapters = Array.from(
    review
      .reduce((map, r) => {
        map.set(r.review.chapterIdx, {
          chapterIdx: r.review.chapterIdx,
          chapterTitle: r.review.chapterTitle,
        });
        return map;
      }, new Map())
      .values(),
  ).sort((a, b) => a.chapterIdx - b.chapterIdx);

  return uniqueChapters.map(({ chapterIdx, chapterTitle }) => {
    const chapterReviews = review
      .filter((r) => r.review.chapterIdx === chapterIdx)
      .sort((a, b) => a.review.createTime - b.review.createTime);

    return {
      chapterIdx,
      chapterTitle,
      reviews: chapterReviews,
    };
  });
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
