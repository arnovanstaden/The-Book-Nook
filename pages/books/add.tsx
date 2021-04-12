import { useState, useRef } from "react";
import axios from "axios";

// Components
import Page from "../../components/Page/Page";
import withAuth from "../../components/HOC/withAuth";

// MUI
import { Button } from "@material-ui/core"

// Styles
import styles from "../../styles/pages/books/add.module.scss";

const AddBook = () => {
    const [book, setBook] = useState(undefined);
    const [option, setOption] = useState(undefined)
    const isbnRef = useRef<HTMLInputElement>()

    // Helpers
    const getBookData = (e) => {
        e.preventDefault();
        let isbnNumber = isbnRef.current.value;

        // Validate
        if (isbnNumber.length !== 13 && isbnNumber.length !== 10) {
            return alert("The ISBN number needs to be 10 or 13 numbers long.")
        }

        // Get Data
        axios({
            method: "get",
            url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber}`
        })
            .then(result => {
                if (result.data.totalItems < 1) {
                    return alert("There are no results for your search. Please ensure you've entered the ISBN number correctly.")
                }
                let bookResult = result.data.items[0].volumeInfo;
                setBook(bookResult)
            })
            .catch(err => console.log(err))

        // NO BOOK?
    }

    const saveBook = (e) => {
        // Validate
        let form = document.getElementById("book-form") as HTMLFormElement;
        if (form.checkValidity() === false) {
            return alert("Please complete all the relevant fields")
        }

        e.preventDefault();

        // Get Data
        let bookData = {}
        let formData = new FormData(form);
        for (var key of formData.keys()) {
            bookData[key] = formData.get(key)
        }

        axios({
            method: "POST",
            url: "/api/books",
            data: bookData
        })
            .then(result => {
                console.log(result)
            })
            .catch(err => console.log(err))
    }

    // SubComponetns

    const Options = () => {
        return (
            <div className={styles.options}>
                <h1>Add a new book</h1>
                <h4>How would you like to add the book data?</h4>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOption("Barcode")}
                >Scan Barcode</Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOption("ISBN")}
                >Enter ISBN</Button>
            </div>
        )
    }

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

        // Change Book Data
        const publishedDate = book.publishedDate.substring(0, book.publishedDate.indexOf("-"));
        const authors = book.authors.join(" ")

        return (
            <div className={styles.saveBookForm}>
                <form name="book-form" id="book-form" onSubmit={saveBook}>
                    <div className={styles.image}>
                        <img src={book.imageLinks.thumbnail} alt={book.title} />
                    </div>
                    <label htmlFor="title">Title</label>
                    <input type="text" name="title" defaultValue={book.title} readOnly />
                    <label htmlFor="authors">Author</label>
                    <input type="text" name="authors" defaultValue={authors} readOnly />
                    <label htmlFor="pages">Pages</label>
                    <input type="number" name="pages" defaultValue={book.pageCount} readOnly />
                    <label htmlFor="year">Year</label>
                    <input type="number" name="year" defaultValue={publishedDate} readOnly />
                    <input type="text" name="cover" defaultValue={book.imageLinks.thumbnail} readOnly hidden />

                    {/* User Edit */}
                    <div className="divider"></div>
                    <label htmlFor="genre">Genre</label>
                    {book.categories
                        ? <input type="text" name="genre" defaultValue={book.categories[0]} readOnly />
                        : <input type="text" name="genre" required />
                    }
                    <label htmlFor="description">Description</label>
                    <textarea name="description" defaultValue={book.description} required></textarea>
                    <label htmlFor="number">Rating (5)</label>
                    <input type="number" step={0.5} min={0} max={5} name="rating" required />
                    <label htmlFor="recommendation">Recommendation</label>
                    <textarea name="recommendation"></textarea>
                    <button type="submit" className="button">Save to Club</button>
                </form>
            </div>
        )
    }

    return (
        <Page
            title="Add a New Book"
        >
            {option ? null : <Options />}
            {option && option === "ISBN" ? <ISBNForm /> : null}
        </Page>
    )
}

export default withAuth(AddBook)
