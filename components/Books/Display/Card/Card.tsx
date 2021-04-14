import Link from "next/link"

// Interfaces
import { IBook } from "../../../../utils/interfaces";

// MUI
import Grid from '@material-ui/core/Grid';

// Styles
import styles from "./card.module.scss";

export default function Book(book: IBook) {
    return (
        <Grid item xs={6} sm={4} md={3} lg={2}>
            <Link href={`/books/view/${book.id}`}>
                <div className={styles.book}>
                    <div className={styles.image}>
                        <img src={book.cover} alt={`${book.title} Cover`} />
                    </div>
                    <div className={styles.text}>
                        <p>{book.title}</p>
                        <small>{book.authors}</small>
                    </div>
                </div>
            </Link>
        </Grid>
    )
}
