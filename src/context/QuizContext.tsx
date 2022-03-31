import {Prisma, QuizUserAnswers} from "@prisma/client";
import React, {createContext, Dispatch, FC, SetStateAction, useState} from "react";

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

export type QuizSummary = {
	total: number
	grouped: number[]
	labels: string[]
	youGroup: number
	youRange?: [number,number]
};

type ContextProps = {
	currentQIndex: number
	answers: number[]
	answerQuestion: (selection:number)=>void
	quiz: QuizWithContent
	currentQuestion: QuestionWithAnswers
	results?: QuizUserAnswers
	summary?: QuizSummary
}

export const QuizContext = createContext<ContextProps>({} as ContextProps);

let QuizContextProvider: FC<Partial<ContextProps>> = ({children, quiz, results, summary}) => {
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
		currentQuestion: quiz!.questions[currentQIndex],
		results,
		summary
	}}>
		{children}
	</QuizContext.Provider>;
};

export default QuizContextProvider;