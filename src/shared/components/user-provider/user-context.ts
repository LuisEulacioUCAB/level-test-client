import { createContext } from 'react';
import {
  LevelTestResponseType,
  LevelTestType,
  QuestionType,
  UserType,
} from '../../types';

/**
 * @type {UserType} User Type.
 * @type {LevelTestType} LevelTestType Type.
 * @type {QuestionType} Level Test Type.
 * @type {LevelTestResponseType} LevelTestResponseType Type.
 */
export type DefaultValuesContextType = {
  currentUser: UserType | null;
  init: (email: string, introductionId: number) => void;
  loading: boolean;
  questions: QuestionType[];
  levelTest: LevelTestType | null;
  lastLevelTestResponse: LevelTestResponseType | null;
  finishTest: () => void;
  onRepeat: () => void;
};

const defaultValues = {
  currentUser: null,
  init: () => {},
  loading: false,
  questions: [],
  levelTest: null,
  lastLevelTestResponse: null,
  finishTest: () => {},
  onRepeat: () => {},
};

export const Context = createContext<DefaultValuesContextType>(defaultValues);

export const { Provider } = Context;
