import { useEffect } from "react";
// Context
import { UserProvider } from "../context/user"

// Components
import Nav from "../components/UI/Nav/Nav";
import NotificationsProvider from "../components/UI/Notification/Notification";

// MUI
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { CssBaseline } from "@material-ui/core/"

// Fonts, styles, icons, themes
import "typeface-raleway";
import "typeface-rubik";
import '../styles/global.scss';
import "../assets/icons/style.css";
import { theme } from "../styles/Theme/theme"


function MyApp({ Component, pageProps }) {

  // Fix MUI 
  useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  return (

    <NotificationsProvider>
      <UserProvider>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme} >
            <CssBaseline />
            <Nav />
            <Component {...pageProps} />
          </ThemeProvider>
        </StylesProvider>
      </UserProvider>
    </NotificationsProvider>

  )
}

export default MyApp
