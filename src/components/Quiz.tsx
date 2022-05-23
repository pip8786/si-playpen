import * as React from 'react';
import { useEffect } from 'react';
import Image from 'next/image';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import {Button, Fade, Stack} from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress'
import {useContext, useState} from "react";
import {QuizContext} from "src/context/QuizContext";
import {Box} from "@mui/system";
import {ExperienceContext} from "../context/ExperienceContext";
import {useRouter} from "next/router";
import {HeadWithMeta} from "./HeadWithMeta";
import { motion, useAnimation } from 'framer-motion';
import { Opacity } from '@mui/icons-material';

export const Quiz = () => {
    const router = useRouter();
    const {experience} = useContext(ExperienceContext);
    const {currentQIndex, quiz, answerQuestion, answers, resetContext} = useContext(QuizContext);
    const [loading, setLoading] = useState(false);

    //variables for animation
    const controls = useAnimation()
    const initalOpacity = 0.5
    const animationVariants = {
        hidden: {
            opacity: 0
        },
        show: {
            opacity: 1, 
            transition: {
                duration: 1.5
            }
        }
    }

    //start animation on page render
    useEffect(() => {
        controls.start("show");
    });

    const answer = async (index:number) => {
        //set the opacity back to initial value and restart animation
        controls.set({opacity: initalOpacity})

        if(currentQIndex === quiz.questions.length - 1) {
            controls.set({opacity: 1})
            setLoading(true);
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

                <motion.div 
                    variants={animationVariants}
                    initial={{ opacity: initalOpacity }}
                    animate={controls}
                >

                <Image src={`/images/${experience.shortcode}/${currentQIndex+1}.png`} width={500} height={333} alt="Girl with Magnifying Glass"/>

                <Box>
                            <Typography variant="h6" my={2}>{quiz.questions[currentQIndex].text}</Typography>
                            {/*if loading is true, show loading circle; if false, show quiz questions */}
                            {loading
                                ? <Container
                                    sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection:'column',
                                    alignItems:'center'
                                    }}
                                >
                                    <CircularProgress size={100}/>
                                    <Typography variant='body1'>Loading your results...</Typography>
                                </Container>

                                :
                                 <Stack alignItems="stretch" spacing={2}>
                                    {quiz.questions[currentQIndex].answers.map((a, index) => (
                                        <Button sx={{maxWidth: 500}} variant="contained" key={a.text} onClick={()=>answer(index)}>{a.text}</Button>
                                    ))
                                    }
                                </Stack>
                            }
                </Box>
                </motion.div>
                
                <Typography marginTop={2} textAlign="center">{currentQIndex+1} of {quiz.questions.length}</Typography>


            </Paper>
        </Container>


    )
}