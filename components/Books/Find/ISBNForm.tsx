import { useContext, useRef } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';

// Context
import { LoaderContext } from "../../../context/loader";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab"
import FindReplace from "@material-ui/icons/FindReplace"
import Tooltip from '@material-ui/core/Tooltip';

// Styles
import styles from "./search.module.scss";

const ISBNForm = ({ setBook, setOption }) => {
    // Config
    const isbnRef = useRef<HTMLInputElement>()
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);

    // Helpers
    const getBookData = (e) => {
        e.preventDefault();
        let isbnNumber = isbnRef.current.value;

        // Validate
        if (isbnNumber.length !== 13 && isbnNumber.length !== 10) {
            enqueueSnackbar("The ISBN number needs to be 10 or 13 numbers long.", {
                variant: 'info',
            });
            return
        }

        // Get Data
        showLoader()

        axios({
            method: "get",
            url: `https://www.googleapis.com/books/v1/volumes?q=isbn:${isbnNumber}`
        })
            .then(result => {
                if (result.data.totalItems < 1) {
                    enqueueSnackbar("There are no results for your search. Please ensure you've entered the ISBN number correctly.", {
                        variant: 'error',
                    });
                    return
                }
                let bookResult = result.data.items[0].volumeInfo;

                // Refactor & Remove ISBN Numbers
                if (bookResult.industryIdentifiers) {
                    bookResult.industryIdentifiers.forEach(item => {
                        if (item.type === "ISBN_13") {
                            bookResult.isbnNumber = item.identifier
                        }
                    })
                }

                // Reset Results for normal search
                bookResult.isbnSearch = true;

                // Add Covers from Open Library 
                bookResult.cover = {
                    small: `http://covers.openlibrary.org/b/isbn/${bookResult.isbnNumber}-M.jpg`,
                    large: `http://covers.openlibrary.org/b/isbn/${bookResult.isbnNumber}-L.jpg`,
                }

                bookResult.thumbnail = bookResult.imageLinks.thumbnail
                console.log(bookResult)

                enqueueSnackbar("Book Data Found", {
                    variant: 'success',
                });
                setBook(bookResult)
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

    return (
        <>
            <div className={styles.form}>
                <div className="heading center">
                    <h1 className="title">Search by ISBN</h1>
                    <h6 className="subtitle">Please enter the ISBN number below:</h6>
                </div>
                <TextField
                    className={styles.input}
                    variant="outlined"
                    margin="normal"
                    required
                    label="ISBN Number"
                    name="isbn-number"
                    autoFocus
                    type="number"
                    helperText="This is the 10 or 13 digit number found near the barcode. Ignore the dashes."
                    inputRef={isbnRef}
                />
                <Button
                    variant="contained"
                    color="primary"
                    onClick={getBookData}
                >
                    Find Book
                </Button>
            </div>
            <Tooltip title="Reset Search Method" aria-label="Reset Search Method">
                <Fab
                    color="primary"
                    aria-label="search"
                    className="fab"
                    onClick={() => setOption(undefined)}
                >
                    <FindReplace />
                </Fab>
            </Tooltip>
        </>
    )
}

export default ISBNForm