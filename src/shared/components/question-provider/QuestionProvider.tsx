import React, { ReactNode, useEffect, useState } from 'react';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { Provider } from './question-provider-context';
import { useUserProviderHook } from '../user-provider/useUserProviderHook';
import {
  createLevelTestResponse,
  fetchLevelTest,
  finishLevelTest,
  updateLevelTestResponse,
} from './question-provider-actions';
import { AnswerType, LevelTestResponseType } from '../../types';
import {
  createLevelTestResponseErrorEvent,
  createLevelTestResponseEvent,
  fetchLevelTestResponseErrorEvent,
  fetchLevelTestResponseEvent,
  finishLevelTestErrorEvent,
  finishLevelTestEvent,
  updateLevelTestResponseEvent,
} from './question-provider-events';

/**
 * @type {AnswerType} AnswerType type.
 * @type {LevelTestResponseType} LevelTestResponse type.
 * @type {ReactNode} Children node.
 */

type QuestionProviderProps = {
  children?: ReactNode;
};
export const QuestionProvider: React.FC<QuestionProviderProps> = ({
  children,
}) => {
  const [loadingBack, setLoadingBack] = useState<boolean>(false);
  const [loadingNext, setLoadingNext] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const {
    levelTest,
    questions,
    lastLevelTestResponse,
    finishTest,
    currentUser,
  } = useUserProviderHook();
  const [activeQuestion, setActiveQuestion] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<AnswerType | null>(null);
  const [pendingQuestion, setPendingQuestion] = useState<number>(0);
  const [
    levelTestResponse,
    setLevelTestResponse,
  ] = useState<LevelTestResponseType | null>(null);

  useEffect(() => {
    if (lastLevelTestResponse && lastLevelTestResponse.order) {
      const lastActiveQuestion = questions.findIndex((q) => {
        return q.order === lastLevelTestResponse.order;
      });
      setActiveQuestion(lastActiveQuestion as number);
    }
  }, [lastLevelTestResponse, questions]);

  useEffect(() => {
    if (
      levelTest?.id &&
      questions &&
      questions.length &&
      questions[activeQuestion]?.id &&
      !levelTest.finishLevelTest
    ) {
      fetchLevelTest(levelTest?.id, questions[activeQuestion]?.id as number);
    }
  }, [activeQuestion, levelTest, questions]);

  useSubscription(fetchLevelTestResponseEvent, (data) => {
    if (data && data.id && data.response) {
      setLevelTestResponse(data);
      setSelectedAnswer(data.response);
    }

    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  useSubscription(fetchLevelTestResponseErrorEvent, (state) => {
    console.log('state', state);
  });

  useSubscription(createLevelTestResponseEvent, (state) => {
    if (state) {
      setActiveQuestion(pendingQuestion);
      if (loadingBack) setLoadingBack(false);
      if (loadingNext) setLoadingNext(false);
      setLoading(true);
      setSelectedAnswer(null);
      setLevelTestResponse(null);
    }
  });

  useSubscription(createLevelTestResponseErrorEvent, (state) => {
    console.log('state');
  });

  useSubscription(finishLevelTestEvent, () => {
    finishTest();
  });

  useSubscription(finishLevelTestErrorEvent, (state) => {
    console.log('state');
  });

  useSubscription(finishLevelTestErrorEvent, (state) => {
    console.log('state');
  });

  useSubscription(updateLevelTestResponseEvent, (state) => {
    if (state) {
      setActiveQuestion(pendingQuestion);
      if (loadingBack) setLoadingBack(false);
      if (loadingNext) setLoadingNext(false);
      setLoading(true);
      setLevelTestResponse(null);
      setSelectedAnswer(null);
    }
  });

  const onSelectedAnswer = (answer: AnswerType): void => {
    setSelectedAnswer(answer);
  };

  const onNextPage = (): void => {
    setLoadingNext(true);

    if (!levelTestResponse?.id) {
      const { id, correctAnswer, order } = questions[activeQuestion];

      const data: LevelTestResponseType = {
        order,
        levelTestId: levelTest?.id,
        questionId: id,
        response: selectedAnswer as AnswerType,
        isCorrect:
          JSON.stringify(selectedAnswer) === JSON.stringify(correctAnswer),
      };

      createLevelTestResponse(data);
    } else {
      const { correctAnswer } = questions[activeQuestion];
      const data: LevelTestResponseType = {
        ...levelTestResponse,
        response: selectedAnswer as AnswerType,
        isCorrect:
          JSON.stringify(selectedAnswer) === JSON.stringify(correctAnswer),
      };

      if (JSON.stringify(levelTestResponse) !== JSON.stringify(data)) {
        updateLevelTestResponse(data);
      } else {
        setActiveQuestion(activeQuestion + 1);
        setLoadingNext(false);
        setSelectedAnswer(null);
        setLevelTestResponse(null);
        setLoading(true);
      }
    }

    setPendingQuestion(activeQuestion + 1);
  };

  const onBackPage = (): void => {
    setLoadingBack(true);

    if (activeQuestion === questions.length || !selectedAnswer) {
      // if users stay in finish step view
      setActiveQuestion(activeQuestion - 1);
      setLoadingBack(false);
      setSelectedAnswer(null);
      setLevelTestResponse(null);
      setLoading(true);
    } else if (!levelTestResponse?.id) {
      const { id, correctAnswer, order } = questions[activeQuestion];
      const data: LevelTestResponseType = {
        order,
        levelTestId: levelTest?.id,
        questionId: id,
        response: selectedAnswer as AnswerType,
        isCorrect:
          JSON.stringify(selectedAnswer) === JSON.stringify(correctAnswer),
      };

      createLevelTestResponse(data);
    } else {
      const { correctAnswer } = questions[activeQuestion];
      const data: LevelTestResponseType = {
        ...levelTestResponse,
        response: selectedAnswer as AnswerType,
        isCorrect:
          JSON.stringify(selectedAnswer) === JSON.stringify(correctAnswer),
      };

      if (JSON.stringify(levelTestResponse) !== JSON.stringify(data)) {
        updateLevelTestResponse(data);
      } else {
        setActiveQuestion(activeQuestion - 1);
        setLoadingBack(false);
        setSelectedAnswer(null);
        setLevelTestResponse(null);
        setLoading(true);
      }
    }

    setPendingQuestion(activeQuestion - 1);
  };

  const onFinishLevelTest = (): void => {
    setLoadingNext(true);
    if (levelTest && levelTest?.id && currentUser && currentUser?.id) {
      finishLevelTest(levelTest?.id, currentUser?.id);
    }
  };

  const value = {
    loadingBack,
    loadingNext,
    activeQuestion,
    selectedAnswer,
    onNextPage,
    onBackPage,
    onSelectedAnswer,
    loading,
    onFinishLevelTest,
  };

  return <Provider value={value}>{children}</Provider>;
};
