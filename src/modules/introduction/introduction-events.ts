import { createEvent } from '@cobuildlab/react-simple-state';
import { IntroductionType } from '../../shared/types';

/**
 * @type {IntroductionType} Introduction Type.
 */

export const fetchIntroductionEvent = createEvent<IntroductionType>();
export const fetchInIntroductionErrorEvent = createEvent();
