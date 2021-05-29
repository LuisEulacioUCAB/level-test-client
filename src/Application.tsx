import React from 'react';
import './App.css';
import { Grid } from '@material-ui/core';
import { IntroductionView } from './modules/introduction/IntroductionView';
import { useUserProviderHook } from './shared/components/user-provider/useUserProviderHook';
import { QuestionsView } from './modules/questions/QuestionsView';
import { ResultView } from './modules/result/ResultView';

export const Application: React.FC = () => {
  const { currentUser, levelTest } = useUserProviderHook();

  if (!currentUser) {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid xs={6} item>
          <IntroductionView />
        </Grid>
      </Grid>
    );
  }

  if (!levelTest?.finishLevelTest) {
    return (
      <Grid container direction="row" justify="center" alignItems="center">
        <Grid xs={6} item>
          <QuestionsView />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      <Grid xs={6} item>
        <ResultView />
      </Grid>
    </Grid>
  );
};
