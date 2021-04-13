import BookModel from "../models/Book";
import { verifyJWT } from "./user";
import { createDBConnection } from "../middleware/database"


export async function getBooksForUser(value: string, type: 'token' | "id") {
    await createDBConnection();
    let id;
    if (type === "token") {
        let user = verifyJWT(value);
        id = user.id
    } else {
        id = value
    };
    const books = await BookModel.find({
        user: id
    })
        .then(books => {
            return books
        })
        .catch(err => {
            console.log(err);
        })
    return books
}