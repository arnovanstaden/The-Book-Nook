import { useState } from "react";

// Components
import Page from "../../components/Page/Page";
import withAuth from "../../components/HOC/withAuth";
import ISBNForm from "../../components/Books/Find/ISBNForm";
import SearchForm from "../../components/Books/Find/SearchForm";
import SaveBookForm from "../../components/Books/Save/SaveForm";

// MUI
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"

// Styles
import styles from "../../styles/pages/books/add.module.scss";

const AddBook = () => {
    const [book, setBook] = useState(undefined);
    const [option, setOption] = useState(undefined)

    // SubComponents

    const Options = () => {
        return (
            <div className={styles.options}>
                <Typography variant="h3">Add Book</Typography>
                <Typography variant="subtitle1">How would you like to add the book data?</Typography>
                <div className={styles.buttons}>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOption("Search")}
                    >
                        Seach Author &amp; Title
                </Button>
                    <p>or</p>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOption("ISBN")}
                    >
                        Enter ISBN Number
                    </Button>
                </div>
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
