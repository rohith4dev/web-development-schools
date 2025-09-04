'use client';

import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import { useRouter } from 'next/navigation'; 

type School = {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  contact: string;
  email: string;
  image?: string;
};

export default function ViewSchoolsPage() {
  const [schools, setSchools] = useState<School[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter(); // ✅ Correct usage

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch('/api/schools');
        const data = await res.json();
        setSchools(data);
      } catch (error) {
        console.error('Error fetching schools:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchSchools();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* 🔙 Back Button */}
      <button
        style={{
          marginBottom: '1.5rem',
          backgroundColor: 'orange',
          color: 'white',
          padding: '0.5rem 1rem',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
        onClick={() => router.push('/')}
      >
        ← Back
      </button>

      <Typography variant="h4" gutterBottom>
        🏫 School Directory
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : schools.length === 0 ? (
        <Typography variant="body1" color="text.secondary">
          No schools found.
        </Typography>
      ) : (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '1.5rem',
          }}
        >
          {schools.map((school) => (
            <Card
              key={school.id}
              style={{
                flex: '1 1 calc(33% - 1.5rem)', // 3 per row
                minWidth: '280px',
                maxWidth: '350px',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <CardMedia
                component="img"
                height="180"
                image={
                  school.image
                    ? `/schoolImages/${school.image}`
                    : '/placeholder-school.jpg'
                }
                alt={school.name}
              />

              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {school.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📍 {school.address}, {school.city}, {school.state}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  📞 {school.contact}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  ✉️ {school.email}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </Container>
  );
}
