import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import Link from 'next/link';
import Head from "next/head";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

export default function Custom404() {

    const router = useRouter();

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
                     <Typography variant="h1" align="center" fontWeight="bold">404</Typography>
                     <Typography variant="h2" align="center" >Page Not Found</Typography>
                     <Typography variant="body1" align="center" >Opps! Sorry, the page you were looking for does not exist.</Typography>
                                      <Container
                                          sx={{
                                          display: 'flex',
                                          justifyContent: 'center',
                                          alignItems:'center',
                                          pt: '30px'
                                          }}
                                      >
                                          <Button
                                             sx = {{
                                                   height: '60px',
                                                   width: '200px',
                                             }}
                                             variant="contained"
                                             size="large"
                                             onClick={()=>router.push("/")}
                                         >
                                         Return To Home
                                         </Button>
                                     </Container>
            </Paper>
        </Container>

    );
}