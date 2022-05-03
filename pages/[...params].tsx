import * as React from 'react';
import {GetServerSideProps, NextPage} from "next";
import {ExperienceWithContent, getExperience} from "./api/experience/[shortcode]";
import ExperienceContextProvider from "src/context/ExperienceContext";
import {ExperienceType, QuizUserAnswers} from '@prisma/client';
import QuizContextProvider, {QuizSummary} from "src/context/QuizContext";
import {Quiz} from "src/components/Quiz";
import superjson from "superjson";
import {prisma} from "src/util/db";
import {QuizResults} from "../src/components/QuizResults";


type ExperiencePageProps = {
    experience: ExperienceWithContent
    results: QuizUserAnswers
    summary: QuizSummary
    isResults: boolean
}

const ExperiencePage:NextPage<ExperiencePageProps> = ({experience, results, summary, isResults}) => {
    let children = <></>;
    if(experience.type === ExperienceType.Quiz && experience.quiz) {
        let Component = Quiz;
        if(isResults) {
            Component = QuizResults;
        }
        children = <QuizContextProvider quiz={experience.quiz} results={results} summary={summary}><Component/></QuizContextProvider>
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

        let summary:QuizSummary|undefined = undefined;
        let individual:QuizUserAnswers|undefined;
        let isResults = false;
        let youGroup = 0;
        if(query.params.length >= 2 && experience.quiz) {
            const quiz = experience.quiz;
            isResults = query.params[1] === "results";
            const resultsCode = isResults ? query.params[2] : query.params[1];
            const results = await prisma.quizUserAnswers.findMany({
                where: {
                    quizId: quiz.id
                }
            });
            const overallMin = quiz.results[0].min;
            const grouped:number[] = [];
            const categories = quiz.results.map(()=>0);
            results.forEach((answer)=>{
                const i = quiz.results.findIndex(r => {
                    return r.min <= answer.score && answer.score <= r.max;
                });
                categories[i] += 1;
                const index = answer.score - overallMin;
                grouped[index] = (grouped[index] ?? 0)+1;
                if(parseInt(resultsCode) === answer.id) {
                    individual = answer;
                    youGroup = i;
                }
            });
            let start = 0;
            let end = 0;
            if(individual) {
                for(let i = 0; i <= individual.score - overallMin; i++) {
                    if(individual.score - overallMin === i) {
                        end = start + grouped[i] ?? 0;
                    } else {
                        start+=grouped[i]??0;
                    }
                }
            }
            summary = {
                total: results.length,
                grouped:categories,
                labels: quiz.results.map(r => r.shortLabel),
                youGroup,
                youRange: start !== end && end > 0 ? [start/results.length,end/results.length] : undefined
            };
        }
        return {props:{super:superjson.stringify({experience, summary, results:individual, isResults})}}
    } else {
        notFound: true;
        return {props:{}};
    }

}

export default ExperiencePage;