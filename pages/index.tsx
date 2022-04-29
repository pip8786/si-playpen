import * as React from 'react';
import {GetServerSideProps, NextPage} from "next";
import Head from "next/head";
import {ExperienceWithContent, getExperience} from "./api/experience/[shortcode]";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from 'src/components/Link';
import {Button} from "@mui/material";
import Paper from "@mui/material/Paper";
import Image from 'next/image';
import {useRouter} from "next/router";
import CircularProgress from '@mui/material/CircularProgress'
import {useContext, useState} from "react";
import superjson from "superjson";

type ExperiencePageProps = {
    experience: ExperienceWithContent
}

const Home: NextPage<ExperiencePageProps> = ({experience}) => {

    const router = useRouter();
    const [loading, setLoading] = useState(false);

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
            <Typography variant="h2" component="h1" fontWeight={500}>{experience.name}</Typography>
            <Typography variant="h4" component="h2">{experience.subtitle}</Typography>

          <Paper
              elevation={3}
              sx={{
                 p:5,
                 m:1
              }}
          >
             <Image src={`/images/${experience.shortcode}/1.png`} width={500} height={333}  alt="Girl with Magnifying Glass"/>
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

export const getServerSideProps: GetServerSideProps = async ({res,query}) => {
    const shortcode = "curious";
    const experience = await getExperience(shortcode);
    if (experience) {
        return {props:{super:superjson.stringify({experience})}}
    } else {
        res.statusCode = 404;
        return {props:{}};
    }
 }

export default Home;
