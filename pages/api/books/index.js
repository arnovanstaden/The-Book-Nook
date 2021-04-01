import nextConnect from 'next-connect';
import connectDB from '../../../server/middleware/database';

const handler = nextConnect();

handler.use(connectDB());

// Get Books for User
handler.get(async (req, res) => {
  res.status(200).send("Hello world");
})

// Create New Book
handler.post(async (req, res) => {
  res.status(200).send("Hello world");
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
