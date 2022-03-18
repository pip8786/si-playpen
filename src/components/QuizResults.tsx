import type {NextPage} from 'next'
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import * as React from "react";
import {useContext} from "react";
import {QuizContext} from "src/context/QuizContext";
import Gauge from "src/components/Gauge";
import {ExperienceContext} from "src/context/ExperienceContext";
import Head from "next/head";

export const QuizResults = () => {
    const {quiz, results} = useContext(QuizContext);
    const {experience} = useContext(ExperienceContext);

    const totalMin = quiz.questions.reduce((p,c) => p + c.answers.reduce((m, a) => Math.min(a.value,m), Number.MAX_SAFE_INTEGER), 0);
    const totalPossible = quiz.questions.reduce((p,c) => p + c.answers.reduce((m, a) => Math.max(a.value,m), 0), 0);
    const totalAnswered = results!.answers.reduce((t, a, i) => t+quiz.questions[i].answers[a].value,0);
    const result = quiz.results.find(r => r.min <= totalAnswered && totalAnswered <= r.max );
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
            <Head>
                <title>Curiosity Score: {totalAnswered} of {totalPossible}</title>

                <meta name="twitter:card" content="summary_large_image"/>
                <meta name="twitter:site" content="@SASsoftware"/>
                <meta name="twitter:creator" content="@saseducator"/>
                <meta name="twitter:title" content="Curiosity at Work"/>
                <meta name="twitter:description" content={`I took the curiosity at work quiz. I was ${totalAnswered} / ${totalPossible} curious.`}/>
                <meta name="twitter:image" content="https://i0.wp.com/www.presentation-process.com/wp-content/uploads/powerpoint-gauge.jpg"/>
            </Head>
            <Typography variant="h2" component="h1" fontWeight={500}>{experience.name}</Typography>
            <Typography variant="h4" component="h2">{experience.subtitle}</Typography>
            <Paper
                elevation={3}
                sx={{
                    p:5,
                    m:1
                }}
            >
                <Gauge level={totalAnswered} max={totalPossible} min={totalMin}/>
                {result && <Typography>{result.text}</Typography>}
            </Paper>
        </Container>
    )
}