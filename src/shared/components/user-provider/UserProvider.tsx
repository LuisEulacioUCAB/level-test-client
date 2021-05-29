import React, { ReactNode, useEffect, useState } from 'react';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { Provider } from './user-context';
import {
  LevelTestResponseType,
  LevelTestType,
  QuestionType,
  UserType,
} from '../../types';
import { fetchUserErrorEvent, fetchUserEvent } from './user-provider-events';
import { fetchUser } from './user-provider-actions';
import { fetchQuestions } from '../../../modules/questions/questions-actions';
import { fetchQuestionsEvent } from '../../../modules/questions/questions-events';
import { levelTestRepeat } from '../../../modules/result/result-actions';
import { levelTestRepeatEvent } from '../../../modules/result/result-events';

/**
 * @type {ReactNode} - Children Node.
 * @type {UserType} - User.
 * @type {LevelTestType} - LevelTestType.
 * @type {QuestionType} - Level questions.
 * @type {LevelTestResponseType} - Level questions.
 */

type UserProviderProps = {
  children?: ReactNode;
};

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserType | null>(null);
  const [levelTest, setLevelTest] = useState<LevelTestType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string>('');
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [introductionId, setIntroductionId] = useState<number | null>(null);
  const [
    lastLevelTestResponse,
    setLastLevelTestResponse,
  ] = useState<LevelTestResponseType | null>(null);

  const init = (email: string, selectedIntroductionId: number): void => {
    setLoading(true);
    setUserEmail(email);
    setIntroductionId(selectedIntroductionId);
  };

  useEffect(() => {
    if (userEmail && introductionId) {
      fetchUser(userEmail, introductionId);
      fetchQuestions(introductionId);
    }
  }, [userEmail, introductionId]);

  useSubscription(fetchUserEvent, (data) => {
    if (data) {
      setCurrentUser(data.user);
      setLevelTest(data.levelTest);
      setLastLevelTestResponse(data.lastLevelTestResponse);
    }
    setLoading(true);
  });

  useSubscription(fetchUserErrorEvent, () => {
    setLoading(false);
  });

  useSubscription(fetchQuestionsEvent, (questionsResponse) => {
    if (questionsResponse && questionsResponse.questions) {
      setQuestions(questionsResponse.questions);
    }
  });

  useSubscription(fetchUserErrorEvent, () => {
    setLoading(false);
  });

  useSubscription(levelTestRepeatEvent, (state) => {
    if (state && introductionId && userEmail) {
      window.location.reload();
    }
  });

  const finishTest = (): void => {
    setLevelTest({ ...levelTest, finishLevelTest: true });
  };

  const onRepeat = (): void => {
    if (currentUser?.email && introductionId)
      levelTestRepeat(currentUser?.email as string, introductionId);
  };

  const value = {
    currentUser,
    init,
    loading,
    questions,
    levelTest,
    lastLevelTestResponse,
    finishTest,
    onRepeat,
  };

  return <Provider value={value}>{children}</Provider>;
};
