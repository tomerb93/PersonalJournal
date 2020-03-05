const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    gender: {
        type: String
    },
    date: {
        type: Date,
        default: Date.now
    },
    dailyEntryGoal: {
        type: Number,
        default: 3
    }
});

module.exports = User = mongoose.model('users', UserSchema);
