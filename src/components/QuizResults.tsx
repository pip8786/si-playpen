import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import Container from "@mui/material/Container";
import * as React from "react";
import { useContext, useState } from "react";
import { QuizContext } from "src/context/QuizContext";
import Gauge from "src/components/Gauge";
import { ExperienceContext } from "src/context/ExperienceContext";
import Summary from "./Summary";
import { Box } from "@mui/system";
import { IconButton, Tooltip } from "@mui/material";
import LinkIcon from '@mui/icons-material/Link';
import TwitterIcon from '@mui/icons-material/Twitter';
import FacebookIcon from '@mui/icons-material/Facebook';
import Link from './Link';
import { HeadWithMeta } from './HeadWithMeta';
import { LoadingIndicator } from 'src/components/LoadingIndicator';
import { styled } from '@mui/material/styles'
import exp from "constants";
import { ExpandCircleDown } from "@mui/icons-material";

export const QuizResults = () => {
    const { quiz, results, summary } = useContext(QuizContext);
    const { experience } = useContext(ExperienceContext);

    const [copyLinkTooltip, setCopyLinkTooltip] = useState("Copy Link");

    const totalMin = quiz.questions.reduce((p, c) => p + c.answers.reduce((m, a) => Math.min(a.value, m), Number.MAX_SAFE_INTEGER), 0);
    const totalPossible = quiz.questions.reduce((p, c) => p + c.answers.reduce((m, a) => Math.max(a.value, m), 0), 0);
    const totalAnswered = results!.answers.reduce((t, a, i) => t + quiz.questions[i].answers[a].value, 0);
    const result = quiz.results.find(r => r.min <= totalAnswered && totalAnswered <= r.max);

    const onCopyClick = async () => {
        await navigator.clipboard.writeText(`${process.env.NEXT_PUBLIC_BASE_URL}/${experience.shortcode}/${results!.id}`);
        setCopyLinkTooltip("Copied!");
        setTimeout(() => {
            setCopyLinkTooltip("Copy Link");
        }, 1000);
    };

    const onTwitterClick = () => {
        window.open(`https://twitter.com/intent/tweet?text=I scored ${totalAnswered} on the Curiosity @ Work Quiz!&url=${process.env.NEXT_PUBLIC_BASE_URL}/${experience.shortcode}/${results!.id}`, "_blank");
    };

    const onFacebookClick = () => {
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${process.env.NEXT_PUBLIC_BASE_URL}/${experience.shortcode}/${results!.id}`, "_blank");
    };

    const BreakpointForBottomActions = styled('div')(({ theme }) => ({
        [theme.breakpoints.down("sm")]: {
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
        },
        [theme.breakpoints.up("sm")]: {
            display: "flex",
            justifyContent: "space-between",
            alignItems: 'center'
        }
    }));

    return (
        <Container
            sx={{
                maxWidth: {
                    xs: 'xs',
                    sm: 'sm',
                    md: 'md',
                    lg: 'md',
                    xl: 'md'
                },
                my: 4,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <HeadWithMeta title={`Curiosity Score: ${totalAnswered} of ${totalPossible}`} />
            <Typography variant="h2" component="h1" fontWeight={500}>{experience.name}</Typography>
            <Typography variant="h4" component="h2">{experience.subtitle}</Typography>

            <Container maxWidth="md">
                <Paper
                    elevation={3}
                    sx={{
                        p: 5,
                        m: 1
                    }}
                >

                    <Gauge level={totalAnswered} max={totalPossible} min={totalMin} />

                    {result && <Typography>{result.text}</Typography>}
                    {summary && <Summary {...summary} />}

                    <Box sx={{
                        display: "flex",
                        justifyContent: "center"
                    }}>

                        <Link href={experience.linkAddress}>{experience.linkText}</Link>
                    </Box>

                    <Box sx={{ mt: 4 }}>
                        <BreakpointForBottomActions>
                            <LoadingIndicator
                                loadingLabel={'Loading Quiz'}
                                loadingPosition={'start'}
                                variant={'text'}
                                sx={{
                                    height: '30px',
                                    width: '150px'
                                }}>
                                <Link href="/curious" underline="hover">
                                    Retake Quiz
                                </Link>
                            </LoadingIndicator>

                            <Box sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center"
                            }}>
                                Share:
                                <Tooltip title={copyLinkTooltip} placement="bottom">
                                    <IconButton onClick={onCopyClick}><LinkIcon /></IconButton>
                                </Tooltip>
                                <Tooltip title="Share on Twitter" placement="bottom">
                                    <IconButton onClick={onTwitterClick}><TwitterIcon /></IconButton>
                                </Tooltip>
                                <Tooltip title="Share on Facebook" placement="bottom">
                                    <IconButton onClick={onFacebookClick}><FacebookIcon /></IconButton>
                                </Tooltip>
                            </Box>
                        </BreakpointForBottomActions>
                    </Box>

                </Paper>
            </Container>
        </Container>
    )
}