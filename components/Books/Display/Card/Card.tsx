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

    // handlers

    const handleBookSelect = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
        setBook(book);
    }

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
        return (
            <Grid item xs={6} sm={4} md={3} lg={2}
                onClick={handleBookSelect}
            >
                <CardContent />
            </Grid>
        )
    }

    return (
        <Grid item xs={6} sm={4} md={3} lg={2}        >
            <Link
                href={`books/view/${book.id}`}
            >
                <a>
                    <CardContent />
                </a>
            </Link>
        </Grid>

    )
}
