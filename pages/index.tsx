import * as React from 'react';
import type { NextPage } from 'next';
import Head from "next/head";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'src/components/Link';
import {Button, Fade, Stack} from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from 'next/image';
import {useRouter} from "next/router";
import CircularProgress from '@mui/material/CircularProgress'
import {useContext, useState} from "react";
import {ExperienceContext} from "../src/context/ExperienceContext";
import {HeadWithMeta} from "../src/components/HeadWithMeta";


const Home: NextPage = () => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const {experience} = useContext(ExperienceContext);

    const loadingCuriousExperience = () => {
        //onClick for "Launch Quiz", loading indicator occurs while waiting to be pushed to '/curious' page
       setLoading(true);
       router.push('/curious');
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
            <Head><title>Experience Engine</title></Head>
            <Typography variant="h2" component="h1" fontWeight={500}>Curiosity @ Work Quiz</Typography>
            <Typography variant="h4" component="h2">How do you show curiosity in the workplace?</Typography>

          <Paper
              elevation={3}
              sx={{
                 p:5,
                 m:1
              }}
          >
             <Image src={`/images/curious/1.png`} width={500} height={333}  alt="Girl with Magnifying Glass"/>
             <Box height="55px" position="relative"
             >
                {/*if loading is true, display loading indicator; is false, display 'Launch Quiz' button*/}
                 {loading
                     ? <Container
                            sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems:'center',
                            p: '10px'
                            }}
                            >
                           <CircularProgress size='3em'/>
                           <Typography variant='body1'>Loading Quiz...</Typography>
                       </Container>

                     : <Container
                            sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems:'center',
                            p: '10px'
                            }}
                        >
                             <Button
                                sx = {{
                                    height: '60px',
                                    width: '200px'
                                }}
                                   variant="contained"
                                   size="large"
                                   onClick={()=>loadingCuriousExperience()}
                               >
                               Take Quiz
                               </Button>
                       </Container>
                 }


             </Box>


          </Paper>
      </Container>
  );
};

export default Home;
