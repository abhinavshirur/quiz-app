import React, {useState} from 'react';
import './App.css';
import { fetchQuizQuestions } from './Api';

//Components import
import {QuestionCard} from './components/QuestionCard';

//Types import
import { Difficulty, QuestionState } from './Api';

//Styles
import {GlobalStyle, Wrapper} from './App.styles';

const TOTAL_QUESTIONS = 10;

export type AnswerObject = {
  question: string,
  answer: string,
  correct: boolean,
  correctAnswer: string
}

const App = () => { 

  const [loading, setLoading] = useState<boolean>(false);
  const [questions, setQuestions] = useState<QuestionState[]>([]);
  const [number, setNumber] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState<number>(0);
  const [gameOver, setGameOver] = useState<boolean>(true);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false);

    const newQuestions = await(fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    ));

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);
  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if(!gameOver){
      const answer = e.currentTarget.value;
      if(answer === questions[number].correct_answer){
        setScore(score+1);
      }
      const userAnswerObject = {
        question: questions[number].question,
        answer: answer,
        correct: answer === questions[number].correct_answer ? true : false,
        correctAnswer: questions[number].correct_answer
      }
      setUserAnswers([...userAnswers, userAnswerObject]);
    }
  }

  const nextQuestion = () => {
    const nextQuestion = number+1;
    if(nextQuestion === TOTAL_QUESTIONS){
      setGameOver(true);
    }
    else {
      setNumber(nextQuestion);
    }
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
      <h1>My Quiz App</h1>
      {
        gameOver || userAnswers.length === TOTAL_QUESTIONS ?
        <button className='Start' onClick={startTrivia}>Start</button> : 
        null
      }
      {
        !gameOver ? <p className='score'>Score:{score}</p> : null
      }
      {
        loading ? <p>Loading Questions...</p> : null
      }
      { !loading && !gameOver && ( 
        <QuestionCard 
          questionNr={number+1}
          totalQuestions={TOTAL_QUESTIONS}
          question={questions[number].question}
          answers={questions[number].answers}
          userAnswer={userAnswers? userAnswers[number] : undefined}
          callback={checkAnswer}
        />
        ) 
      }
      {
        !loading && !gameOver && userAnswers.length === number+1 && number !== TOTAL_QUESTIONS-1 ?
        (<button className='Next' onClick={nextQuestion}>Next Question</button>) :
        null
      }
      
    </Wrapper>
    </>
    
  );
}

export default App;
