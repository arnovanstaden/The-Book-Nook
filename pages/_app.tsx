// Components
import Layout from "../components/Layout/Layout";

// Fonts
import "typeface-raleway";
import "typeface-rubik";

// Styles
import '../styles/global.scss';

// Icons
import "../assets/icons/style.css"

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
