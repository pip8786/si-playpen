import type { NextApiRequest, NextApiResponse } from 'next'
import {prisma} from "src/util/db";
import {getExperience} from "./[shortcode]";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    const experience = await getExperience("curious");
    const quiz = experience!.quiz!;
    const allResults = await prisma.quizUserAnswers.findMany({
        where: {
            quizId: quiz.id
        }
    });
    for(const r of allResults) {
        const totalAnswered = r!.answers.reduce((t, a, i) => t+quiz.questions[i].answers[a].value,0);
        await prisma.quizUserAnswers.update({
            where: {
                id: r.id
            },
            data: {
                score: totalAnswered
            }
        });
    }

    res.status(200).end();
}