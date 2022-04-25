import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import Link from 'next/link';
import Head from "next/head";

export default function Custom404() {;

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
            <Paper
                elevation={3}
                sx={{
                    p:5,
                    m:1
                }}
            >
                 <Head><title>404 - Page Not Found</title></Head>
                 <Typography variant="h1" align="center">404 - Page Not Found</Typography>
                 <br></br>
                 <Typography variant="h4" align="center">Return to the <Link href="/curious">homepage</Link></Typography>

            </Paper>
        </Container>

    );
}