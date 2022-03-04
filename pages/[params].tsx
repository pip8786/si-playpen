import * as React from 'react';
import {GetServerSideProps, NextPage} from "next";
import {ExperienceWithContent, getExperience} from "./api/experience/[shortcode]";
import ExperienceContextProvider from "src/context/ExperienceContext";
import { ExperienceType } from '@prisma/client';
import QuizContextProvider from "src/context/QuizContext";
import {Quiz} from "src/components/Quiz";
import superjson from "superjson";

type ExperiencePageProps = {
    experience: ExperienceWithContent
}

const ExperiencePage:NextPage<ExperiencePageProps> = ({experience}) => {
    let children = <></>;
    if(experience.type === ExperienceType.Quiz && experience.quiz) {
        children = <QuizContextProvider quiz={experience.quiz}><Quiz/></QuizContextProvider>
    }
    return <ExperienceContextProvider experience={experience}>
        {children}
    </ExperienceContextProvider>;
}

export const getServerSideProps: GetServerSideProps = async ({res,query}) => {
    if(typeof query.params !== "object") {
        res.statusCode = 400;
        return {props:{}};
    }
    const shortcode = query.params[0];
    if(typeof shortcode !== "string") {
        res.statusCode = 400;
        return {props:{}};
    }
    const experience = await getExperience(shortcode);
    if(experience) {
        const resultsCode = query.params[1];

        return {props:{super:superjson.stringify({experience})}}
    } else {
        res.statusCode = 404;
        return {props:{}};
    }

}

export default ExperiencePage;