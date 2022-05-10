import * as React from 'react';
import {GetServerSideProps, NextPage} from "next";
import Head from "next/head";
import {ExperienceWithContent, getExperience} from "./api/experience/[shortcode]";
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LoadingIndicator } from 'src/components/LoadingIndicator';
import Paper from "@mui/material/Paper";
import Image from 'next/image';
import superjson from "superjson";
import Link from 'src/components/Link';

type ExperiencePageProps = {
    experience: ExperienceWithContent
}

const Home: NextPage<ExperiencePageProps> = ({experience}) => {


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
             <Box height="55px" position="relative">
             <Container
                            sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            flexDirection: 'column',
                            alignItems:'center',
                            p: '10px'
                            }}
                        >

                    <LoadingIndicator 
                        loadingLabel={'Loading Quiz'}
                        loadingPosition={'start'}
                        variant={'text'}
                        sx={{
                                height:'60px', 
                                width:'175px'}}
                    >
                        
                        <Link href="/curious" underline="hover"
                            sx={{
                                fontSize: '20px'
                            }}
                        >
                        Take Quiz
                        </Link>
                    </LoadingIndicator>

             </Container>

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
        return {notFound: true};
    }
 }

export default Home;
