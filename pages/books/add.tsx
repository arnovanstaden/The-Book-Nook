import { useState, useRef } from "react";
import axios from "axios";

// Components
import Page from "../../components/Page/Page";
import Header from "../../components/UI/Header/Header"

// Styles
import styles from "../../styles/pages/books/add.module.scss";

export default function AddBook() {
    const [book, setBook] = useState(undefined);
    const isbnRef = useRef<HTMLInputElement>()

    // Helpers
    const getBookData = (e) => {
        e.preventDefault();
        let isbnNumber = isbnRef.current.value;

        // Validate
        if (isbnNumber.length !== (13 || 10)) {
            return alert("The ISBN number needs to be 10 or 13 numbers long.")
        }

        // Get Data
        axios({
            method: "get",
            url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber}`
        })
            .then(result => {
                let bookResult = result.data.items[0].volumeInfo;
                setBook(bookResult)
            })
            .catch(err => console.log(err))

        // NO BOOK?
    }

    const saveBook = (e) => {
        e.preventDefault();
    }

    // SubComponetns

    const ISBNForm = () => {
        return (
            <div className={styles.ISBNForm}>
                <form name="ISBN-form" onSubmit={getBookData}>
                    <label htmlFor="isbn-number">Enter the ISBN Number
                            <a href="https://en.wikipedia.org/wiki/International_Standard_Book_Number" target="blank">
                            <i className="icon-help"></i>
                        </a>
                    </label>
                    <input type="number" name="isbn-number" ref={isbnRef} />
                    <small>This is the 10 or 13 digit number found near the barcode. Ignore the dashes.</small>
                    <button className="button" type="submit">Search</button>
                </form>
            </div>
        )
    }

    const SaveBookForm = () => {
        return (
            <div className={styles.saveBookForm}>
                <form name="book-form" onSubmit={saveBook}>
                    <textarea name="" >
                        {JSON.stringify(book)}
                    </textarea>
                </form>
            </div>
        )
    }

    return (
        <Page
            title="Add a New Book"
        >
            <Header
                heading="Add a New Book"
            />

            {book ? <SaveBookForm /> : <ISBNForm />}
        </Page>
    )
}
