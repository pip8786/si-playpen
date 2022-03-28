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
                <meta name="twitter:title" content="Curiosity at Work Quiz"/>
                <meta name="twitter:description" content={`My curiosity score is ${totalAnswered}. What's yours? Take this simple quiz to find out.`}/>
                <meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/gauge.png?min=${totalMin}&max=${totalPossible}&value=${totalAnswered}`}/>
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
                <img src="/api/quiz/summary.png?percents=[10, 30, 50, 10]&total=245" alt="the results"/>
                <a href="https://www.sas.com/en_us/curiosity/at-work.html">Learn more about how curiosity is valued in the workplace.</a>
            </Paper>
        </Container>
    )
}