import nextConnect from 'next-connect';
import connectDB from '../../../server/middleware/database';
import jwtAuth from '../../../server/middleware/auth';
import BookModel from "../../../server/models/Book";
import { getBooksForUser } from "../../../server/utils/books";


const handler = nextConnect();

handler.use(connectDB());
handler.use("/", jwtAuth);

// Get Books for User
handler.get(async (req, res) => {
  let responseData = {}

  const books = await getBooksForUser(req.user.id, "id")
    .then(books => books)
    .catch(err => console.log(err))

  if (!books) {
    responseData = {
      status: 500,
      message: `Error Finding Books`,
    }
    return res.status(500).json(responseData);
  }

  return res.status(200).json(books);
})

// Create New Book
handler.post(async (req, res) => {
  let responseData = {}

  // Save Book
  let book = new BookModel({ ...req.body });
  book.user = req.user.id;
  book.save(function (err, book) {
    if (err) {
      console.error(err);
      responseData = {
        status: 406,
        message: `There is an error saving this book. Please try again.`,
      }
      return res.status(406).json(responseData);
    }
    console.log("Book Saved Successfully");
    responseData = {
      status: 201,
      message: `Book Saved Successfully`,
      book: book
    }
    return res.status(200).json(responseData);
  });
})


// Edit Book
handler.patch(async (req, res) => {
  res.status(200).send("Hello world");
})


// Delete Book
handler.delete(async (req, res) => {
  res.status(200).send("Hello world");
})


export default handler;


