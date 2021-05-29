import { createEvent } from '@cobuildlab/react-simple-state';
import { LevelTestResponseType, LevelTestType } from '../../types';

/**
 * @type {LevelTestResponseType} - LevelTestResponse Type.
 * @type {LevelTestType} - LevelTestType Type.
 */

export const fetchLevelTestResponseEvent = createEvent<LevelTestResponseType>();
export const fetchLevelTestResponseErrorEvent = createEvent();

export const createLevelTestResponseEvent = createEvent<
  LevelTestResponseType
>();
export const createLevelTestResponseErrorEvent = createEvent();

export const updateLevelTestResponseEvent = createEvent<
  LevelTestResponseType
>();
export const updateLevelTestResponseErrorEvent = createEvent();

export const finishLevelTestEvent = createEvent<LevelTestType>();
export const finishLevelTestErrorEvent = createEvent();
