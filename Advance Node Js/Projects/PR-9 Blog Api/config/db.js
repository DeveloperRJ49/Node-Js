const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(
            process.env.MONGO_URL
        );
        console.log('Connected to MongoDB');
        
    } catch (err) {
        console.error(err);
        return false;
    }
};

module.exports = connectDB() ;