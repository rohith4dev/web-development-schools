import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1>School Project</h1>
      <p style={{ textAlign: "center" }}>
        <Link href="/addSchool">➕ Add School</Link> |{" "}
        <Link href="/showSchools">📚 Show Schools</Link>
      </p>
    </div>
  );
}
