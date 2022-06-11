import {NextApiRequest, NextApiResponse} from "next";
import {prisma} from "src/util/db";

const curious = {
    "id": 1,
    "name": "Curiosity at Work Quiz",
    "subtitle": "How do you show curiosity in the workplace?",
    "shortcode": "curious",
    "createdAt": "2022-03-02T21:46:29.088Z",
    "updatedAt": "2022-03-02T21:46:29.088Z",
    "publishedAt": null,
    "status": "Pending",
    "type": "Quiz",
    "quiz": {
        "id": 1,
        "experienceId": 1,
        "questions": [{
            "id": 1,
            "quizId": 1,
            "text": "Investigation",
            "answers": [{
                "id": 1,
                "questionId": 1,
                "text": "I tend to put up with issues longer than I should.",
                "value": 1
            }, {
                "id": 2,
                "questionId": 1,
                "text": "If I encounter a problem, I look into a solution.",
                "value": 2
            }, {
                "id": 3,
                "questionId": 1,
                "text": "I'm always investigating, even if there's nothing wrong.",
                "value": 3
            }]
        }, {
            "id": 2,
            "quizId": 1,
            "text": "Routine",
            "answers": [{
                "id": 4,
                "questionId": 2,
                "text": "Repetition makes my days go smoother.",
                "value": 1
            }, {"id": 5, "questionId": 2, "text": "I need to have some changes day-to-day.", "value": 2}, {
                "id": 6,
                "questionId": 2,
                "text": "I always want to be doing something new.",
                "value": 3
            }]
        }, {
            "id": 3,
            "quizId": 1,
            "text": "Asking Questions",
            "answers": [{
                "id": 7,
                "questionId": 3,
                "text": "I try not to ask too many questions.",
                "value": 1
            }, {
                "id": 8,
                "questionId": 3,
                "text": "I ask questions when there's something I want or need to know more about.",
                "value": 2
            }, {
                "id": 9,
                "questionId": 3,
                "text": "I ask a lot of questions - you never know what you might learn.",
                "value": 3
            }]
        }, {
            "id": 4,
            "quizId": 1,
            "text": "Approach",
            "answers": [{
                "id": 10,
                "questionId": 4,
                "text": "I generally do things the best way.",
                "value": 1
            }, {
                "id": 11,
                "questionId": 4,
                "text": "I am confident in my approach but can learn from others.",
                "value": 2
            }, {
                "id": 12,
                "questionId": 4,
                "text": "I think there's always something new I can learn from others' approaches.",
                "value": 3
            }]
        }, {
            "id": 5,
            "quizId": 1,
            "text": "Skills",
            "answers": [{
                "id": 13,
                "questionId": 5,
                "text": "My current skill set meets my career needs.",
                "value": 1
            }, {
                "id": 14,
                "questionId": 5,
                "text": "There are a few areas I need to continue to grow in.",
                "value": 2
            }, {
                "id": 15,
                "questionId": 5,
                "text": "I frequently seek out additional training and credentials.",
                "value": 3
            }]
        }],
        "results": [{
            "id": 1,
            "quizId": 1,
            "min": 5,
            "max": 7,
            "shortLabel": "LOW",
            "text": "Low: It's time to channel your inner toddler and ask 'WHY?' more often. Branch out and experience something new - ask questions, listen to new perspectives, think outside the box. Challenge yourself to step outside your comfort zone more often. Your career success might depend on it. Start today!"
        }, {
            "id": 2,
            "quizId": 1,
            "min": 8,
            "max": 10,
            "shortLabel": "AVERAGE",
            "text": "Average: Your sense of curiosity is predictable and calculated. You might be pleasantly surprised at the doors that open if you take more chances - actively seek out knowledge and experiences that you wouldn't normally attempt. You might have fun and boost your career success in the process."
        }, {
            "id": 3,
            "quizId": 1,
            "min": 11,
            "max": 13,
            "shortLabel": "HIGH",
            "text": "High: You're highly inquisitive and tend to embrace change. Your curious nature is going to pay off in your career as well as the rest of your life. Keep pushing boundaries, don't be afraid to fail, and challenge those around you to do the same. Life's about the journey and your sense of wonder will take you down some amazing paths."
        }, {
            "id": 4,
            "quizId": 1,
            "min": 14,
            "max": 15,
            "shortLabel": "EXCEPTIONAL",
            "text": "Exceptional: Your curiosity level is off the charts. Are you sure you're not a cat? Props to you for constantly seeking knowledge and adventure. Be sure to channel your own curiosity to maximize productivity in the workplace. You might want to consider offering advice to others on ways to enhance their inherent sense of wonder."
        }]
    }
};

export default async (req: NextApiRequest, res: NextApiResponse) => {
    console.log(process.env.DATABASE_URL);
    console.log("sqlserver://DBSMSD07.na.sas.com;database=SIAccounts;user=giqconnect;password=9jnY9SbjYK0DI)ZIz7$U4leIh;encrypt=true;trustServerCertificate=true;");
    res.status(200).end();

}