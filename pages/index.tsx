
// Components
import Page from "../components/Page/Page";
import withAuth from "../components/HOC/withAuth"

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
