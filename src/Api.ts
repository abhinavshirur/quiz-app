import { shuffleArray } from "./utils";

export enum Difficulty {
    EASY = "easy",
    MEDIUM = "medium",
    HARD = "hard"
}

export type Question = {
    category: string,
    difficulty: string,
    correct_answer: string,
    incorrect_answers: string[],
    question: string,
    type: string
}

export type QuestionState = Question & {answers: []}; 

export const fetchQuizQuestions = async(amount: number, difficulty: Difficulty) => {

    const endpoint = `https://opentdb.com/api.php?amount=${amount}&category=18&difficulty=${difficulty}&type=multiple`;
    const data = await(await fetch(endpoint)).json();

    return data.results.map((result : Question) => (
        {
            ...result,
            answers:  shuffleArray([...result.incorrect_answers, result.correct_answer])
        }
    ));
}

