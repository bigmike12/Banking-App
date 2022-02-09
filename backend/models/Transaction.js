const mongoose = require('mongoose');
const TransactionSchema = mongoose.Schema({
    from: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true,
    },
    currency: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
})

const Transaction = mongoose.model('transaction',TransactionSchema);

module.exports = Transaction;









