import React, { useEffect, useState } from 'react';
import {
  Box,
  Grid,
  LinearProgress,
  Paper,
  Typography,
  useTheme,
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import { useUserProviderHook } from '../../shared/components/user-provider/useUserProviderHook';
import {
  CHECKBOX_INPUT_QUESTION,
  CHECKBOX_MULTIPLES_INPUT_QUESTION,
  CHECKBOX_QUESTION,
  EACH_FINISH_STEP,
} from '../../shared/contants';
import { QuestionCheckboxView } from './components/QuestionCheckboxView';
import { AnswerType } from '../../shared/types';
import { ButtonDefault } from '../../shared/components/buttons/buttons';
import { QuestionCheckboxInputView } from './components/QuestionCheckboxInputView';
import { QuestionCheckboxMultiplesInputView } from './components/QuestionCheckboxMultiplesInputView';
import { useQuestionProviderHook } from '../../shared/components/question-provider/useQuestionProviderHook';
import { Loader } from '../../shared/components/Loader';
import { progressMessage } from './questions-utils';
import { FinishTestView } from './components/FinishTestView';

/**
 * @type {AnswerType} Answer type.
 */

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
  paperLoading: {
    height: 300,
  },
});

export const QuestionsView: React.FC = () => {
  const { questions } = useUserProviderHook();
  const {
    onSelectedAnswer,
    activeQuestion,
    onBackPage,
    onNextPage,
    selectedAnswer,
    loadingNext,
    loadingBack,
    loading,
    onFinishLevelTest,
  } = useQuestionProviderHook();
  const classes = useStyles();
  const theme = useTheme();
  const value = questions.length
    ? Math.round((activeQuestion * 100) / questions.length)
    : 0;
  const message = !questions.length ? '' : progressMessage(activeQuestion);
  const question =
    questions.length && questions[activeQuestion]
      ? questions[activeQuestion]
      : null;
  const [showFinishTest, setShowFinishTest] = useState<boolean>(false);

  useEffect(() => {
    if (questions && questions.length && activeQuestion > 0) {
      const result = (activeQuestion + 1) % parseInt(EACH_FINISH_STEP);
      setShowFinishTest(!!result);
    }
  }, [activeQuestion, questions]);

  if (loading && questions.length !== activeQuestion) {
    return (
      <Box m={2}>
        <Paper
          elevation={1}
          classes={{
            root: classes.paper,
          }}>
          <Box
            height={300}
            display="flex"
            justifyContent="center"
            alignItems="center">
            <Loader />
          </Box>
        </Paper>
      </Box>
    );
  }

  if (showFinishTest && !selectedAnswer) {
    return (
      <FinishTestView
        onFinish={onFinishLevelTest}
        onBackPage={onBackPage}
        step={activeQuestion}
        onContinue={() => setShowFinishTest(false)}
        count={questions.length}
      />
    );
  }

  const QuestionRender: React.FC = () => {
    switch (question?.type) {
    case CHECKBOX_QUESTION:
      return (
        <QuestionCheckboxView
          question={question}
          numberQuestion={activeQuestion + 1}
          selectedAnswer={selectedAnswer}
          onSelectedAnswer={onSelectedAnswer}
        />
      );
    case CHECKBOX_INPUT_QUESTION:
      return (
        <QuestionCheckboxInputView
          question={question}
          numberQuestion={activeQuestion + 1}
          selectedAnswer={selectedAnswer}
          onSelectedAnswer={onSelectedAnswer}
        />
      );
    case CHECKBOX_MULTIPLES_INPUT_QUESTION:
      return (
        <QuestionCheckboxMultiplesInputView
          question={question}
          numberQuestion={activeQuestion + 1}
          selectedAnswer={selectedAnswer}
          onSelectedAnswer={onSelectedAnswer}
        />
      );
    default:
      return null;
    }
  };

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
              <Box textAlign="end">
                <Typography
                  variant="subtitle1"
                  className={classes.progressMessage}>
                  {message}
                </Typography>
              </Box>
              <Box display="flex" alignItems="center">
                <Box width="100%" mr={1}>
                  <LinearProgress
                    variant="determinate"
                    color="primary"
                    value={value}
                  />
                </Box>
                <Box minWidth={35}>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    className={classes.percent}>{`${Math.round(
                      value,
                    )}%`}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12}>
              <QuestionRender />
            </Grid>
            <Grid item xs={12}>
              <Box display="flex" justifyContent="space-between">
                <ButtonDefault
                  color="primary"
                  size="large"
                  onClick={() => onBackPage()}
                  variant="contained"
                  disabled={activeQuestion === 0}
                  isLoading={loadingBack}>
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowRight />
                  ) : (
                    <KeyboardArrowLeft />
                  )}
                  Atras
                </ButtonDefault>
                <ButtonDefault
                  color="primary"
                  size="large"
                  variant="contained"
                  onClick={() => onNextPage()}
                  isLoading={loadingNext}
                  disabled={
                    activeQuestion === questions.length || !selectedAnswer
                  }>
                  Siguiente
                  {theme.direction === 'rtl' ? (
                    <KeyboardArrowLeft />
                  ) : (
                    <KeyboardArrowRight />
                  )}
                </ButtonDefault>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};
