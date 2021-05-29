import { createAction } from '@cobuildlab/react-simple-state';
import * as querystring from 'query-string';
import {
  fetchInIntroductionErrorEvent,
  fetchIntroductionEvent,
} from './introduction-events';
import { FETCH_INTRODUCTION_ENDPOINT } from '../../shared/contants';

export const fetchIntroduction = createAction(
  fetchIntroductionEvent,
  fetchInIntroductionErrorEvent,
  async () => {
    const query = querystring.stringify({ id: 1 });

    const response = await fetch(`${FETCH_INTRODUCTION_ENDPOINT}?${query}`, {
      headers: { 'Content-Type': 'application/json' },
      method: 'GET',
    });

    if (!response.ok) {
      const error = (await response.json()) || {};
      console.log('response', error);
      const errorMessage =
        error.message || `Error to get introduction: ${response.statusText}`;
      throw new Error(errorMessage);
    }

    return response.json();
  },
);
