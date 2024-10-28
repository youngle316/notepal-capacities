import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    // 获取请求体数据
    const body = await request.json();
    const token = request.headers.get("Authorization")?.split(" ")[1];

    const response = await fetch("https://api.capacities.io/save-weblink", {
      method: "POST",
      body: JSON.stringify(body),
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    );
  }
}
