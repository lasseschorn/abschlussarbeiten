export interface Quizz {
    id: string;
    name: string;
    questions: Question[];
}

export interface Answer {
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    text: string;
    answers: Answer[];
    reference?: string;
}

export interface QuizzResult {
    quizzId: string;
    answers: QuizzAnswer[];
}

export interface QuizzAnswer {
    question: Question;
    answer: Answer;
    correctAnswer: Answer;
}
