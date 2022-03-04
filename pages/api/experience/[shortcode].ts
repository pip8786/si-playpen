import { Prisma } from '@prisma/client'
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
                results: true
            }
        }
    }
});

export type ExperienceWithContent = Prisma.ExperienceGetPayload<typeof experienceWithContent>;

export default async (req: NextApiRequest, res: NextApiResponse<ExperienceWithContent>) => {
    const xpShortCode = req.query.shortcode;
    if(typeof xpShortCode !== "string") {
        res.status(400).end();
        return;
    }
    const xp = await getExperience(xpShortCode);

    if(xp) {
        res.status(200).json(xp);
    } else {
        res.status(404).end();
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