// "use client";

// import { useForm, SubmitHandler } from "react-hook-form";
// import { yupResolver } from "@hookform/resolvers/yup";
// import * as yup from "yup";
// import { useState } from "react";

// const schema = yup.object({
//   name: yup.string().required("School name is required"),
//   address: yup.string().required("Address is required"),
//   city: yup.string().required("City is required"),
//   state: yup.string().required("State is required"),
//   contact: yup
//     .string()
//     .matches(/^[0-9]{10}$/, "Contact must be 10 digits")
//     .required("Contact is required"),
//   email: yup.string().email("Invalid email").required("Email is required"),
//   image: yup
//     .mixed<FileList>()
//     .required("Image is required")
//     .test("fileType", "Only image files are allowed", (value) => {
//       return value instanceof FileList && value.length > 0 && value[0].type.startsWith("image/");
//     }),
// });

// type SchoolForm = yup.InferType<typeof schema>;

// export default function AddSchoolPage() {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset,
//   } = useForm<SchoolForm>({
//     resolver: yupResolver(schema),
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   const onSubmit: SubmitHandler<SchoolForm> = async (data) => {
//     setLoading(true);
//     setMessage("");

//     const formData = new FormData();
//     formData.append("name", data.name);
//     formData.append("address", data.address);
//     formData.append("city", data.city);
//     formData.append("state", data.state);
//     formData.append("contact", data.contact);
//     formData.append("email", data.email);
//     if (data.image && data.image.length > 0) {
//       formData.append("image", data.image[0]);
//     }

//     try {
//       const res = await fetch("/api/schools/add", {
//         method: "POST",
//         body: formData,
//       });

//       const result = await res.json();

//       if (result.success) {
//         setMessage("✅ School added successfully!");
//         reset();
//       } else {
//         setMessage("❌ " + result.error);
//       }
//     } catch (error) {
//       setMessage("❌ Failed to submit. Please try again later.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-2xl mx-auto p-6">
//       <h1 className="text-2xl font-bold mb-4">Add School</h1>

//       {message && (
//         <p
//           className={`mb-4 font-medium ${
//             message.startsWith("✅") ? "text-green-600" : "text-red-600"
//           }`}
//         >
//           {message}
//         </p>
//       )}

//       <form
//         onSubmit={handleSubmit(onSubmit)}
//         className="grid grid-cols-1 gap-4 bg-white shadow-md rounded-lg p-6"
//       >
//         <input {...register("name")} placeholder="School Name" className="border p-2 rounded" />
//         <p className="text-red-500 text-sm">{errors.name?.message}</p>

//         <input {...register("address")} placeholder="Address" className="border p-2 rounded" />
//         <p className="text-red-500 text-sm">{errors.address?.message}</p>

//         <input {...register("city")} placeholder="City" className="border p-2 rounded" />
//         <p className="text-red-500 text-sm">{errors.city?.message}</p>

//         <input {...register("state")} placeholder="State" className="border p-2 rounded" />
//         <p className="text-red-500 text-sm">{errors.state?.message}</p>

//         <input {...register("contact")} placeholder="Contact" className="border p-2 rounded" />
//         <p className="text-red-500 text-sm">{errors.contact?.message}</p>

//         <input {...register("email")} placeholder="Email" className="border p-2 rounded" />
//         <p className="text-red-500 text-sm">{errors.email?.message}</p>

//         <input
//           type="file"
//           accept="image/*"
//           {...register("image")}
//           className="border p-2 rounded"
//         />
//         <p className="text-red-500 text-sm">{errors.image?.message}</p>

//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
//           disabled={loading}
//         >
//           {loading ? "Submitting..." : "Add School"}
//         </button>
//       </form>
//     </div>
//   );
// }


// src/app/api/schools/add/route.ts

import { NextResponse } from "next/server";
import { pool } from "@/lib/db";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const city = formData.get("city") as string;
    const state = formData.get("state") as string;
    const contact = formData.get("contact") as string;
    const email = formData.get("email") as string;
    const image = formData.get("image") as File;

    if (!image) {
      return NextResponse.json({ error: "Image is missing" }, { status: 400 });
    }

    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const imageName = Date.now() + "_" + image.name;
    const imagePath = path.join(process.cwd(), "public/schoolImages", imageName);

    await writeFile(imagePath, buffer);

    const [result] = await pool.query(
      `INSERT INTO schools (name, address, city, state, contact, email_id, image)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, address, city, state, contact, email, imageName]
    );

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}

