import QUIZ from "../assets/quiz-logo.png";


export default function Header(){
    return(
        <header>
            <img src={QUIZ} alt="Quiz Game Logo"/>
            <h1>React Knowledge Check</h1>
        </header>
    );
}