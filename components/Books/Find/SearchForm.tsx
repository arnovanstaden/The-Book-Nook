import { useContext, useRef, useState } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';
import { v4 as uuid } from 'uuid';

// Context
import { LoaderContext } from "../../../context/loader";

// Components
import BookRow from "../Display/Row/Row"

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import Image from "@material-ui/icons/Image"
import FindReplace from "@material-ui/icons/FindReplace"

// Styles
import styles from "./search.module.scss";

const SearchForm = ({ setBook }) => {
    // State
    const [results, setResults] = useState(null)

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
        if (title === "" || author === "") {
            enqueueSnackbar("Please ensure you've filled in all the relevant fields", {
                variant: 'info',
            });
            return
        }

        // Get Data
        showLoader()
        axios({
            method: "get",
            url: `https://www.googleapis.com/books/v1/volumes?q=inauthor:${author}&intitle:${title}&maxResults=40`
        })
            .then(result => {
                if (result.data.totalItems < 1) {
                    enqueueSnackbar("There are no results for your search. Please ensure you've entered the ISBN number correctly.", {
                        variant: 'error',
                    });
                    return
                }
                const filteredResults = result.data.items.filter(book => book.volumeInfo.imageLinks);
                console.log(filteredResults)
                enqueueSnackbar(`${filteredResults.length} results found`, {
                    variant: 'success',
                });

                setResults(filteredResults)
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
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                >
                    Search Books
                </Button>
            </div>
        )
    }
    const SearchResults = () => {
        return (
            <>
                <h1 className="title">Results</h1>
                <h6 className="subtitle">Please choose one of the books below:</h6>
                <div className={styles.results}>
                    {results.map(book => (
                        <BookRow
                            searchResult={true}
                            book={book.volumeInfo}
                            setBook={setBook}
                            key={uuid()}
                        />
                    ))}
                </div>
            </>
        )
    }

    return (
        <>
            { results ? <SearchResults /> : <Form />}
            {results ?
                <Fab
                    color="primary"
                    aria-label="search"
                    className={styles.searchButton}
                    onClick={() => setResults(null)}
                >
                    <FindReplace />
                </Fab>
                : null}
        </>
    )
}

export default SearchForm
