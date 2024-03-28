import { useState } from "react";
import QuestionTimer from "./QuestionTimer.jsx";
import Answers from "./Answers.jsx";
import QUESTIONS from "../helpers/questions.js";


function Question({index, onSelectAnswer, onSkipAnswer}) {
    const [answer, setAnswer] = useState({
        selectedAnswer:"",
        isCorrect: null,
    });

    let timer = 10000;

    if(answer.selectedAnswer){
        timer = 1000;
    }

    if(answer.isCorrect !== null){
        timer = 2000;
    }

    function handleSelectAnswer(answer){
        setAnswer({
            selectedAnswer: answer,
            isCorrect: null,
        })

        setTimeout(() => {
            setAnswer({
                //Maybe create a func that checks for correct answer, and call it here? 
                selectedAnswer: answer,
                isCorrect: QUESTIONS[index].answers[0] === answer
            })

            setTimeout(() => {
                onSelectAnswer(answer)
            }, 2000);
        }, 1000);
    }

    let answerState = "";

    if(answer.selectedAnswer && answer.isCorrect !== null){
        answerState = answer.isCorrect ? "correct" : "wrong" ;
    }
    else if(answer.selectedAnswer){
        answerState = "answered";
    }

    return (
    <div id="question">
        <QuestionTimer 
            //key={activeQuestionIndex} //cannot have two keys with identical value, moved to question component in quiz.jsx
            key={timer} //no key clashing with this one, recreates timer
            timeout={timer} 
            onTimeout={answer.selectedAnswer === "" ? onSkipAnswer : null} //Tells game no answer chosen
            mode={answerState}
        />
        <h2>{QUESTIONS[index].text}</h2>
        <Answers 
            //key={activeQuestionIndex} //cannot have two keys with identical value, moved to question component in quiz.jsx
            answers={QUESTIONS[index].answers}
            selectedAnswer={answer.selectedAnswer}
            answerState={answerState}
            onSelect={handleSelectAnswer}
        />
    </div>
  )
}

export default Question