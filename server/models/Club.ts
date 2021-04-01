import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
    id: mongoose.Types.ObjectId(),
    name: {
        type: String,
        require: true
    },
    members: [String],
    books: [String]
},
    { timestamps: true }
);

module.exports = mongoose.model('Club', clubSchema);
