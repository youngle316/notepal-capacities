import { type NextRequest, NextResponse } from "next/server";
import { fetchWereadApi } from "../_helpers/wereadApi";

export async function GET(request: NextRequest) {
  const bookId = request.nextUrl.searchParams.get("bookId");

  try {
    // 调用第一个接口：获取书籍详情
    const reviewListUrl = `https://i.weread.qq.com/review/list?bookId=${bookId}&listType=11&mine=1&synckey=0&listMode=0`;
    const response = await fetchWereadApi(reviewListUrl);

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
