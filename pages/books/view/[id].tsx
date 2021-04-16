import { GetServerSideProps } from 'next';
import { getBook } from "../../../utils/books"
import nookies from 'nookies';
import { verifyToken } from "../../../utils/firebase/admin";
import { useRouter } from "next/router";
import { IBook } from "../../../utils/interfaces"

// Components
import withAuth from "../../../components/HOC/withAuth";
import Page from "../../../components/Page/Page";

// MUI
import Grid from '@material-ui/core/Grid';
import Fab from "@material-ui/core/Fab";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import Divider from "@material-ui/core/Divider"


// Styles
import styles from "../../../styles/pages/books/[id].module.scss";

interface IViewBook {
    book: IBook
}

function ViewBook({ book }: IViewBook) {

    // Config
    const router = useRouter()
    const isMobileDevice = useMediaQuery('(max-width:600px)');

    return (
        <Page
            title={book.title}
        >
            <Grid container spacing={3} className={styles.book}>
                <Grid className={styles.intro}>
                    <Grid item xs={12} md={4}
                        className={styles.cover}
                        style={{
                            backgroundImage: `url(${book.cover.large})`,
                        }}
                    >
                        <div className={styles.overlay}>
                            {isMobileDevice
                                ? <button className={styles.backButton} onClick={() => router.back()}>
                                    <ChevronLeftIcon />
                                </button>
                                : null}
                            <div className={styles.image}>
                                <img src={book.thumbnail} alt={`${book.title} Cover`} />
                            </div>
                            <h1 className={styles.title}>{book.title}</h1>
                            <p className={styles.authors}>by {book.authors.join(", ")}</p>
                            <p className={styles.genre}>{book.genre}</p>
                            {/* Avatar */}
                            <Grid container justify="space-around" className={styles.stats}>
                                {book.pages ?
                                    <Grid item className={styles.stat}>
                                        <p>{book.pages}</p>
                                        <small>Pages</small>
                                    </Grid>
                                    : null}
                                <Grid item className={styles.stat}>
                                    <p>{book.rating}</p>
                                    <small>Rating</small>
                                </Grid>
                                {book.year ?
                                    <Grid item className={styles.stat}>
                                        <p>{book.year}</p>
                                        <small>Published</small>
                                    </Grid>
                                    : null}
                            </Grid>
                        </div>
                    </Grid>
                </Grid>

                <Grid item className={styles.info}>
                    <h3>Description</h3>
                    <p>{book.description}</p>
                    <Divider />
                    {/* FIX THIS */}
                    <h3>User's Recommendation</h3>
                    <p>{book.recommendation}</p>
                </Grid>

                <Grid item className={styles.comments}>
                    <h3>Comments</h3>
                </Grid>
            </Grid>
        </Page>
    )
}

export default withAuth(ViewBook);

// Props


export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    let id = "";
    if (typeof params.id === "string") {
        id = params.id
    }
    const book = await getBook(id);

    return {
        props: { book },
    }
}