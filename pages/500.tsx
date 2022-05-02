import {ErrorPages} from 'src/components/ErrorPages';

export default function Custom404() {

    const errorNum = 500
    const errorName = 'Internal Server Error'
    const errorSlogan = "Oh no! Sorry, there was an unexpected error."

    return (

        <ErrorPages errorNum={errorNum} errorName={errorName} errorSlogan={errorSlogan}/>

    );
}