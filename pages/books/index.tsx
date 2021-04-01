// Components
import Page from "../../components/Page/Page";
import Header from "../../components/UI/Header/Header";

// Styles
import styles from "../../styles/pages/books/index.module.scss";

export default function index() {
    return (
        <Page
            title="Books"
        >
            <Header
                heading="Jane's Books"
                subheading="3 Books"
            />
            <div className={styles.grid}>

            </div>
        </Page>
    )
}
