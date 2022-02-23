import React, {createContext, Dispatch, FC, SetStateAction, useState} from "react";
import quiz from "../src/curiosity.json";

type Answer = {
	text: string
	value: number
}

type Question = {
	title: string
	answers: Answer[]
}

type Quiz = {
	title: string
	subtitle: string
	questions: Question[]
}

type ContextProps = {
	currentQIndex: number
	answers: number[]
	answerQuestion: (selection:number)=>void
	quiz: Quiz
	currentQuestion: Question
}

export const QuizContext = createContext<ContextProps>({} as ContextProps);

let QuizContextProvider: FC<Partial<ContextProps>> = ({children}) => {
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
		quiz,
		currentQuestion: quiz.questions[currentQIndex]
	}}>
		{children}
	</QuizContext.Provider>;
};

export default QuizContextProvider;