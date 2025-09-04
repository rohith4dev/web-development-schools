// import { NextResponse } from "next/server";
// import { pool } from "@/lib/db";

// export async function POST(req: Request) {
//   try {
//     const formData = await req.formData();

//     const name = formData.get("name")?.toString() || "";
//     const address = formData.get("address")?.toString() || "";
//     const city = formData.get("city")?.toString() || "";
//     const state = formData.get("state")?.toString() || "";
//     const contact = formData.get("contact")?.toString() || "";
//     const email = formData.get("email")?.toString() || "";

//     // Handle uploaded image
//     const file = formData.get("image") as File | null;
//     let imagePath = null;
//     if (file) {
//       const bytes = await file.arrayBuffer();
//       const buffer = Buffer.from(bytes);
//       const filename = `${Date.now()}-${file.name}`;
//       const fs = require("fs");
//       const path = `public/schoolImages/${filename}`;
//       fs.writeFileSync(path, buffer);
//       imagePath = `/schoolImages/${filename}`;
//     }

//     await pool.query(
//       "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
//       [name, address, city, state, contact, email, imagePath]
//     );

//     return NextResponse.json({ success: true, message: "School added successfully!" });
//   } catch (err: any) {
//     return NextResponse.json({ success: false, error: err.message }, { status: 500 });
//   }
// }

// app/api/schools/add/route.ts
import { NextResponse } from "next/server";
import { pool } from "../../../../lib/db";
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
      const filename = `${Date.now()}-${file.name}`;
      const folderPath = path.join(process.cwd(), "public/schoolImages");

      // Ensure folder exists
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
      }

      const filePath = path.join(folderPath, filename);
      fs.writeFileSync(filePath, buffer);
      imagePath = `/schoolImages/${filename}`;
    }

    await pool.query(
      "INSERT INTO schools (name, address, city, state, contact, email_id, image) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, email, imagePath]
    );

    return NextResponse.json({
      success: true,
      message: "School added successfully!",
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}

