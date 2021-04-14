// MUI
import Layers from "@material-ui/icons/Layers"
import Star from "@material-ui/icons/Star"
import CalendarToday from "@material-ui/icons/CalendarToday"

// styles
import styles from "./row.module.scss";


const BookRow = ({ searchResult, book, setBook }) => {

    // Change Book Data
    let authors;
    if (book.authors) {
        authors = book.authors.length > 1 ? book.authors.join(" ") : book.authors;
    } else {
        return null
    }

    // SubComponents
    const SearchResult = () => {
        return (
            <div className={styles.book} onClick={() => setBook(book)}>
                <div className={styles.image}>
                    <img src={book.thumbnail} alt={`${book.title} Cover`} />
                </div>
                <div className={styles.details}>
                    <h4 className={styles.title}>{book.title}</h4>
                    <p className={styles.author}>by {authors}</p>

                </div>
            </div>
        )
    }

    const UserBook = () => {
        // <div className={styles.stats}>
        //                 <div>
        //                     <Layers />
        //                     <p>{book.pageCount}</p>
        //                 </div>
        //                 <div>
        //                     <CalendarToday />
        //                     <p>{publishedDate}</p>
        //                 </div>
        //             </div>
        return null
    }

    return (
        <>
            { searchResult ? <SearchResult /> : <UserBook />}
        </>
    )
}

export default BookRow
