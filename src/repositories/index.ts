const mongoose = require('mongoose');

export const messageModel = require('./messages');

export const connectToDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_CONNECTION_STRING, {useNewUrlParser: true, useUnifiedTopology: true})
        return 'Connection Established'
    } catch (error) {
        return error;
    }
}

