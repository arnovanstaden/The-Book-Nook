import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    bio: String,
    bookmarks: {
        type: String,
        required: true
    },
    books: [String],
    clubs: [String]
},
    { timestamps: true }
);

userSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.models.User || mongoose.model("User", userSchema);
