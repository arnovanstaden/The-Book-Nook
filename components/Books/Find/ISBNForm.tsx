import { useContext, useRef } from "react";
import axios from "axios";
import { useSnackbar } from 'notistack';

// Context
import { LoaderContext } from "../../../context/loader";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";

// Styles
import styles from "./search.module.scss";

const ISBNForm = ({ setBook }) => {
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

        // NO BOOK?
    }

    return (
        <div className={styles.form}>
            <TextField
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
    )
}

export default ISBNForm