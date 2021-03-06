import { createMuiTheme } from '@material-ui/core/styles';
import { PRIMARY_MAIN_COLOR } from './colors';

export const theme = createMuiTheme({
  palette: {
    primary: {
      main: PRIMARY_MAIN_COLOR,
    },
    secondary: {
      main: PRIMARY_MAIN_COLOR,
      contrastText: PRIMARY_MAIN_COLOR,
    },
  },
});
