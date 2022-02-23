import type {NextPage} from 'next'
import Head from 'next/head'
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Image from "next/image";
import GirlMagnify from "../public/images/girl_magnify.png";
import {Button, Stack} from "@mui/material";
import Container from "@mui/material/Container";
import * as React from "react";
import {useContext} from "react";
import {QuizContext} from "../src/QuizContext";
import Gauge from "../src/Gauge";

const Results: NextPage = () => {
    const {quiz, answers} = useContext(QuizContext);

    const totalPossible = quiz.questions.reduce((p,c) => p + c.answers.reduce((m, a) => Math.max(a.value,m), 0), 0);
    const totalAnswered = answers.reduce((t, a, i) => t+quiz.questions[i].answers[a].value,0);
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
            <Typography variant="h2" component="h1" fontWeight={500}>{quiz.title}</Typography>
            <Typography variant="h4" component="h2">{quiz.subtitle}</Typography>
            <Paper
                elevation={3}
                sx={{
                    p:5,
                    m:1
                }}
            >
                <Gauge level={totalAnswered} max={totalPossible}/>
            </Paper>
        </Container>
    )
}

export default Results
