import { useEffect } from "react";

// Components
import AppWrap from "../components/AppWrap/AppWrap"

// Fonts, styles, icons, themes
import "typeface-raleway";
import "typeface-rubik";
import '../styles/global.scss';
import "../assets/icons/style.css";

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
    <AppWrap>
      <Component {...pageProps} />
    </AppWrap>
  )
}

export default MyApp
