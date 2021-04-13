import mongoose from 'mongoose';

const clubSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    members: [String],
    books: [String]
},
    { timestamps: true }
);

module.exports = ;
module.exports = mongoose.models.Club || mongoose.model('Club', clubSchema);

