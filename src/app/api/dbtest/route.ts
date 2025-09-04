import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { RowDataPacket } from "mysql2";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  image: string;
};

export async function GET() {
  try {
    const [rows] = await pool.query<RowDataPacket[]>(
      "SELECT id, name, address, city, image FROM schools"
    );

    return NextResponse.json(rows as School[]);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
