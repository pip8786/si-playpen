import React, {useContext} from "react";
import {QuizContext} from "../context/QuizContext";
import Head from "next/head";
import {ExperienceContext} from "../context/ExperienceContext";

export const HeadWithMeta:React.FC<{title:string}> = ({children, title}) => {
	const {quiz, results} = useContext(QuizContext);
	const {experience} = useContext(ExperienceContext);
	let metaTags;
	if(results && results.answers.length) {
		const totalMin = quiz.questions.reduce((p,c) => p + c.answers.reduce((m, a) => Math.min(a.value,m), Number.MAX_SAFE_INTEGER), 0);
		const totalPossible = quiz.questions.reduce((p,c) => p + c.answers.reduce((m, a) => Math.max(a.value,m), 0), 0);
		const totalAnswered = results.answers.reduce((t, a, i) => t+quiz.questions[i].answers[a].value,0);
		metaTags = <>
			<meta name="twitter:card" content="summary_large_image"/>
			<meta name="twitter:site" content="@SASsoftware"/>
			<meta name="twitter:creator" content="@saseducator"/>
			<meta name="twitter:title" content="Curiosity at Work Quiz"/>
			<meta name="twitter:description" content={`My curiosity score is ${totalAnswered}. What's yours? Take this simple quiz to find out.`}/>
			<meta name="twitter:image" content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/gauge.png?min=${totalMin}&max=${totalPossible}&value=${totalAnswered}`}/>
			<meta property="og:url"           content={`${process.env.NEXT_PUBLIC_BASE_URL}/${experience.shortcode}/${results.id}`} />
			<meta property="og:type"          content="website" />
			<meta property="og:title"         content="Curiosity at Work Quiz" />
			<meta property="og:description"   content={`My curiosity score is ${totalAnswered}. What's yours? Take this simple quiz to find out.`}/>
			<meta property="og:image"         content={`${process.env.NEXT_PUBLIC_BASE_URL}/api/quiz/gauge.png?min=${totalMin}&max=${totalPossible}&value=${totalAnswered}`} />
		</>;
	}

	return (
		<Head>
			<title>{title}</title>
			{metaTags}
			{children}
		</Head>
	);
}