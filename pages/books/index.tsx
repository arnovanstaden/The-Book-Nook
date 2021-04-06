import axios from "axios"

// Components
import Page from "../../components/Page/Page";
import Header from "../../components/UI/Header/Header";

// Styles
import styles from "../../styles/pages/books/index.module.scss";

export default function index({ books }) {
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

export async function getServerSideProps(context) {
    const books = await axios({
        method: "GET",
        url: "/api/books",
        data: {
            // user
        }
    })

    return {
        props: { books },
    }
}