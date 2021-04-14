import Link from "next/link"

// Interfaces
import { IBook } from "../../../../utils/interfaces";

// MUI
import Grid from '@material-ui/core/Grid';

// Styles
import styles from "./card.module.scss";

interface ICard {
    book: IBook;
    setBook?
}

export default function Book({ book, setBook }: ICard) {

    // subcomponents
    const CardContent = () => {
        return (
            <div className={styles.book}>
                <div className={styles.image}>
                    <img src={book.thumbnail} alt={`${book.title} Cover`} />
                </div>
                <div className={styles.text}>
                    <p>{book.title}</p>
                    <small>{book.authors}</small>
                </div>
            </div>
        )
    }

    // If used in Save Book Search Results
    if (setBook) {
        <Grid item xs={6} sm={4} md={3} lg={2}
            onClick={() => setBook(book)}
        >
            <CardContent />
        </Grid>
    }

    return (
        <Grid item xs={6} sm={4} md={3} lg={2}
            onClick={() => setBook(book)}
        >
            <Link
                href={`books/view/${book.id}`}
            >
                <CardContent />
            </Link>
        </Grid>

    )
}
