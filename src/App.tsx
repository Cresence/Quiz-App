import React, { useState } from 'react';
import {  fetchQuizQuestions } from './components/API';
// Components
import QuestionCard from './components/QuestionCard';
// Types
import { Difficulty, QuesionState } from './components/API';

const App = () => {

  type AnswerObject = {
    question: string;
    answer: string;
    correct: boolean;
    correctAnswer: string;
  };
  
  const TOTAL_QUESTIONS = 10;

  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState<QuesionState[]>([]);
  const [number, setNumber] = useState(0);
  const [userAnswers, setUserAnswers] = useState<AnswerObject[]>([]);
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(true);

  console.log(questions);

  const startTrivia = async () => {
    setLoading(true);
    setGameOver(false)

    const newQuestions = await fetchQuizQuestions(
      TOTAL_QUESTIONS,
      Difficulty.EASY
    );

    setQuestions(newQuestions);
    setScore(0);
    setUserAnswers([]);
    setNumber(0);
    setLoading(false);

  }

  const checkAnswer = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!gameOver) {
      // User's answer
      const answer = e.currentTarget.value;
      // Check user's answer against correct answer
      const correct = questions[number].correct_answer === answer;
      // Add score if user's answer is correct
      if (correct) setScore(prev => prev + 1);
      // Save answer in the array for user's answers
      const answerObject = {
        question: questions[number].question,
        answer,
        correct,
        correctAnswer: questions[number].correct_answer
      };
      setUserAnswers(prev => [...prev, answerObject]);
    }
  };

  const nextQuestion = () => {
    // Move onto next question if not last question.
    const nextSelection = number + 1;

    if (nextSelection === TOTAL_QUESTIONS) {
      setGameOver(true);
    } else {
      setNumber(nextSelection);
    }
  }

  return (
  <div className="App">
    <h1>REACT QUIZ</h1>
    {gameOver || userAnswers.length === TOTAL_QUESTIONS ? 
      <button className="start" onClick={startTrivia}>
        Start
      </button> 
      : null}
    {!gameOver ? <p className="score">Score: </p> : null }
    {loading && <p>Loading Questions ...</p>}
    {!loading && !gameOver && (     
    <QuestionCard 
      questionNr={number + 1}
      totalQuestions={TOTAL_QUESTIONS}
      question={questions[number].question}
      answers={questions[number].answers}
      userAnswer={userAnswers ? userAnswers[number] : undefined}
      callback={checkAnswer}
    />
 )}
 {!gameOver && !loading && userAnswers.length === number + 1 && number !== TOTAL_QUESTIONS - 1 ? ( 
    <button className="next" onClick={nextQuestion}>
      Next Question
    </button> ) 
    : null
  } 
    
  </div>)
}

export default App
