
// Components
import Page from "../components/Page/Page"

// Styles
import styles from '../styles/pages/index.module.scss'

export default function Home() {
  return (
    <Page
      title="The Book Nook"
      classNameProp={styles.home}
    >
      <h1>Home Page</h1>
    </Page>
  )
}
