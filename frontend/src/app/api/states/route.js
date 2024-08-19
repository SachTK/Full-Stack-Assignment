import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const data = await request.json();
    const response = await axios.post("http://localhost:3001/api/states", data);

    return NextResponse.json(response.data);
  } catch (error) {
    return NextResponse.json({ error: "Failed to submit form data" }, { status: 500 });
  }
}
