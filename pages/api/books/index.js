import nextConnect from 'next-connect';
import connectDB from '../../../server/middleware/database';
import jwtAuth from '../../../server/middleware/auth';
import BookModel from "../../../server/models/Book";
import UserModel from "../../../server/models/User";


const handler = nextConnect();

handler.use(connectDB());
handler.use("/", jwtAuth);

// Get Books for User
handler.get(async (req, res) => {
  res.status(200).send(user);
})

// Create New Book
handler.post(async (req, res) => {
  let responseData = {}

  // Get User
  const user = await getUserByEmail(req.profile.email);
  if (!user) {
    responseData = {
      status: 404,
      message: "No User Found"
    }
    return res.status()
  }

  // Save Book
  let book = new BookModel({ ...req.body });
  book.user = user._id
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
    res.status(200).json(responseData);
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



// Utils

async function getUserByEmail(email) {
  let user = await UserModel.findOne({
    email: email
  });
  return user
}