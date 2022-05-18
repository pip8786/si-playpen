import { createTheme, responsiveFontSizes } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// Create a theme instance.
let theme = createTheme({
    palette: {
        primary: {
            main: '#2ca2a3',
            dark: '#188282'
        },
        secondary: {
            main: '#19857b',
        },
        error: {
            main: red.A400,
        },
    },
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body:{
                    background: 'url(/images/background.jpeg)',
                    backgroundRepeat: 'no-repeat',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundAttachment: 'fixed'
                }
            }
        }
    }
});

theme = responsiveFontSizes(theme);

export default theme;