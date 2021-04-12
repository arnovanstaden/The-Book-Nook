import axios from "axios";
import Link from "next/link"

// Components
import Page from "../../components/Page/Page";
import Header from "../../components/UI/Header/Header";
import withAuth from "../../components/HOC/withAuth";

// MUI
import { Fab } from "@material-ui/core"
import { Add } from "@material-ui/icons"


// Styles
import styles from "../../styles/pages/books/index.module.scss";

const Books = ({ books }) => {
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
            <Fab color="primary" aria-label="add" className={styles.addButton}>
                <Link href="/books/add">
                    <Add />
                </Link>
            </Fab>
        </Page>
    )
}

// export async function getServerSideProps(context) {
//     const books = await axios({
//         method: "GET",
//         url: "/api/books",
//         data: {
//             // user
//         }
//     })

//     return {
//         props: { books },
//     }
// }

export default withAuth(Books)