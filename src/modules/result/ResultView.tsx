import React, { useEffect, useState } from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useSubscription } from '@cobuildlab/react-simple-state';
import ReplayIcon from '@material-ui/icons/Replay';
import MailOutlineOutlinedIcon from '@material-ui/icons/MailOutlineOutlined';
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf';
import {
  ButtonDefault,
  Loading,
} from '../../shared/components/buttons/buttons';
import {
  fetchLevelTestResultsEvent,
  levelTestRepeatEvent,
  levelTestResendResultEmailErrorEvent,
  levelTestResendResultEmailEvent,
} from './result-events';
import { useUserProviderHook } from '../../shared/components/user-provider/useUserProviderHook';
import {
  fetchLevelTestResults,
  levelTestResendResultEmail,
} from './result-actions';
import { Loader } from '../../shared/components/Loader';
import { getLevel } from './result-utils';

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
  buttons: {
    fontSize: 13,
    padding: '9px 17px',
  },
});

export const ResultView: React.FC = () => {
  const classes = useStyles();
  const [results, setResults] = useState<number>(0);
  const { currentUser, levelTest, questions, onRepeat } = useUserProviderHook();
  const [loading, setLoading] = useState<boolean>(true);
  const [loadingRepeat, setLoadingRepeat] = useState<boolean>(false);
  const [loadingResend, setLoadingResend] = useState<boolean>(false);
  const level = getLevel(results);

  useEffect(() => {
    fetchLevelTestResults(
      levelTest?.id as number,
      currentUser?.email as string,
    );
  }, [currentUser, levelTest]);

  useSubscription(fetchLevelTestResultsEvent, (state) => {
    if (state) setResults(state.count);
    setLoading(false);
  });

  useSubscription(levelTestRepeatEvent, () => {
    setLoadingRepeat(false);
  });

  useSubscription(levelTestResendResultEmailEvent, (state) => {
    if (state) console.log('message', state.message);
    setLoadingResend(false);
  });

  useSubscription(levelTestResendResultEmailErrorEvent, () => {
    setLoadingRepeat(false);
  });

  const onResendEmail = (): void => {
    if (levelTest && currentUser) {
      setLoadingResend(true);
      levelTestResendResultEmail(
        levelTest?.id as number,
        currentUser?.id as number,
      );
    }
  };

  if (loading) {
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
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Box
                height={300}
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Typography align="center" variant="h4">
                  {`Tu resultado es ${results}/${questions.length} te encuentras en el nivel: ${level}`}
                </Typography>
              </Box>
            </Grid>
            <Grid xs={12} item>
              <Box display="flex" justifyContent="space-between">
                <ButtonDefault
                  variant="contained"
                  color="primary"
                  startIcon={<PictureAsPdfIcon />}
                  onClick={() => {
                    window.location.href = `http://localhost:8000/pdf?user_id=${currentUser?.id}&level_test_id=${levelTest?.id}`;
                  }}
                  className={classes.buttons}>
                  DESCARGAR
                </ButtonDefault>
                <ButtonDefault
                  variant="outlined"
                  color="primary"
                  isLoading={loadingResend}
                  onClick={onResendEmail}
                  startIcon={<MailOutlineOutlinedIcon />}
                  className={classes.buttons}>
                  ENVIAR RESULTADOS
                </ButtonDefault>
                <ButtonDefault
                  variant="contained"
                  color="primary"
                  startIcon={!loadingRepeat ? <ReplayIcon /> : <Loading />}
                  onClick={() => {
                    setLoadingRepeat(true);
                    onRepeat();
                  }}
                  className={classes.buttons}>
                  REPETIR EXAMEN
                </ButtonDefault>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
