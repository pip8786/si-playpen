import {Prisma} from "@prisma/client";
import React, {createContext, FC, useState} from "react";

const quizWithContent = Prisma.validator<Prisma.QuizArgs>()({
	include: {
		questions: {
			include: {
				answers: true
			}
		},
		results: true
	}
});

export type QuizWithContent = Prisma.QuizGetPayload<typeof quizWithContent>;

const questionWithAnswers = Prisma.validator<Prisma.QuestionArgs>()({
	include: {
		answers: true
	}
});

export type QuestionWithAnswers = Prisma.QuestionGetPayload<typeof questionWithAnswers>;

type ContextProps = {
	currentQIndex: number
	answers: number[]
	answerQuestion: (selection:number)=>void
	quiz: QuizWithContent
	currentQuestion: QuestionWithAnswers
}

export const QuizContext = createContext<ContextProps>({} as ContextProps);

let QuizContextProvider: FC<Partial<ContextProps>> = ({children, quiz}) => {
	const [currentQIndex, setCurrentQIndex] = useState(0);
	const [answers, setAnswers] = useState<number[]>([]);

	const answerQuestion = (selection:number) => {
		setAnswers(v => [...v, selection]);
		setCurrentQIndex(v=> v+1);
	}

	return <QuizContext.Provider value={{
		currentQIndex,
		answers,
		answerQuestion,
		quiz:quiz!,
		currentQuestion: quiz!.questions[currentQIndex]
	}}>
		{children}
	</QuizContext.Provider>;
};

export default QuizContextProvider;