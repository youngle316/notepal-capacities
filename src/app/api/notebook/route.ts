import { NextResponse } from "next/server";
import { fetchWereadApi } from "../_helpers/wereadApi";
export async function GET(request: Request) {
  try {
    const response = await fetchWereadApi(
      "https://i.weread.qq.com/user/notebooks",
    );

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Weread:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Weread" },
      { status: 500 },
    );
  }
}
