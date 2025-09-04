import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

export async function GET() {
  try {
    const result = await pool.query(
      `SELECT * FROM school_db.schools ORDER BY id DESC LIMIT 1;`
    );
    const rows = Array.isArray(result[0]) ? result[0] : result;

    return NextResponse.json(rows[0] || {});
  } catch (error) {
    console.error("Error fetching recent school:", error);
    return NextResponse.json(
      { error: "Failed to fetch recently added school" },
      { status: 500 }
    );
  }
}
