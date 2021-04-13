import axios from "axios";
import Link from "next/link";
import Cookies from "cookie";
import { getBooksForUser } from "../../server/utils/books"

// Components
import Page from "../../components/Page/Page";
import Header from "../../components/UI/Header/Header";
import withAuth from "../../components/HOC/withAuth";

// MUI
import { Fab } from "@material-ui/core"
import { Add } from "@material-ui/icons"


// Styles
import styles from "../../styles/pages/books/index.module.scss";

const Books = ({ userBooks }) => {
    const books = JSON.parse(userBooks);
    console.log(books);

    return (
        <Page
            title="Books"
        >
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

export default withAuth(Books);


// Props
export async function getServerSideProps(context) {
    const cookies = Cookies.parse(context.req.headers.cookie);
    const token = cookies["TBN-Token"];

    const booksResult = await getBooksForUser(token, "token")
        .then(result => {
            return result
        })
        .catch(err => {
            console.log(err)
        });

    const userBooks = JSON.stringify(booksResult);

    return {
        props: { userBooks },
    }
}