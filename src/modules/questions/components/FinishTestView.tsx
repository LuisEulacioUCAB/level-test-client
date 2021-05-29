import React from 'react';
import { Box, Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonDefault } from '../../../shared/components/buttons/buttons';
import { finishTestMessage } from '../questions-utils';

const useStyles = makeStyles({
  paper: {
    minHeight: 460,
  },
  progressMessage: {
    fontStyle: 'italic',
  },
  percent: {
    fontWeight: 900,
  },
});

type FinishTestViewProps = {
  step: number;
  onFinish: () => void;
  onContinue: () => void;
  onBackPage: () => void;
  count: number;
};

export const FinishTestView: React.FC<FinishTestViewProps> = ({
  step,
  onFinish,
  onContinue,
  onBackPage,
  count,
}) => {
  const classes = useStyles();
  const message = finishTestMessage(step);

  return (
    <Box m={2}>
      <Paper
        elevation={1}
        classes={{
          root: classes.paper,
        }}>
        <Box p={4}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Box
                height={350}
                display="flex"
                justifyContent="center"
                alignItems="center">
                <Typography variant="h4">{message}</Typography>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <ButtonDefault
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={onFinish}>
                  Finalizar
                </ButtonDefault>
                {count !== step ? (
                  <ButtonDefault
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={onContinue}>
                    Continuar
                  </ButtonDefault>
                ) : (
                  <ButtonDefault
                    color="primary"
                    size="large"
                    variant="contained"
                    onClick={onBackPage}>
                    Volver
                  </ButtonDefault>
                )}
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
