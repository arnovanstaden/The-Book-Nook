import { useEffect, useContext } from "react";
import { checkAuth } from "../utils/user";
import { useRouter } from 'next/router'

// Context
import { UserProvider } from "../context/user"

// Components
import Layout from "../components/Layout/Layout";
import NotificationsProvider from "../components/UI/Notification/Notification";

// MUI
import { ThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { Grow, CssBaseline } from "@material-ui/core/"

// Fonts, styles, icons, themes
import "typeface-raleway";
import "typeface-rubik";
import '../styles/global.scss';
import "../assets/icons/style.css";
import { theme } from "../styles/Theme/theme"

// Theme

function MyApp({ Component, pageProps }) {
  // Config
  const router = useRouter()

  // Hooks
  useEffect(() => {
    if (!checkAuth()) {
      if (router.pathname !== "/account/signup") {
        router.replace("/account/signin");
      }
    }
  }, [])

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
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </ThemeProvider>
        </StylesProvider>
      </UserProvider>
    </NotificationsProvider>

  )
}

export default MyApp
