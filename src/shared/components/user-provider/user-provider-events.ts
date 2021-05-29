import { createEvent } from '@cobuildlab/react-simple-state';
import { LevelTestResponseType, LevelTestType, UserType } from '../../types';

/**
 * @type {UserType} - User Type.
 * @type {LevelTestType} - LevelTestType Type.
 * @type {LevelTestResponseType} - LevelTestResponseType Type.
 */

export const fetchUserEvent = createEvent<{
  user: UserType;
  levelTest: LevelTestType;
  lastLevelTestResponse: LevelTestResponseType;
}>();
export const fetchUserErrorEvent = createEvent();
