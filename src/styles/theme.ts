import { createTheme } from '@mui/material';

// palette 추가시
declare module '@mui/material/styles' {
  interface Palette {
    color1: Palette['primary'];
  }
  interface PaletteOptions {
    color1?: PaletteOptions['primary'];
  }
}

export const theme = createTheme({
  typography: {
    fontFamily: [
      'Noto Sans KR',
      'sans-serif',
      '-apple-system',
      'BlinkMacSystemFont',
      'Segoe UI',
      'Roboto',
      'Oxygen',
      'Ubuntu',
      'Cantarell',
      'Fira Sans',
      'Droid Sans',
      'Helvetica Neue',
    ].join(','),
  },
  palette: {
    primary: {
      light: '#E8FCFF', // 1
      main: '#20BBFF', // 3 navBar color
      dark: '#3563E9', // 5
    },
    secondary: {
      light: '#EFF3FD', // background color
      main: '#D2FCFC', // 2
      dark: '#17A8FF', //4
    },
  },
});
