import axios from "axios";
import { getCookie } from "./user"

// Axios Config
axios.defaults.headers.common['Authorization'] = `BEARER ${getCookie("TBN-Token")}`;

// Save Book
export const saveBook = async (book) => {
    const saveResult = await axios({
        method: "POST",
        url: "/api/books",
        data: book,
    })
        .then(result => {
            return result.data
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        });

    return saveResult
}

