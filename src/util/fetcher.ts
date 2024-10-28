export const clientFetcher = (url: string) =>
  fetch(url).then((res) => res.json());

export const clientFetcherWithToken = ([url, token]: [string, string]) => {
  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then((res) => res.json());
};
