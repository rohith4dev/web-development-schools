"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  CardActions,
  Container,
} from "@mui/material";
import RecentlyAddedSchool from "../RecentlyAddedSchool";

export default function Home() {
  const [schools, setSchools] = useState<string[]>([]);

  const handleAddSchool = () => {
    const newSchoolName = `School ${schools.length + 1}`;
    setSchools((prev) => [...prev, newSchoolName]);
  };
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Header Card */}
      <Card variant="outlined" sx={{ mb: 4 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            {/* {for these symbols I have used emojipedia} */}
            🎓 School Manager
          </Typography>
          <Typography color="text.secondary">
            Manage your schools efficiently — add new schools and view the list
            of recently added ones.
          </Typography>
        </CardContent>
      </Card>

      {/* Action & Info Section (2-column layout using Flexbox) */}
      <section
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "24px",
        }}
      >
        {/* middle card- Recently Added Schools */}
        <section
          style={{ flex: "1 1 100%", minWidth: "300px", maxWidth: "100%" }}
        >
          <Card variant="outlined" sx={{ height: "100%" }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                🕒 Recently Added School
              </Typography>
              <RecentlyAddedSchool />
            </CardContent>
          </Card>
        </section>

        <section
          style={{ flex: "1 1 100%", minWidth: "300px", maxWidth: "100%" }}
        >
          <Card
            variant="outlined"
            sx={{
              height: "100%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
            }}
          >
            <CardContent>
              <Typography variant="h6" gutterBottom>
                📚 School Directory
              </Typography>
              <Typography color="text.secondary">
                View all schools you've added so far.
              </Typography>
            </CardContent>
            <CardActions sx={{ p: 2 }}>
              <Link href="/showSchools" passHref>
                <Button variant="contained">📚 Show Schools</Button>
              </Link>
            </CardActions>
          </Card>
        </section>
      </section>

      {/* Add School Button Below */}
      <Box sx={{ mt: 4, textAlign: "center" }}>
        <Link href="/addschool" passHref>
          <Button variant="outlined">➕ Add School</Button>
        </Link>
      </Box>
    </Container>
  );
}
