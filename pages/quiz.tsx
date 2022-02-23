import * as React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import GirlMagnify from '../public/images/girl_magnify.png';
import {Button, Stack} from "@mui/material";

import {useContext} from "react";
import {QuizContext} from "../src/QuizContext";
import {useRouter} from "next/router";

const QuizPage = () => {
    const router = useRouter();
    const {currentQuestion, currentQIndex, quiz, answerQuestion} = useContext(QuizContext);
    if(currentQIndex === quiz.questions.length) {
        router.push("/results");
        return <></>;
    }
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
                <Image src={GirlMagnify} alt="Girl with Magnifying Glass"/>
                <Typography variant="h6">{currentQuestion.title}</Typography>
                <Stack alignItems="stretch" spacing={2}>
                    {currentQuestion.answers.map((a, index) => (
                        <Button variant="contained" key={a.text} onClick={()=>answerQuestion(index)}>{a.text}</Button>
                    ))
                    }
                </Stack>
                <Typography textAlign="center" marginTop={2}>{currentQIndex+1} of {quiz.questions.length}</Typography>
            </Paper>
        </Container>
    )
}

export default QuizPage;