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
    usdBalance: {
        type: Number,
        min: 0,
        default: 1000
    },
    eurBalance: {
        type: Number,
        min: 0,
        default: 0
    },
    gbpBalance: {
        type: Number,
        min: 0,
        default: 0
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const User = mongoose.model('users',UserSchema);

module.exports = User;









