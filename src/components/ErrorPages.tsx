import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import Head from "next/head";
import {Button} from "@mui/material";
import {useRouter} from "next/router";

type ErrorProps = {
    errorNum: number
    errorName: string
    errorSlogan: string
}

export const ErrorPages = ({errorNum, errorName, errorSlogan}: ErrorProps) => {

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
                         <Head><title>{errorNum} - {errorName}</title></Head>
                         <Typography variant="h2" align="center">{errorSlogan}</Typography>
                         <Typography variant="subtitle1" align="center">{errorNum} - {errorName}</Typography>

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

    )
}