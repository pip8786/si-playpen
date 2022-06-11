import * as React from "react";
import {useContext, useRef, useState} from "react";
import Image from "next/image";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import {Button, Fade, Stack} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress"
import {QuizContext} from "src/context/QuizContext";
import {Box} from "@mui/system";
import {ExperienceContext} from "../context/ExperienceContext";
import {useRouter} from "next/router";
import {HeadWithMeta} from "./HeadWithMeta";
import {useDimensionObserver} from "src/hooks/useDimensionObserver";

export const Quiz = () => {
    const router = useRouter();
    const {experience} = useContext(ExperienceContext);
    const {currentQIndex, quiz, answerQuestion, answers, resetContext} = useContext(QuizContext);
    const [loading, setLoading] = useState(false);
    const el = useRef<HTMLDivElement | null>(null);
    const {width, height} = useDimensionObserver(el);

    const answer = async (index: number) => {

        if (currentQIndex === quiz.questions.length - 1) {
            setLoading(true);
            const newValue = [...answers, index];
            const score = newValue.reduce((t, a, i) => t + quiz.questions[i].answers[a].value, 0);
            const response = await fetch(`/api/experience/${experience.shortcode}`, {
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
            if (results) {
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
        <Container
            sx={{
                maxWidth: {xs: "xs", sm: "sm", md: "md", lg: "md", xl: "md"},
                my: 4,
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center"
            }}
        >
            <HeadWithMeta title="Curiosity @ Work Quiz"/>
            <Typography variant="h2" component="h1" fontWeight={500}>{experience.name}</Typography>
            <Typography variant="h4" component="h2">{experience.subtitle}</Typography>
            <Paper
                elevation={3}
                sx={{
                    position: "relative",
                    height: height,
                    alignSelf: "stretch"
                }}
            >
                {quiz.questions.map((q, i) => (
                    <Fade in={currentQIndex === i} key={i} timeout={1000}>
                        <Box position="absolute" ref={el} sx={{
                            top: 0,
                            left: 0,
                            right: 0
                        }}>
                            <Box p={4}>
                                <Box sx={{display: "flex", justifyContent: "center"}}>
                                    <Image src={`/images/${experience.shortcode}/${i + 1}.png`} width={500} height={333}
                                           alt="Girl with Magnifying Glass"/>
                                </Box>
                                <Typography variant="h6" my={2}>{q.text}</Typography>
                                {/*if loading is true, show loading circle; if false, show quiz questions */}
                                {loading
                                    ? <Container
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            flexDirection: "column",
                                            alignItems: "center"
                                        }}
                                    >
                                        <CircularProgress size={100}/>
                                        <Typography variant="body1">Loading your results...</Typography>
                                    </Container>
                                    : <Stack alignItems="stretch" spacing={2}>
                                        {q.answers.map((a, index) => (
                                            <Button variant="contained" key={a.text}
                                                    onClick={() => answer(index)}>{a.text}</Button>
                                        ))
                                        }
                                        <Typography marginTop={2}
                                                    textAlign="center">{currentQIndex + 1} of {quiz.questions.length}</Typography>
                                    </Stack>
                                }
                                
                            </Box>

                        </Box>
                    </Fade>
                ))}
            </Paper>
        </Container>


    )
}

function componentWillUnmount() {
    throw new Error("Function not implemented.");
}
