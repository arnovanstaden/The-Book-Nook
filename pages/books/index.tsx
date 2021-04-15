import axios from "axios";
import Link from "next/link";
import Cookies from "cookie";
import { getBooksForUser } from "../../server/utils/books";
import { getUserBooks, getBook } from "../../utils/books"
import { v4 as uuid } from 'uuid';


// Components
import Page from "../../components/Page/Page";
import withAuth from "../../components/HOC/withAuth";
import BookCard from "../../components/Books/Display/Card/Card";
import Heading from "../../components/UI/Headings/Heading/Heading"

// MUI
import Grid from '@material-ui/core/Grid';

// MUI
import Fab from "@material-ui/core/Fab"
import Add from "@material-ui/icons/Add"
import Tooltip from '@material-ui/core/Tooltip';


// Styles
import styles from "../../styles/pages/books/index.module.scss";

const Books = ({ books }) => {

    return (
        <Page
            title="Books"
        >
            <Heading
                title="Your Books"
                center
            />

            <Grid container spacing={3} justify="center">
                {books.map(book => (
                    <BookCard book={book} key={uuid()} />
                ))}
            </Grid>

            <Tooltip title="Add New Book" aria-label="Add New Book">
                <Fab
                    color="primary"
                    aria-label="add"
                    className="fab"
                >
                    <Link href="/books/add">
                        <Add />
                    </Link>
                </Fab>
            </Tooltip>
        </Page>
    )
}

export default withAuth(Books);


// Props
export async function getServerSideProps(context) {
    const books = await getUserBooks();
    return {
        props: { books },
    }
}