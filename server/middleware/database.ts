import mongoose from 'mongoose';

const connectDB = () => async (req, res, next) => {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return next();
    }
    // Use new db connection
    await createDBConnection()
    return next();
};

export async function createDBConnection() {
    if (mongoose.connections[0].readyState) {
        // Use current db connection
        return
    }

    await mongoose.connect(process.env.MONGODB_URI, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true
    })
        .then(() => {
            console.log("Database Connected");
        })
        .catch(err => console.log(err))
}

export default connectDB;