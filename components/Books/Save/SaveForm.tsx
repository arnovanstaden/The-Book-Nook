import axios from "axios";
import { useState, useContext } from "react";
import { useSnackbar } from 'notistack';
import { useRouter } from "next/router";
import { saveBook } from "../../../utils/books"

// Context
import { LoaderContext } from "../../../context/loader";

// MUI
import { TextField, Button, Divider } from "@material-ui/core";
import { Rating } from '@material-ui/lab';

// Styles
import styles from "./save.module.scss"


const SaveBookForm = ({ book }) => {
    // Config
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const router = useRouter()

    // State
    const [rating, setRating] = useState(2.5)

    // Handlers
    const handleSaveBook = (e) => {

        // Validate
        let form = document.getElementById("save-book-form") as HTMLFormElement;
        if (form.checkValidity() === false) {
            return enqueueSnackbar("Please complete all the relevant fields", {
                variant: 'error',
            });
        }

        e.preventDefault();

        // Get Data
        let bookData = {
            rating: null
        }
        let formData = new FormData(form);
        for (var key of formData.keys()) {
            bookData[key] = formData.get(key)
        }
        bookData.rating = rating;
        console.log(bookData)

        // Send Data
        showLoader()
        saveBook(bookData)
            .then(saveResult => {
                router.push(`/books/view/${saveResult.book._id}`)
                enqueueSnackbar(saveResult.message, {
                    variant: 'success',
                });
                hideLoader();
            })
            .catch(err => {
                hideLoader();
                enqueueSnackbar(err.message, {
                    variant: 'error',
                });
                console.log(err)
            })

    }


    // Change Book Data
    const publishedDate = book.publishedDate ? book.publishedDate.substring(0, book.publishedDate.indexOf("-")) : undefined;
    const pageCount = book.pageCount ? book.pageCount : undefined;
    const genre = book.categories ? book.categories[0] : undefined;
    const authors = book.authors.join(" ")

    return (
        <div>
            <form name="save-book-form" id="save-book-form" onSubmit={handleSaveBook}>
                <div >
                    {book.imageLinks ? <img src={book.imageLinks.thumbnail} alt={book.title} /> : null}
                </div>
                <input type="text" name="cover" defaultValue={book.imageLinks.thumbnail} readOnly hidden />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Title"
                    name="title"
                    type="text"
                    defaultValue={book.title}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    fullWidth
                    label="Authors"
                    name="authors"
                    type="text"
                    defaultValue={authors}
                    InputProps={{
                        readOnly: true,
                    }}
                />
                {pageCount
                    ? <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Pages"
                        name="pages"
                        type="text"
                        defaultValue={pageCount}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    : null}
                {publishedDate
                    ? <TextField
                        variant="outlined"
                        margin="normal"
                        fullWidth
                        label="Publish Date"
                        name="year"
                        type="number"
                        defaultValue={publishedDate}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    : null}
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Genre"
                    name="genre"
                    type="text"
                    defaultValue={genre}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Description"
                    name="description"
                    type="text"
                    defaultValue={book.description}
                    multiline
                />

                <Divider />

                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    label="Your Recommendation"
                    name="recommendation"
                    type="text"
                    multiline
                    rows={3}
                />
                <div className={styles.rating}>
                    <h6>Your Rating: </h6>
                    <Rating
                        name="rating"
                        defaultValue={2.5}
                        value={rating}
                        precision={0.5}
                        onChange={(event, value) => {
                            setRating(value)
                        }}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSaveBook}
                    fullWidth
                >
                    Save Book
                </Button>
            </form>
        </div >
    )
}

export default SaveBookForm
