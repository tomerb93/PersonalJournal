const mongoose = require('mongoose');
const config = require('config');

let mongoURI;

if (config.get('mongoURI') === undefined) {
    // production mode
    mongoURI = process.env.MONGO_URI;
} else {
    mongoURI = config.get('mongoURI');
}

const connectDatabase = async () => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: true
        });

        console.log('MongoDB connected');
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

module.exports = connectDatabase;
