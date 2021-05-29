import { createEvent } from '@cobuildlab/react-simple-state';
import { QuestionType } from '../../shared/types';

/**
 * @type {QuestionType} - Question Type.
 */

export const fetchQuestionsEvent = createEvent<{ questions: QuestionType[] }>();
export const fetchQuestionsErrorEvent = createEvent();
