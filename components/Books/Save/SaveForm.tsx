import axios from "axios";
import { useState, useContext } from "react";
import { useSnackbar } from 'notistack';
import { useRouter } from "next/router";
import { saveBook } from "../../../utils/books";

// Context
import { LoaderContext } from "../../../context/loader";

// MUI
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Rating from '@material-ui/lab/Rating';
import Grid from '@material-ui/core/Grid';
import Fab from "@material-ui/core/Fab";
import FindReplace from "@material-ui/icons/FindReplace";
import useMediaQuery from '@material-ui/core/useMediaQuery';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
// Styles
import styles from "./save.module.scss"


const SaveBookForm = ({ book, setBook }) => {
    // Config
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const router = useRouter()
    const isMobileDevice = useMediaQuery('(max-width:600px)');
    console.log(isMobileDevice)

    // State
    const [rating, setRating] = useState(2.5);

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
            rating: null,
            cover: ""
        }
        let formData = new FormData(form);
        for (var key of formData.keys()) {
            bookData[key] = formData.get(key)
        }
        bookData.rating = rating;
        bookData.cover = book.cover
        console.log(bookData)

        // Send Data
        showLoader()
        saveBook(bookData)
            .then(saveResult => {
                router.push(`/books/view/${saveResult.book.id}`)
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
    const authors = book.authors.length > 1 ? book.authors.join(" ") : book.authors;

    return (
        <form name="save-book-form" id="save-book-form" onSubmit={handleSaveBook}>
            <input type="text" name="thumbnail" defaultValue={book.thumbnail} readOnly hidden />
            <Grid container spacing={3} className={styles.save}>
                <Grid item xs={12} md={4}
                    className={styles.cover}
                    style={{
                        backgroundImage: `url(${book.cover.large})`,
                    }}
                >
                    <div className={styles.overlay}>
                        {isMobileDevice
                            ? <button className={styles.resetButton} onClick={() => setBook(undefined)}>
                                <ChevronLeftIcon />
                            </button>
                            : null}
                        <div className={styles.image}>
                            <img src={book.thumbnail} alt={`${book.title} Cover`} />
                        </div>
                        <h4>{book.title}</h4>
                        <p>by {authors}</p>
                    </div>
                </Grid>
                <Grid item xs={12} md={8}
                    className={styles.stats}>
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
                </Grid>
                <Grid item xs={12}
                    className={styles.text}>
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


                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        label="Your Recommendation"
                        name="recommendation"
                        type="text"
                        multiline
                        rows={4}
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
                </Grid>
            </Grid >
            {!book.isbnSearch && !isMobileDevice
                ?
                <Fab
                    color="primary"
                    aria-label="search"
                    className="fab"
                    onClick={() => setBook(undefined)}
                >
                    <FindReplace />
                </Fab>
                : null}
        </form>
    )
}

export default SaveBookForm
