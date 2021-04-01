import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId(),
    name: {
        type: String,
        require: true
    },
    author: {
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
    }
},
    { timestamps: true }
);

module.exports = mongoose.model('Book', bookSchema);
