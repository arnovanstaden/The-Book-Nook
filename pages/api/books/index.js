import nextConnect from 'next-connect';
import connectDB from '../../../server/middleware/database';
import Book from "../../../server/models/Book";

const handler = nextConnect();

handler.use(connectDB());

// Get Books for User
handler.get(async (req, res) => {
  res.status(200).send("Hello world");
})

// Create New Book
handler.post(async (req, res) => {
  console.log(req.body)
  let book = new Book({ ...req.body });
  console.log(book)
  book.save(function (err, doc) {
    if (err) {
      console.error(err);
      return res.status(406).send("There is an error saving this book");
    }
    console.log("Book Saved Successfully");
    res.status(200).json(doc);
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
