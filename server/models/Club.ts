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

clubSchema.set('toJSON', {
    virtuals: true
});

export default mongoose.models.Club || mongoose.model('Club', clubSchema);

