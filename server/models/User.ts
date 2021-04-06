import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
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
    bio: String,
    bookmarks: {
        type: String,
        require: true
    },
    books: [String],
    clubs: [String]
},
    { timestamps: true }
);

module.exports = mongoose.models.User || mongoose.model("User", userSchema);
