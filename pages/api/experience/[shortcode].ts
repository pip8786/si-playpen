import { Prisma, QuizUserAnswers } from '@prisma/client'
import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "src/util/db";
const experienceWithContent = Prisma.validator<Prisma.ExperienceArgs>()({
    include: {
        quiz: {
            include: {
                questions: {
                    include: {
                        answers: true
                    }
                },
                results: {
                    orderBy: {
                        min: "asc"
                    }
                }
            }
        }
    }
});

export type ExperienceWithContent = Prisma.ExperienceGetPayload<typeof experienceWithContent>;

export default async (req: NextApiRequest, res: NextApiResponse<ExperienceWithContent|QuizUserAnswers>) => {
    const xpShortCode = req.query.shortcode;
    if(typeof xpShortCode !== "string") {
        res.status(400).end();
        return;
    }
    const xp = await getExperience(xpShortCode);
    if(!xp) {
        res.status(404).end();
        return;
    }
    if(req.method === "GET") {
        res.status(200).json(xp);
    } else if(req.method === "POST") {
        if(xp.quiz) {
            const {answers, score} = req.body;
            if(!Array.isArray(answers) || answers.length !== xp.quiz.questions.length || typeof score !== "number") {
                res.status(400).end();
                return;
            }
            const result = await prisma.quizUserAnswers.create({
                data: {
                    quizId: xp.quiz.id,
                    answers: answers,
                    score
                }
            });
            if(result) {
                res.status(200).json(result);
            } else {
                res.status(500).end();
            }
        }
    } else {
        res.status(405).end();
    }

}

export async function getExperience(shortcode:string) {
     return await prisma.experience.findUnique({
        where: {
            shortcode: shortcode
        },
        ...experienceWithContent
    });
}