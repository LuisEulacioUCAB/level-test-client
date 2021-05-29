import { createAction } from '@cobuildlab/react-simple-state';
import {
  FETCH_LEVEL_TEST_ENDPOINT,
  CREATE_LEVEL_TEST_RESPONSE_ENDPOINT,
  UPDATE_LEVEL_TEST_RESPONSE_ENDPOINT,
  FINISH_LEVEL_TEST_RESPONSE_ENDPOINT,
} from '../../contants';
import {
  createLevelTestResponseErrorEvent,
  createLevelTestResponseEvent,
  fetchLevelTestResponseErrorEvent,
  fetchLevelTestResponseEvent,
  finishLevelTestErrorEvent,
  finishLevelTestEvent,
  updateLevelTestResponseErrorEvent,
  updateLevelTestResponseEvent,
} from './question-provider-events';
import { LevelTestResponseType } from '../../types';

/**
 *@type {LevelTestResponseType} Level Test Response.
 */

export const fetchLevelTest = createAction(
  fetchLevelTestResponseEvent,
  fetchLevelTestResponseErrorEvent,
  async (levelTestId: number, questionId: number) => {
    const response = await fetch(
      `${FETCH_LEVEL_TEST_ENDPOINT}?levelTestId=${levelTestId}&questionId=${questionId}`,
      {
        method: 'GET',
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

export const createLevelTestResponse = createAction(
  createLevelTestResponseEvent,
  createLevelTestResponseErrorEvent,
  async (levelTestResponse: LevelTestResponseType = {}) => {
    const response = await fetch(`${CREATE_LEVEL_TEST_RESPONSE_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify(levelTestResponse),
      headers: { 'Content-Type': 'application/json' },
    });

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

export const updateLevelTestResponse = createAction(
  updateLevelTestResponseEvent,
  updateLevelTestResponseErrorEvent,
  async (levelTestResponse: LevelTestResponseType = {}) => {
    const response = await fetch(`${UPDATE_LEVEL_TEST_RESPONSE_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify(levelTestResponse),
      headers: { 'Content-Type': 'application/json' },
    });

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

export const finishLevelTest = createAction(
  finishLevelTestEvent,
  finishLevelTestErrorEvent,
  async (levelTestId: number) => {
    const response = await fetch(`${FINISH_LEVEL_TEST_RESPONSE_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify({ id: levelTestId }),
      headers: { 'Content-Type': 'application/json' },
    });

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
