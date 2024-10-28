import { type NextRequest, NextResponse } from "next/server";
import { fetchWereadApi } from "../_helpers/wereadApi";

export async function GET(request: NextRequest) {
  const bookId = request.nextUrl.searchParams.get("bookId");

  try {
    const bookmarkListUrl = `https://i.weread.qq.com/book/bookmarklist?bookId=${bookId}`;
    const response = await fetchWereadApi(bookmarkListUrl);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching book details:", error);
    return NextResponse.json(
      { error: "Failed to fetch book details" },
      { status: 500 },
    );
  }
}
