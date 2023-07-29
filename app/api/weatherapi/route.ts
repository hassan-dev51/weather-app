import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const city = searchParams.get("q");
  const apikey = process.env.WEATHER_API_KEY;

  try {
    if (!apikey) {
      return NextResponse.json("Api key is required", { status: 500 });
    }

    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${apikey}&units=metric`
    );
    const data = await res.json();

    if (data?.name?.toLowerCase() !== city?.toLowerCase()) {
      return new NextResponse(JSON.stringify({ error: "CityName not found" }), {
        status: 404,
      });
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.log((error as { message: string }).message);
    return NextResponse.json("Error in get request");
  }
}
