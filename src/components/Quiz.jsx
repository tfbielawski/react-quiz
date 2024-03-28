import { useState, useCallback } from "react";
import QUESTIONS from "../helpers/questions.js";
import Question from "./Question.jsx";
import Summary from "./Summary.jsx";


/* NO LONGER WORKING. AT ALL. */

export default function Quiz() {
    const [userAnswers, setUserAnswers] = useState([]);

    //As questions are answered, userAswers increments by 1.
    //if length is 0, question 1 will be next, etc. 
    const activeQuestionIndex = userAnswers.length;
    const quizComplete = activeQuestionIndex === QUESTIONS.length;


    const handleSelectAnswer = useCallback(
        function handleSelectAnswer(selectedAnswer){
        setUserAnswers((prevUserAnswers) => {
            return [...prevUserAnswers, selectedAnswer]
        });
        
    }, []);

    const handleSkipAnswer = useCallback(() => {handleSelectAnswer(null), [handleSelectAnswer]});

    if(quizComplete){
        return(
            <Summary userAnswers={userAnswers}/>
        )
    }

    
    return (
        <div id="quiz">
            <Question 
                key={activeQuestionIndex} //when the key changes, react unmounts and remounts or destroys component, forcing a recreation
                index={activeQuestionIndex}
                onSelectAnswer={handleSelectAnswer}
                onSkipAnswer={handleSkipAnswer}
            />
        </div>
    )
}