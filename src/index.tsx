import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { CssBaseline } from '@material-ui/core';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Application } from './Application';
import { theme } from './shared/configs/theme';
import { UserProvider } from './shared/components/user-provider/UserProvider';
import { QuestionProvider } from './shared/components/question-provider/QuestionProvider';

ReactDOM.render(
  <React.StrictMode>
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <UserProvider>
        <QuestionProvider>
          <Application />
        </QuestionProvider>
      </UserProvider>
    </MuiThemeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
