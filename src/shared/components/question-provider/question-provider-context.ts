import { createContext } from 'react';
import { AnswerType, QuestionType } from '../../types';

/**
 * @type {QuestionType} Level Test Type.
 * @type {AnswerType} AnswerType Type.
 */
export type DefaultValuesContextType = {
  loadingNext: boolean;
  loadingBack: boolean;
  loading: boolean;
  activeQuestion: number;
  onNextPage: () => void;
  onBackPage: () => void;
  onFinishLevelTest: () => void;
  onSelectedAnswer: (answer: AnswerType) => void;
  selectedAnswer: AnswerType | null;
};

const defaultValues = {
  loadingNext: false,
  loadingBack: false,
  loading: true,
  activeQuestion: 0,
  onNextPage: () => {},
  onBackPage: () => {},
  onFinishLevelTest: () => {},
  onSelectedAnswer: () => {},
  selectedAnswer: null,
};

export const Context = createContext<DefaultValuesContextType>(defaultValues);

export const { Provider } = Context;
