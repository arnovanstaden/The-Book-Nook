// Context
import { UserProvider } from "../../context/UserContext"
import { LoaderProvider } from "../../context/LoaderContext"

// Components
import Nav from "../UI/Nav/Nav";
import NotificationsProvider from "../UI/Notification/Notification";

// MUI
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import CssBaseline from "@material-ui/core/CssBaseline"

// Theme
import { theme } from "../../styles/Theme/theme"

const AppWrap = ({ children }) => {
    return (
        <NotificationsProvider>
            <UserProvider>
                <LoaderProvider>
                    <StylesProvider injectFirst>
                        <ThemeProvider theme={theme} >
                            <CssBaseline />
                            <Nav />
                            {children}
                        </ThemeProvider>
                    </StylesProvider>
                </LoaderProvider>
            </UserProvider>
        </NotificationsProvider>
    )
}

export default AppWrap
