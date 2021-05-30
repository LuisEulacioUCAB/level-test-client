import React, { ChangeEvent, useEffect, useState } from 'react';
import { useSubscription } from '@cobuildlab/react-simple-state';
import { Paper, Box, Grid, TextField } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InnerHTML from 'dangerously-set-html-content';
import { fetchIntroduction } from './introduction-actions';
import {
  fetchInIntroductionErrorEvent,
  fetchIntroductionEvent,
} from './introduction-events';
import { IntroductionType } from '../../shared/types';
import { Loader } from '../../shared/components/Loader';
import { ButtonDefault } from '../../shared/components/buttons/buttons';
import { useUserProviderHook } from '../../shared/components/user-provider/useUserProviderHook';

type IntroductionViewProps = {
  language?: string;
};

const useStyles = makeStyles({
  paper: {
    height: 460,
  },
  paperHtml: {
    maxHeight: 350,
    overflow: 'auto',
    padding: 15,
    marginBottom: 15,
  },
});

export const IntroductionView: React.FC<IntroductionViewProps> = () => {
  /**
   * @type {IntroductionType} Introduction Type.
   */
  const [introduction, setIntroduction] = useState<IntroductionType | null>(
    null,
  );
  const [email, setEmail] = useState<string>('');
  const classes = useStyles();
  const { loading, init } = useUserProviderHook();

  useEffect(() => {
    fetchIntroduction();
  }, []);

  useSubscription(fetchIntroductionEvent, (state) => {
    if (state) {
      setIntroduction(state);
    }
  });

  useSubscription(fetchInIntroductionErrorEvent, (state) => {
    console.log('state', state);
  });

  /**
   * Change email value.
   *
   * @param {ChangeEvent}event - Handle event.
   */
  const onHandleEmail = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { value } = event.target;
    setEmail(value);
  };

  if (!introduction) {
    return (
      <Box m={2}>
        <Paper
          elevation={1}
          classes={{
            root: classes.paper,
          }}>
          <Loader />
        </Paper>
      </Box>
    );
  }

  return (
    <Box m={2}>
      <Paper
        elevation={1}
        classes={{
          root: classes.paper,
        }}>
        <Box p={4}>
          <Paper
            variant="outlined"
            classes={{
              root: classes.paperHtml,
            }}>
            <InnerHTML html={introduction?.introductionHtml as string} />
          </Paper>
          <Grid container spacing={2}>
            <Grid xs={6} item>
              <TextField
                label="Email"
                value={email}
                variant="outlined"
                color="secondary"
                fullWidth
                size="small"
                onChange={onHandleEmail}
              />
            </Grid>
            <Grid xs={6} item>
              <Box textAlign="right">
                <ButtonDefault
                  color="primary"
                  variant="contained"
                  onClick={() => init(email, introduction?.id as number)}
                  isLoading={loading}>
                  Iniciar test
                </ButtonDefault>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
