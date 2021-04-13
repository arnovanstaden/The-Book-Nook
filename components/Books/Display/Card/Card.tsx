// Interfaces
import { IBook } from "../../../../utils/interfaces"

// Styles
import styles from "./book.module.scss";

export default function Book(book: IBook) {
    return (
        <div className={styles.book}>
            <div className={styles.image}>
                <img src="/images/test/cover.jpg" alt="" />
            </div>
            <div className={styles.text}>
                <p>{book.name}</p>
                <small>{book.author}</small>
            </div>
        </div>
    )
}
