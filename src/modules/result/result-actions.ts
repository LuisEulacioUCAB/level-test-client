import { createAction } from '@cobuildlab/react-simple-state';
import {
  fetchLevelTestResultsErrorEvent,
  fetchLevelTestResultsEvent,
  levelTestPDFResultErrorEvent,
  levelTestPDFResultEvent,
  levelTestRepeatErrorEvent,
  levelTestRepeatEvent,
  levelTestResendResultEmailErrorEvent,
  levelTestResendResultEmailEvent,
} from './result-events';
import {
  FETCH_LEVEL_TEST_RESULTS_ENDPOINT,
  LEVEL_TEST_PDF_RESULT_ENDPOINT,
  LEVEL_TEST_REPEAT_ENDPOINT,
  LEVEL_TEST_RESEND_RESULT_ENDPOINT,
} from '../../shared/contants';

export const fetchLevelTestResults = createAction(
  fetchLevelTestResultsEvent,
  fetchLevelTestResultsErrorEvent,
  async (id: number, email: string) => {
    const response = await fetch(`${FETCH_LEVEL_TEST_RESULTS_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify({ email, id }),
      headers: { 'Content-Type': 'application/json' },
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

export const levelTestRepeat = createAction(
  levelTestRepeatEvent,
  levelTestRepeatErrorEvent,
  async (email: string, introductionId: number) => {
    const response = await fetch(
      `${LEVEL_TEST_REPEAT_ENDPOINT}?email=${email}&id=${introductionId}`,
      {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      },
    );

    if (!response.ok) {
      const error = (await response.json()) || {};
      console.log('response', error);
      const errorMessage =
        error.message || `Error to get user: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  },
);

export const fetchLevelTestPDFResults = createAction(
  levelTestPDFResultEvent,
  levelTestPDFResultErrorEvent,
  async (id: number, userId: number) => {
    const response = await fetch(`${LEVEL_TEST_PDF_RESULT_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify({ userId, id }),
      headers: { 'Content-Type': 'application/json' },
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

export const levelTestResendResultEmail = createAction(
  levelTestResendResultEmailEvent,
  levelTestResendResultEmailErrorEvent,
  async (id: number, userId: number) => {
    const response = await fetch(`${LEVEL_TEST_RESEND_RESULT_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify({ userId, id }),
      headers: { 'Content-Type': 'application/json' },
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
