import Link from "next/link";
import { getUserBooks } from "../../utils/books"
import { v4 as uuid } from 'uuid';
import nookies from 'nookies';
import { verifyToken } from "../../utils/firebase/admin";
import { GetServerSideProps } from 'next';


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
export const getServerSideProps: GetServerSideProps = async (context) => {
    const cookies = nookies.get(context);
    const token = cookies["TBN-Token"]
    const user = await verifyToken(token);
    const books = await getUserBooks(user.uid);

    return {
        props: { books },
    }
}