export interface UserType {
  id?: number;
  email?: string;
}

export interface IntroductionType {
  id?: number;
  introductionHtml?: string;
  language?: string;
}

export interface QuestionType {
  id?: number;
  introductionId?: number;
  question?: string;
  answers?: string;
  correctAnswer?: string;
  type?: string;
  content?: string;
  order?: number;
}

export interface LevelTestType {
  id?: number;
  userId?: number;
  introductionId?: number;
  finishLevelTest?: boolean;
}

export interface LevelTestResponseType {
  id?: number;
  levelTestId?: number;
  isCorrect?: boolean;
  response?: AnswerType;
  questionId?: number;
  order?: number;
}

export interface AnswerType {
  value?: number;
  label?: string;
}

export interface ResultType {
  response: {
    value: string;
    label: string;
  };
  question: string;
  type: string;
  isCorrect: boolean;
  order: string;
}
