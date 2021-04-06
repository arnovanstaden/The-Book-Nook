import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        require: true
    },
    authors: {
        type: String,
        require: true
    },
    genre: {
        type: String,
        require: true
    },
    pages: {
        type: Number,
        require: true
    },
    rating: {
        type: Number,
        require: true
    },
    year: {
        type: String,
        require: true
    },
    cover: {
        type: String,
        require: true
    },
    user: {
        type: String,
        require: true
    },
    recommendation: {
        type: String,
        require: true
    }
},
    { timestamps: true }
);

module.exports = mongoose.models.Book || mongoose.model("Book", bookSchema);
