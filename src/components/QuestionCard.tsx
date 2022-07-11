import React from "react";
import {nanoid} from "nanoid";
import {AnswerObject} from "../App";
import {Wrapper, ButtonWrapper} from "../QuestionCard.styles";

type Props = {
    question: string,
    answers: string[],
    callback: (e: React.MouseEvent<HTMLButtonElement>) => void,
    userAnswer: AnswerObject | undefined,
    questionNr: number,
    totalQuestions: number
}

export const QuestionCard = ({
    question,
    answers,
    callback,
    userAnswer,
    questionNr,
    totalQuestions
} : Props) => {


    return(
        <Wrapper>
            <p className="number">
                Question: {questionNr} / {totalQuestions}
            </p>
            <p dangerouslySetInnerHTML={{ __html: question}}/>
            <div>
                 {
                    answers && 
                    answers.map(answer => (
                        <ButtonWrapper 
                        key={nanoid()}
                        correct={userAnswer?.correctAnswer === answer}
                        userClicked={userAnswer?.answer === answer}>
                            <button disabled={userAnswer ? true : false} value={answer} onClick={callback} >
                                <span dangerouslySetInnerHTML={{__html: answer}} />
                            </button>
                        </ButtonWrapper>
                    ))
                 }
            </div>
        </Wrapper>
    );
}