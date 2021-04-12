import { useState } from "react";

// Components
import Page from "../../components/Page/Page";
import withAuth from "../../components/HOC/withAuth";
import ISBNForm from "../../components/Books/Find/ISBNForm";
import SearchForm from "../../components/Books/Find/SearchForm";
import SaveBookForm from "../../components/Books/Save/SaveForm";

// MUI
import { Button, TextField } from "@material-ui/core"

// Styles
import styles from "../../styles/pages/books/add.module.scss";

const AddBook = () => {
    const [book, setBook] = useState(undefined);
    const [option, setOption] = useState(undefined)

    // SubComponents

    const Options = () => {
        return (
            <div className={styles.options}>
                <h1>Add a new book</h1>
                <h4>How would you like to add the book data?</h4>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOption("Search")}
                >
                    Seach Author &amp; Title
                </Button>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={() => setOption("ISBN")}
                >
                    Enter ISBN Number
                    </Button>
            </div>
        )
    }

    const RenderConditions = () => {
        if (book) {
            return <SaveBookForm book={book} />
        }
        else if (!option) {
            return <Options />
        }
        else if (!book && option === "ISBN") {
            return <ISBNForm setBook={setBook} />
        }
        else if (!book && option === "Search") {
            return <SearchForm setBook={setBook} />
        }
        return null
    }

    return (
        <Page
            title="Add a New Book"
        >
            <RenderConditions />
        </Page>
    )
}

export default withAuth(AddBook)
