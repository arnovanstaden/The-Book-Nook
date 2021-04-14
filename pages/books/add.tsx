import { useState } from "react";

// Components
import Page from "../../components/Page/Page";
import withAuth from "../../components/HOC/withAuth";
import ISBNForm from "../../components/Books/Find/ISBNForm";
import SearchForm from "../../components/Books/Find/SearchForm";
import SaveBookForm from "../../components/Books/Save/SaveForm";

// MUI
import Button from "@material-ui/core/Button"

// Styles
import styles from "../../styles/pages/books/add.module.scss";

const AddBook = () => {
    const [book, setBook] = useState(undefined);
    const [option, setOption] = useState(undefined);
    const [searchResults, setSearchResults] = useState(null)


    // SubComponents

    const Options = () => {
        return (
            <div className={styles.options}>
                <div className="heading center">
                    <h1 className="title">Add A New Book</h1>
                    <h6 className="subtitle">How would you like to add the book data?</h6>
                </div>
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
            return <SaveBookForm book={book} setBook={setBook} />
        }
        else if (!option) {
            return <Options />
        }
        else if (!book && option === "ISBN") {

            return <ISBNForm
                setBook={setBook}
                setOption={setOption}
            />
        }
        else if (!book && option === "Search") {
            return <SearchForm
                setBook={setBook}
                setOption={setOption}
                searchResults={searchResults}
                setSearchResults={setSearchResults}
            />
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
