import { useContext } from "react";

// Components
import Page from "../components/Page/Page";
import withAuth from "../components/HOC/withAuth"

// Context
import { LoaderContext } from "../context/LoaderContext";

// Styles
import styles from '../styles/pages/index.module.scss'

const Home = () => {


  return (
    <Page
      title="The Book Nook"
      classNameProp={styles.home}
    >
      <h1>Home Page</h1>
    </Page>
  )
}

export default withAuth(Home)
