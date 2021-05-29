import { createEvent } from '@cobuildlab/react-simple-state';
import { LevelTestType, ResultType } from '../../shared/types';

/**
 * @type {LevelTestType} types.
 * @type {ResultType} types.
 */

export const fetchLevelTestResultsEvent = createEvent<{ count: 0 }>();
export const fetchLevelTestResultsErrorEvent = createEvent();

export const levelTestRepeatEvent = createEvent<LevelTestType>();
export const levelTestRepeatErrorEvent = createEvent();

export const levelTestPDFResultEvent = createEvent<{ results: ResultType[] }>();
export const levelTestPDFResultErrorEvent = createEvent();

export const levelTestResendResultEmailEvent = createEvent<{
  message: string;
}>();
export const levelTestResendResultEmailErrorEvent = createEvent();
