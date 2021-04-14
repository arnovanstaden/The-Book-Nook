import Link from "next/link"

// Interfaces
import { IBook } from "../../../../utils/interfaces"

// Styles
import styles from "./card.module.scss";

export default function Book(book: IBook) {
    return (
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
    )
}
