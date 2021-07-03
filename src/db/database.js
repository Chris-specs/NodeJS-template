import mongoose from 'mongoose';

// CONECTION TO DB
const dbConnect = async () => {
    try {
        await mongoose.connect('mongodb://localhost/general-db', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        });
        console.log('DB Connected');
    } catch (error) {
        console.log('Error');
    }
};

export default dbConnect;