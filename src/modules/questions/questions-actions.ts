import { createAction } from '@cobuildlab/react-simple-state';
import { FETCH_QUESTIONS_ENDPOINT } from '../../shared/contants';
import {
  fetchQuestionsErrorEvent,
  fetchQuestionsEvent,
} from './questions-events';

export const fetchQuestions = createAction(
  fetchQuestionsEvent,
  fetchQuestionsErrorEvent,
  async (id: number) => {
    const response = await fetch(`${FETCH_QUESTIONS_ENDPOINT}?id=${id}`, {
      method: 'GET',
    });

    if (!response.ok) {
      const error = (await response.json()) || {};
      console.log('response', error);
      const errorMessage =
        error.message || `Error to get questions: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  },
);
