import { useContext } from 'react';
import { DefaultValuesContextType, Context } from './user-context';

/**
 * @type {DefaultValuesContextType} - Default values type.
 */

export const useUserProviderHook = (): DefaultValuesContextType => {
  const {
    currentUser,
    init,
    loading,
    questions,
    levelTest,
    lastLevelTestResponse,
    finishTest,
    onRepeat,
  } = useContext(Context);

  return {
    currentUser,
    init,
    loading,
    questions,
    levelTest,
    lastLevelTestResponse,
    finishTest,
    onRepeat,
  };
};
