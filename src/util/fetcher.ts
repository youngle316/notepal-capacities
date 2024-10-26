export const clientFetcher = (url: string) =>
  fetch(url).then((res) => res.json());
