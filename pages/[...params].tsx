import * as React from 'react';
import {GetServerSideProps, NextPage} from "next";
import {ExperienceWithContent, getExperience} from "./api/experience/[shortcode]";
import ExperienceContextProvider from "src/context/ExperienceContext";
import {ExperienceType, QuizUserAnswers} from '@prisma/client';
import QuizContextProvider from "src/context/QuizContext";
import {Quiz} from "src/components/Quiz";
import superjson from "superjson";
import {prisma} from "src/util/db";
import {QuizResults} from "../src/components/QuizResults";

type ExperiencePageProps = {
    experience: ExperienceWithContent
    results: QuizUserAnswers
}

const ExperiencePage:NextPage<ExperiencePageProps> = ({experience, results}) => {
    let children = <></>;
    if(experience.type === ExperienceType.Quiz && experience.quiz) {
        let Component = Quiz;
        if(results) {
            Component = QuizResults;
        }
        children = <QuizContextProvider quiz={experience.quiz} results={results}><Component/></QuizContextProvider>
    }
    return <ExperienceContextProvider experience={experience}>
        {children}
    </ExperienceContextProvider>;
}

export const getServerSideProps: GetServerSideProps = async ({res,query}) => {
    if(!Array.isArray(query.params)) {
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
        let results:QuizUserAnswers|null = null;
        if(query.params.length === 2 ) {
            const resultsCode = query.params[1];
            results = await prisma.quizUserAnswers.findUnique({
                where: {
                    id: parseInt(resultsCode)
                }
            });
        }
        return {props:{super:superjson.stringify({experience, results})}}
    } else {
        res.statusCode = 404;
        return {props:{}};
    }

}

export default ExperiencePage;