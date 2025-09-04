import { NextResponse } from "next/server";
import { pool } from "../../../../../lib/db";
import fs from "fs";
import path from "path";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();

    const name = formData.get("name")?.toString() || "";
    const address = formData.get("address")?.toString() || "";
    const city = formData.get("city")?.toString() || "";
    const state = formData.get("state")?.toString() || "";
    const contact = formData.get("contact")?.toString() || "";
    const email = formData.get("email")?.toString() || "";
    const file = formData.get("image") as File | null;

    let imagePath = "";
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Create unique filename
      const filename = `${Date.now()}-${file.name.replace(/\s+/g, "_")}`;
      const folderPath = path.join(process.cwd(), "public/schoolImages");

      // Ensure the directory exists
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const fullPath = path.join(folderPath, filename);
      fs.writeFileSync(fullPath, buffer);

      // Store relative path for frontend use
      imagePath = `/schoolImages/${filename}`;
    }

    // Insert school data into database
    await pool.query(
      `INSERT INTO schools 
       (name, address, city, state, contact, email_id, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email, imagePath || null]
    );

    return NextResponse.json({
      success: true,
      message: "School added successfully!",
    });
  } catch (err: any) {
    console.error("Upload error:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

