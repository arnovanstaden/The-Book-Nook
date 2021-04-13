import mongoose from 'mongoose';

const bookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
        required: true
    },
    genre: {
        type: String,
        required: true
    },
    pages: {
        type: Number,
    },
    rating: {
        type: Number,
        required: true
    },
    year: {
        type: String,
    },
    cover: {
        type: String,
        required: true
    },
    user: {
        type: String,
        required: true
    },
    recommendation: {
        type: String,
        required: true
    }
},
    { timestamps: true }
);

bookSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.models.Book || mongoose.model("Book", bookSchema);
