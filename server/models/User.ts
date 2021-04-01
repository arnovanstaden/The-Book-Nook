import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId(),
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    bio: {
        type: String,
        require: true
    },
    bookmarked: {
        type: String,
        require: true
    },
    books: [String],
    clubs: [String]
},
    { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
