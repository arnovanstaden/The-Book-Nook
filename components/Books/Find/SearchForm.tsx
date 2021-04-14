import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';

// Context
import { LoaderContext } from "../../../context/loader";

// Components
import BookCard from "../Display/Card/Card"

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import FindReplace from "@material-ui/icons/FindReplace"
import Grid from '@material-ui/core/Grid';

// Styles
import styles from "./search.module.scss";

const SearchForm = ({ setBook, setOption, searchResults, setSearchResults }) => {


    // Config
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const titleRef = useRef<HTMLInputElement>()
    const authorRef = useRef<HTMLInputElement>()
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // handlers
    const handleSearch = () => {
        let title = titleRef.current.value;
        let author = authorRef.current.value;

        // Validate
        if (title === "" && author === "") {
            enqueueSnackbar("Please ensure you've filled in all the relevant fields", {
                variant: 'info',
            });
            return
        }

        // Get Data
        showLoader()
        axios({
            method: "get",
            url: `https://www.googleapis.com/books/v1/volumes?q=${title}&inauthor:${author}&maxResults=40`
        })
            .then(result => {
                if (result.data.totalItems < 1) {
                    enqueueSnackbar("There are no searchResults for your search. Please ensure you've entered the ISBN number correctly.", {
                        variant: 'error',
                    });
                    return
                }

                // Get VolumeInfo Only
                const booksArray = [];
                result.data.items.forEach(result => {
                    booksArray.push(result.volumeInfo)
                })

                // Refactor & Remove ISBN Numbers
                booksArray.forEach(book => {
                    // Iterate over identifiers
                    if (book.industryIdentifiers) {
                        book.industryIdentifiers.forEach(item => {
                            if (item.type === "ISBN_13") {
                                book.isbnNumber = item.identifier
                            }
                        })
                    }
                });

                let filteredBooks = booksArray.filter(book => book.isbnNumber);



                // Refactor & Remove Thumbnails
                filteredBooks = filteredBooks.filter(book => book.imageLinks);
                filteredBooks.forEach(book => {
                    book.thumbnail = book.imageLinks.thumbnail
                })

                // Add Cover Images from Open Library
                filteredBooks.forEach(book => {
                    book.cover = {
                        small: `http://covers.openlibrary.org/b/isbn/${book.isbnNumber}-M.jpg`,
                        large: `http://covers.openlibrary.org/b/isbn/${book.isbnNumber}-L.jpg`,
                    }
                })

                enqueueSnackbar(`${filteredBooks.length} searchResults found`, {
                    variant: 'success',
                });

                setSearchResults(filteredBooks)
                hideLoader()
            })
            .catch(err => {
                console.log(err)
                enqueueSnackbar("There seems to be a problem fetching book data at this time.", {
                    variant: 'error',
                });
                hideLoader()
            })
    }

    // Subcomponents
    const Form = () => {
        return (
            <>
                <div className={styles.form} >
                    <h1 className="title">Search Author &amp; Title</h1>
                    <h6 className="subtitle">Please enter the relevant info below:</h6>
                    <TextField
                        className={styles.input}
                        variant="outlined"
                        margin="normal"
                        required
                        label="Title"
                        name="title"
                        autoFocus
                        type="text"
                        inputRef={titleRef}
                        size="medium"
                    />
                    <TextField
                        className={styles.input}
                        variant="outlined"
                        margin="normal"
                        required
                        label="Author"
                        name="author"
                        type="text"
                        inputRef={authorRef}
                        size="medium"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleSearch}
                    >
                        Search Books
                </Button>
                </div>
                <Fab
                    color="primary"
                    aria-label="search"
                    className="fab"
                    onClick={() => setOption(undefined)}
                >
                    <FindReplace />
                </Fab>
            </>
        )
    }
    const SearchResults = () => {
        return (
            <>
                <h1 className="title">Results</h1>
                <h6 className="subtitle">Please choose one of the books below:</h6>
                <Grid container spacing={3}>
                    {searchResults.map(book => (
                        <BookCard
                            book={book}
                            setBook={setBook}
                            key={uuid()}
                        />
                    ))}
                </Grid>
            </>
        )
    }

    return (
        <>
            { searchResults ? <SearchResults /> : <Form />}
            {searchResults ?
                <Fab
                    color="primary"
                    aria-label="search"
                    className="fab"
                    onClick={() => setSearchResults(null)}
                >
                    <FindReplace />
                </Fab>
                : null}
        </>
    )
}

export default SearchForm
