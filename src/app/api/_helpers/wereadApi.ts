import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function fetchWereadApi(url: string) {
  try {
    const cookieStore = await cookies();
    const allCookies = cookieStore.getAll();

    const headers = new Headers();
    for (const cookie of allCookies) {
      headers.append("Cookie", `${cookie.name}=${cookie.value}`);
    }

    const response = await fetch(url, { headers });

    if (!response.ok) {
      return NextResponse.json(
        { error: `Weread API error: ${response.status}` },
        { status: response.status },
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Weread:", error);
    return NextResponse.json(
      {
        error: "Failed to fetch data from Weread",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    );
  }
}
