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
  image: string;
};

export default function ShowSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/schools/get");
        const data = await res.json();
        if (data.success) {
          setSchools(data.schools);
        } else {
          console.error("Failed to fetch schools:", data.error);
        }
      } catch (err) {
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  if (loading) return <p className="text-center mt-6">Loading schools...</p>;

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">All Schools</h1>

      {schools.length === 0 ? (
        <p>No schools found.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2">
          {schools.map((school) => (
            <div key={school.id} className="border rounded-lg p-4 shadow">
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-40 object-cover rounded mb-4"
              />
              <h2 className="text-xl font-semibold">{school.name}</h2>
              <p>{school.address}, {school.city}, {school.state}</p>
              <p>📞 {school.contact}</p>
              <p>✉️ {school.email_id}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
