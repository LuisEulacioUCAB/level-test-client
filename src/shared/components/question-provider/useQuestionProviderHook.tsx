import { useContext } from 'react';
import { DefaultValuesContextType, Context } from './question-provider-context';

/**
 * @type {DefaultValuesContextType} Default values.
 */
export const useQuestionProviderHook = (): DefaultValuesContextType => {
  const {
    loadingNext,
    loadingBack,
    activeQuestion,
    onNextPage,
    onBackPage,
    selectedAnswer,
    onSelectedAnswer,
    loading,
    onFinishLevelTest,
  } = useContext(Context);

  return {
    loadingNext,
    loadingBack,
    activeQuestion,
    onNextPage,
    onBackPage,
    selectedAnswer,
    onSelectedAnswer,
    loading,
    onFinishLevelTest,
  };
};
