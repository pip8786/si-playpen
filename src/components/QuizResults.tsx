import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import * as React from "react";
import {useContext} from "react";
import {QuizContext} from "src/context/QuizContext";
import Gauge from "src/components/Gauge";
import {ExperienceContext} from "src/context/ExperienceContext";
import Summary from "./Summary";
import {Box} from "@mui/system";
import {IconButton, Tooltip} from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from './Link';
import { HeadWithMeta } from './HeadWithMeta';

export const QuizResults = () => {
    const {quiz, results, summary} = useContext(QuizContext);
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
            <HeadWithMeta>
                <title>Curiosity Score: {totalAnswered} of {totalPossible}</title>
            </HeadWithMeta>
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
                {summary && <Summary {...summary}/>}

                <Box sx={{
                    display: "flex",
                    justifyContent: "center"
                }}>
                    <Link href="https://www.sas.com/en_us/curiosity/at-work.html">Learn more about how curiosity is valued in the workplace.</Link>
                </Box>
                <Box sx={{
                    mt: 4,
                    display: "flex",
                    justifyContent: "space-between"
                }}>
                    <Link href={"/curious"}>Retake Quiz</Link>
                    <Box sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center"
                    }}>
                        Share:
                        <Tooltip title="Copy Link" placement="bottom">
                            <IconButton><LinkIcon/></IconButton>
                        </Tooltip>
                        <Tooltip title="Share on Twitter" placement="bottom">
                            <IconButton><TwitterIcon/></IconButton>
                        </Tooltip>
                        <Tooltip title="Share on Facebook" placement="bottom">
                            <IconButton><FacebookIcon/></IconButton>
                        </Tooltip>
                    </Box>
                </Box>

            </Paper>
        </Container>
    )
}