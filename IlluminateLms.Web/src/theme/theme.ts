import { createMuiTheme } from 'material-ui';
import { blue, pink } from 'material-ui/colors'
import { darken } from 'material-ui/styles/colorManipulator';

const theme = createMuiTheme({
  palette: {
    primary: blue,
    secondary: {
      // Darken so we reach the AA contrast ratio level.
      main: darken(pink.A400, 0.08),
    }
  },
});

export default theme;