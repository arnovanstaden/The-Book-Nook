import axios from "axios";
import { getCookie } from "./user";
import { db } from "../config/firebase";

// Firestore Refs
const booksRef = db.collection('books');


// Axios Config
axios.defaults.headers.common['Authorization'] = `BEARER ${getCookie("TBN-Token")}`;

// Save Book
export const saveBook = async (book) => {
    const saveResult = booksRef.add(book)
        .then((ref) => {
            return {
                id: ref.id,
                message: "Book Saved Successfully"
            }
        })
        .catch(err => {
            console.log(err);
            throw err.response.data;
        })
    return saveResult
}

export const getUserBooks = async (uid: string) => {
    const userBooks = booksRef.where("user", "==", uid).get()
        .then((snapshot) => {
            const data = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            return data
        })
    return userBooks
}

export const getBook = async (id: string) => {
    const book = booksRef.doc(id).get().then((doc) => {
        if (!doc.exists) {
            return console.log("Book doesn't exists")
        };
        return {
            id: doc.id,
            ...doc.data(),
        }
    });
    return book
}
