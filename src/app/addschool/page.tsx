"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function AddSchoolPage() {
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    contact: "",
    image: "",
    email: "",
  });

  const [message, setMessage] = useState("");
  const [hasSchools, setHasSchools] = useState(false);
  const router = useRouter();

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/schools");
        if (!res.ok) throw new Error("Failed to fetch schools");
        const data = await res.json();
        setHasSchools(data.length > 0);
      } catch {
        setHasSchools(false);
      }
    }
    fetchSchools();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/schools", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    if (res.ok) {
      router.push("/");
    } else {
      setMessage(data.error || "Error submitting form");
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "2rem auto" }}>
      {hasSchools && (
        <button
          style={{ marginTop: "1rem" ,backgroundColor: 'orange',}}
          onClick={() => router.push("/")}
          type="button"
        >
          ← Back
        </button>
      )}
      <h2>Add School</h2>
      <form onSubmit={handleSubmit}>
        {["name", "address", "city", "state", "contact", "email"].map(
          (field) => (
            <input
              key={field}
              name={field}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={(form as any)[field]}
              onChange={handleChange}
              required
              style={{
                display: "block",
                marginBottom: "1rem",
                width: "100%",
                padding: "0.5rem",
              }}
            />
          )
        )}
        <button type="submit">Submit</button>
      </form>

      {message && <p style={{ color: "red" }}>{message}</p>}
    </div>
  );
}

