import * as React from 'react';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import GirlMagnify from 'public/images/girl_magnify.png';
import {Button, Fade, Stack} from "@mui/material";

import {useContext} from "react";
import {QuizContext} from "src/context/QuizContext";
import {Box} from "@mui/system";
import {ExperienceContext} from "../context/ExperienceContext";
import {useRouter} from "next/router";

export const Quiz = () => {
    const router = useRouter();
    const {experience} = useContext(ExperienceContext);
    const {currentQIndex, quiz, answerQuestion, answers} = useContext(QuizContext);

    const answer = async (index:number) => {
        if(currentQIndex === quiz.questions.length - 1) {
            const newValue = [...answers, index];
            const score = newValue.reduce((t, a, i) => t+quiz.questions[i].answers[a].value,0);
            const response = await fetch(`/api/experience/${experience.shortcode}`,{
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify({
                    answers: newValue,
                    score
                })
            });
            const results = response.ok && await response.json();
            if(results) {
                await router.push(`/${experience.shortcode}/${results.id}`);
                answerQuestion(index);
            } else {
                console.error("Error saving results to the server.");
            }
        } else {
            answerQuestion(index);
        }
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
            <Typography variant="h2" component="h1" fontWeight={500}>{experience.name}</Typography>
            <Typography variant="h4" component="h2">{experience.subtitle}</Typography>
            <Paper
                elevation={3}
                sx={{
                    p:5,
                    m:1
                }}
            >
                <Image src={GirlMagnify} alt="Girl with Magnifying Glass"/>

                <Box height="200px" position="relative">
                    {quiz.questions.map((q, i) => (
                        <Fade in={currentQIndex === i} key={i} timeout={1000}>
                            <Box position="absolute" top={0} right={0} bottom={0} left={0}>
                                <Typography variant="h6" my={2}>{q.text}</Typography>
                                <Stack alignItems="stretch" spacing={2}>
                                    {q.answers.map((a, index) => (
                                        <Button variant="contained" key={a.text} onClick={()=>answer(index)}>{a.text}</Button>
                                    ))
                                    }
                                </Stack>
                            </Box>
                        </Fade>
                    ))}

                </Box>
                <Typography textAlign="center" marginTop={2}>{currentQIndex+1} of {quiz.questions.length}</Typography>
            </Paper>
        </Container>
    )
}