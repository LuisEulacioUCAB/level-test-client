import { AnswerType } from '../../shared/types';

/**
 * Sanitize question.
 *
 * @type {AnswerType} Answer type.
 * @param {string}question - Question.
 * @param {AnswerType}answer - Selected answer.
 * @returns {string} New Question.
 */
export const sanitizeQuestion = (
  question: string,
  answer: AnswerType,
): string => {
  const re = /\[.+?]/g;

  return !answer
    ? question.replace(
      re,
      '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>',
    )
    : question.replace(
      re,
      `<span style='border-bottom: 2px solid black; padding-bottom: 2px'>${answer.label}</span>`,
    );
};

/**
 * Sanitize question.
 *
 * @type {AnswerType} Answer type.
 * @param {string}question - Question.
 * @param {AnswerType}answer - Selected answer.
 * @returns {string} New Question.
 */
export const sanitizeQuestionMultipleInputs = (
  question: string,
  answer: AnswerType,
): string => {
  let newQuestion = question;

  if (answer) {
    const label = answer.label as string;
    const res = label.split(' - ');

    if (Array.isArray(res)) {
      res.forEach((r, x) => {
        newQuestion = newQuestion.replace(
          `[${x}]`,
          `<span style='border-bottom: 2px solid black; padding-bottom: 2px'>${r}</span>`,
        );
      });
    }
  } else {
    const re = /\[.+?]/g;
    newQuestion = newQuestion.replace(
      re,
      '<u>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</u>',
    );
  }

  return newQuestion;
};

export const progressMessage = (step: number): string => {
  switch (step) {
  case 10:
    return 'Vamos paso a paso. Muy bien';
  case 20:
    return 'Buen trabajo. Adelante';
  case 30:
    return 'Eres casi un experto';
  case 40:
    return 'Casi llegas a la meta';
  case 50:
    return 'Eres el mejor';
  default:
    return 'Un buen comienzo. Sigue así';
  }
};

export const finishTestMessage = (step: number): string => {
  switch (step) {
  case 10:
    return '¿Quieres continuar?. \nLas preguntas aumentarán su grado de dificultad. Puedes terminar aquí o seguir adelante hasta completar tu prueba';
  case 20:
    return '¿Sigues en la carrera?';
  case 30:
    return '¿Quieres alcanzar la meta?';
  case 40:
    return '¿se está poniendo difícil?';
  case 50:
    return 'Avanzas muy rápido ¿continuamos?';
  case 60:
    return '¡Lo lograste! GOTALKTO agradece tu esfuerzo';
  default:
    return '';
  }
};
