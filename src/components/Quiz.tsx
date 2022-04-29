import * as React from 'react';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import {Button, Fade, Stack} from "@mui/material";

import {useContext} from "react";
import {QuizContext} from "src/context/QuizContext";
import {Box} from "@mui/system";
import {ExperienceContext} from "../context/ExperienceContext";
import {useRouter} from "next/router";
import {HeadWithMeta} from "./HeadWithMeta";
import  { Breakpoint } from 'react-socks';


export const Quiz = () => {
    const router = useRouter();
    const {experience} = useContext(ExperienceContext);
    const {currentQIndex, quiz, answerQuestion, answers, resetContext} = useContext(QuizContext);

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
                await router.push(`/${experience.shortcode}/results/${results.id}`);
                resetContext();
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
            <HeadWithMeta title="Curiosity @ Work Quiz"/>
            <Typography variant="h2" component="h1" fontWeight={500}>{experience.name}</Typography>
            <Typography variant="h4" component="h2">{experience.subtitle}</Typography>
            <Paper
                elevation={3}
                sx={{
                    p:5,
                    m:1
                }}
            >
                <Image src={`/images/${experience.shortcode}/${currentQIndex+1}.png`} width={500} height={333} alt="Girl with Magnifying Glass"/>

                <Box height="275px" position="relative">
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

                {/*https://www.npmjs.com/package/react-socks - breakpoints for screen size responsiveness*/}
                {/*this breakpoint is for 'medium(768) to xlarge(1200) devices' */}
                <Breakpoint medium up>
                    <Typography textAlign="center" marginTop={2} >{currentQIndex+1} of {quiz.questions.length}</Typography>
                </Breakpoint>

                {/*this breakpoint is for small and xsmall devices */}
                <Breakpoint small down>
                    <Typography textAlign="center" marginTop={10} >{currentQIndex+1} of {quiz.questions.length}</Typography>
                </Breakpoint>

                {/*this breakpoint is for x-small devices*/}
                {/*<Breakpoint x-small only>
                    <Typography textAlign="center" marginTop={5} >{currentQIndex+1} of {quiz.questions.length}</Typography>
                </Breakpoint>*/}
            </Paper>
        </Container>


    )
}