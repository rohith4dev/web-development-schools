"use client";

import { useEffect, useState } from "react";

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email_id: string;
  image?: string;
};

export default function RecentlyAddedSchool() {
  const [school, setSchool] = useState<School | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRecentSchool() {
      try {
        const res = await fetch("/api/schools/recent");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setSchool(data);
      } catch (err) {
        console.error("Error fetching recent school:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchRecentSchool();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (!school?.id) return <p>No recent schools available.</p>;

  return (
    <div
      style={{
        border: "1px solid #e0e0e0",
        padding: "1rem",
        borderRadius: "8px",
        backgroundColor: "#fafafa",
      }}
    >
      <h3 style={{ marginTop: 0 }}>{school.name}</h3>
      <p>
        <strong>📍 Address:</strong> {school.address}, {school.city},{" "}
        {school.state}
      </p>
      <p>
        <strong>📞 Contact:</strong> {school.contact}
      </p>
      <p>
        <strong>✉️ Email:</strong> {school.email_id}
      </p>

      {school.image && (
        <img
          src={school.image}
          alt={school.name}
          style={{
            width: "100%",
            maxHeight: "200px",
            objectFit: "cover",
            marginTop: "1rem",
            borderRadius: "8px",
          }}
        />
      )}
    </div>
  );
}
