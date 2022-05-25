import React, {createContext, FC, ReactNode} from "react";
import {ExperienceWithContent} from "pages/api/experience/[shortcode]";

type ContextProps = {
	experience:ExperienceWithContent
}

export const ExperienceContext = createContext<ContextProps>({} as ContextProps);

let ExperienceContextProvider: FC<ContextProps & {children: ReactNode}> = ({children, experience}) => {
	return <ExperienceContext.Provider value={{
		experience
	}}>
		{children}
	</ExperienceContext.Provider>;
};

export default ExperienceContextProvider;