import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const token = request.headers.get("Authorization")?.split(" ")[1];
  try {
    const response = await fetch("https://api.capacities.io/spaces", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching data from Capacities:", error);
    return NextResponse.json(
      { error: "Failed to fetch data from Capacities" },
      { status: 500 },
    );
  }
}
