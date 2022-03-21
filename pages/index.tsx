import * as React from 'react';
import type { NextPage } from 'next';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'src/components/Link';
import Gauge from "../src/components/Gauge";

const Home: NextPage = () => {
  return (
      <Container maxWidth="lg">
        <Box
            sx={{
              my: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
            }}
        >
          <Typography variant="h4" component="h1" gutterBottom>
            MUI v5 + Next.js with TypeScript example
          </Typography>
          <Link href="/quiz" color="secondary">
            Go to the about page
          </Link>
            <img src="/api/quiz/gauge.png?min=5&max=15&value=8" alt="the gauge"/>
            <img src="/api/quiz/summary.png?min=5&max=15&value=8" alt="the results"/>
        </Box>
      </Container>
  );
};

export default Home;
