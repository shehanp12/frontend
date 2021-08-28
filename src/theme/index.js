import { createTheme, colors } from '@material-ui/core';
import shadows from './shadows';
import typography from './typography';

const theme = createTheme({
  palette: {
    background: {
      default: '',
      paper: colors.common.white
    },
    primary: {
      contrastText: '#ffffff',
      main: '#135703'
    },
    text: {
      primary: '#172b4d',
      secondary: '#6b778c'
    }
  },
  shadows,
  typography
});

export default theme;
