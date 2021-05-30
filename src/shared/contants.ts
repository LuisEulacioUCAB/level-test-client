export const ENDPOINT =
  process.env.REACT_APP_ENDPOINT ?? 'http://localhost:8000';
export const FETCH_INTRODUCTION_ENDPOINT = `${ENDPOINT}/introduction/`;
export const FETCH_USER_ENDPOINT = `${ENDPOINT}/user-info/`;
export const FETCH_QUESTIONS_ENDPOINT = `${ENDPOINT}/question/`;
export const FETCH_LEVEL_TEST_ENDPOINT = `${ENDPOINT}/level_test_response/`;
export const CREATE_LEVEL_TEST_RESPONSE_ENDPOINT = `${ENDPOINT}/level_test_response/create/`;
export const UPDATE_LEVEL_TEST_RESPONSE_ENDPOINT = `${ENDPOINT}/level_test_response/update/`;
export const FINISH_LEVEL_TEST_RESPONSE_ENDPOINT = `${ENDPOINT}/level_test_introduction/finish-test/`;
export const FETCH_LEVEL_TEST_RESULTS_ENDPOINT = `${ENDPOINT}/level_test_introduction/results/`;
export const LEVEL_TEST_REPEAT_ENDPOINT = `${ENDPOINT}/level_test_introduction/repeat/`;
export const LEVEL_TEST_PDF_RESULT_ENDPOINT = `${ENDPOINT}/level_test_introduction/pdf-result/`;
export const LEVEL_TEST_RESEND_RESULT_ENDPOINT = `${ENDPOINT}/level_test_introduction/resend_email/`;

export const CHECKBOX_QUESTION = 'checkbox';
export const CHECKBOX_INPUT_QUESTION = 'checkbox-input';
export const CHECKBOX_MULTIPLES_INPUT_QUESTION = 'checkbox-multiples-input';

export const EACH_FINISH_STEP = process.env.EACH_FINISH_STEP ?? '10';
