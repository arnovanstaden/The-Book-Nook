import { createMuiTheme } from '@material-ui/core/styles';

export const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#06070d",
        },
        secondary: {
            main: "#7f7f83",
        },
    },
    typography: {
        fontFamily: [
            'Raleway',
            'Roboto',
            "sans-serif"
        ].join(',')
    }
});

