import * as React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import GirlMagnify from '../public/images/girl_magnify.png';
import {Button, Stack} from "@mui/material";

const Home: NextPage = () => {
    return (
        <Container maxWidth="md"
                   sx={{
                        my: 4,
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
        >
            <Typography variant="h2" component="h1">CURIOSITY AT WORK QUIZ</Typography>
            <Typography variant="h4" component="h2">HOW DO YOU SHOW CURIOSITY IN THE WORKPLACE?</Typography>
            <Paper
                elevation={3}
                sx={{
                    p:5
                }}
            >
                <Image src={GirlMagnify} alt="Girl with Magnifying Glass"/>
                <Typography variant="h6">INVESTIGATION</Typography>
                <Stack alignItems="stretch" spacing={2}>
                    <Button variant="contained">I tend to put up with issues longer than I should.</Button>
                    <Button variant="contained">If I encounter a problem, I look into a solution.</Button>
                    <Button variant="contained">I’m always investigating, even if there’s nothing wrong.</Button>
                </Stack>

            </Paper>
        </Container>
    );
};

export default Home;