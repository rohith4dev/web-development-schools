import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";
export async function GET() {
  try {
    const [rows] = await pool.query("SELECT id, name, address, city, image FROM schools");
    return NextResponse.json(rows);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
