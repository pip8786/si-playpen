import Typography from '@mui/material/Typography';
import Paper from "@mui/material/Paper";
import Container from '@mui/material/Container';
import Link from 'next/link';
import Head from "next/head";
import {Button} from "@mui/material";
import {useRouter} from "next/router";
import {ErrorPages} from 'src/components/ErrorPages';

export default function Custom404() {

    const errorNum = 500
    const errorName = 'Internal Server Error'
    const errorSlogan = "Oh no! Sorry, there was an unexpected error."

    return (

        <ErrorPages errorNum={errorNum} errorName={errorName} errorSlogan={errorSlogan}/>

    );
}