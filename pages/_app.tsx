import { useState, useEffect } from "react";
import { checkLoggedIn } from "../utils/user"

// Components
import Layout from "../components/Layout/Layout";
import Login from "../components/UI/Login/Login"

// Fonts
import "typeface-raleway";
import "typeface-rubik";

// Styles
import '../styles/global.scss';

// Icons
import "../assets/icons/style.css"

function MyApp({ Component, pageProps }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  // Hooks
  useEffect(() => {
    if (checkLoggedIn()) {
      setIsLoggedIn(true)
    }
  }, [])

  // Handlers
  const handleLoginSuccess = (register: boolean) => {
    setIsLoggedIn(true)
  }

  return (
    <Layout>
      {isLoggedIn ? null : <Login handleLoginSuccess={handleLoginSuccess} />}
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
