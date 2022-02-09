const mongoose = require('mongoose');
const TransactionSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
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









