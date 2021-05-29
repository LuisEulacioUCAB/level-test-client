import { createAction } from '@cobuildlab/react-simple-state';
import { fetchUserErrorEvent, fetchUserEvent } from './user-provider-events';
import { FETCH_USER_ENDPOINT } from '../../contants';

export const fetchUser = createAction(
  fetchUserEvent,
  fetchUserErrorEvent,
  async (email: string, introductionId: number) => {
    const response = await fetch(`${FETCH_USER_ENDPOINT}`, {
      method: 'POST',
      body: JSON.stringify({ email, introductionId }),
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
