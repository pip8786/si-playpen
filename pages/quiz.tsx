import * as React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import GirlMagnify from '../public/images/girl_magnify.png';
import {Button, Stack} from "@mui/material";
import Quiz from "../src/curiosity.json";

const QuizPage: NextPage = () => {
    const currentQuestion = Quiz.questions[0];
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
            <Typography variant="h2" component="h1">{Quiz.title}</Typography>
            <Typography variant="h4" component="h2">{Quiz.subtitle}</Typography>
            <Paper
                elevation={3}
                sx={{
                    p:5
                }}
            >
                <Image src={GirlMagnify} alt="Girl with Magnifying Glass"/>
                <Typography variant="h6">{currentQuestion.title}</Typography>
                <Stack alignItems="stretch" spacing={2}>
                    {currentQuestion.answers.map(a => (
                        <Button variant="contained" key={a.text}>{a.text}</Button>
                    ))
                    }
                </Stack>

            </Paper>
        </Container>
    );
};

export default QuizPage;