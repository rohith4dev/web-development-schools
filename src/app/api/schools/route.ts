import { NextResponse } from "next/server";
import { pool } from "@/lib/db";

// GET all schools
export async function GET() {
  const [rows] = await pool.query("SELECT * FROM schools");
  return NextResponse.json(rows);
}

// POST new school
export async function POST(req: Request) {
  const { name, address, city, state, contact, email } = await req.json();
  const [result] = await pool.query(
    `INSERT INTO schools (name, address, city, state, contact, email)
     VALUES (?, ?, ?, ?, ?, ?)`,
    [name, address, city, state, contact, email]
  );

  return NextResponse.json({ message: "School added", id: (result as any).insertId });
}
