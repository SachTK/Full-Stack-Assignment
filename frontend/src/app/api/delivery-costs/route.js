import axios from "axios";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const response = await axios.get("http://localhost:3001/api/delivery-costs");
    return NextResponse.json(response.data);
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch delivery costs" }, { status: 500 });
  }
}
