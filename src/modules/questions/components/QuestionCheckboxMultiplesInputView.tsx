import React, { ChangeEvent } from 'react';
import {
  Grid,
  Typography,
  Radio,
  FormControl,
  FormControlLabel,
  RadioGroup,
  Box,
  Paper,
} from '@material-ui/core';
import InnerHTML from 'dangerously-set-html-content';
import { AnswerType, QuestionType } from '../../../shared/types';
import { sanitizeQuestionMultipleInputs } from '../questions-utils';

/**
 * @type {QuestionType} Question Type.
 * @type {AnswerType} Answer Type.
 * @type {ChangeEvent} Change Event Type.
 */

type QuestionCheckboxInputViewProps = {
  question: QuestionType;
  numberQuestion: number;
  selectedAnswer: AnswerType | null;
  onSelectedAnswer: (answer: AnswerType) => void;
};

export const QuestionCheckboxMultiplesInputView: React.FC<QuestionCheckboxInputViewProps> = ({
  question,
  numberQuestion,
  selectedAnswer,
  onSelectedAnswer,
}) => {
  const answers: AnswerType[] = (question.answers as unknown) as AnswerType[];
  const newQuestion: string = sanitizeQuestionMultipleInputs(
    question.question as string,
    selectedAnswer as AnswerType,
  );

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { value } = event.target;
    const answer = answers.find((a) => {
      return a?.value === parseInt(value);
    });
    if (answer) onSelectedAnswer(answer);
  };

  return (
    <Box minHeight={300}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">{`Pregunta #${numberQuestion}`}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            <InnerHTML html={newQuestion} />
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <FormControl component="fieldset">
            <RadioGroup
              aria-label="gender"
              name="gender1"
              value={selectedAnswer?.value}
              onChange={handleChange}>
              {answers.map((answer) => {
                return (
                  <FormControlLabel
                    value={answer?.value}
                    control={<Radio />}
                    label={answer?.label}
                  />
                );
              })}
            </RadioGroup>
          </FormControl>
        </Grid>
        {question.content && (
          <Grid item xs={12}>
            <Paper elevation={1}>
              <Box height={200} p={2} overflow="auto">
                <InnerHTML html={question.content} />
              </Box>
            </Paper>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};
