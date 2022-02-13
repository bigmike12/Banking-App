const mongoose = require('mongoose');
const TransactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    sendTo: {
        type: String,
        ref: 'users'
    },
    amount: {
        type: Number,
        required: true,
    },
    senderCurrency: {
        type: String,
        required: true
    },
    recipientCurrency: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'success'
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Transaction = mongoose.model('transaction',TransactionSchema);

module.exports = Transaction;









