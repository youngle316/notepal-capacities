import { NextResponse } from "next/server";
import { fetchWereadApi } from "../_helpers/wereadApi";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userVid = searchParams.get("userVid");

  if (!userVid) {
    return NextResponse.json({ error: "userVid is required" }, { status: 400 });
  }

  try {
    const response = await fetchWereadApi(
      `https://weread.qq.com/web/user?userVid=${userVid}`,
    );

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
