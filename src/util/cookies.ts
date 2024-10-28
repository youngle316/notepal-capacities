import { destroyCookie, parseCookies, setCookie } from "nookies";

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function getWereadUserId(ctx?: any) {
  const cookies = parseCookies(ctx);
  const wereadCookie = cookies.wr_vid || "";

  return wereadCookie || "";
}

// biome-ignore lint/suspicious/noExplicitAny: <explanation>
export function setWereadCookie(wereadCookie: string, ctx?: any) {
  const isServer = typeof window === "undefined";

  const cookiePairs = wereadCookie.split(";");

  for (const pair of cookiePairs) {
    const [name, value] = pair.trim().split("=");
    if (name && value) {
      setCookie(ctx, name, value, {
        maxAge: 30 * 24 * 60 * 60,
        path: "/",
        secure: true,
        httpOnly: isServer,
        sameSite: "strict",
      });
    }
  }
}

export function clearAllCookies() {
  const cookies = parseCookies();

  for (const cookieName of Object.keys(cookies)) {
    destroyCookie(null, cookieName);
  }
}
