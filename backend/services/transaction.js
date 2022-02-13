/** @format */

const Transaction = require('../models/Transaction');
const User = require('../models/User');

exports.findTransactions = async (req, res, next) => {
	try {
		let transaction = await Transaction.find({ user: req.user.id });
		return res.status(200).json(transaction);
	} catch (err) {
		console.error(err.message);
		res.status(500).send('Server Error');
	}
};

const currencies = ['USD', 'EUR', 'GBP'];

exports.processTransaction = async (req, res) => {
	let { sendTo, amount, senderCurrency, recipientCurrency } = req.body;
	try {
		let user1 = await User.findById(req.user.id);
		if (!user1) {
			return res.status(400).status.json({ msg: 'Please Login' });
		}

		//Build Contact Object
		const user1Fields = {};
		switch (senderCurrency) {
			case 'USD':
				if (parseInt(user1.usdBalance) < parseInt(amount)) {
					return res.status(401).json({ msg: 'Insufficient USD Balance' });
				}
				user1Fields.usdBalance = parseInt(user1.usdBalance) - parseInt(amount);
				break;
			case 'EUR':
				if (parseInt(user1.eurBalance) < parseInt(amount)) {
					return res.status(401).json({ msg: 'Insufficient EUR Balance' });
				}
				user1Fields.eurBalance = parseInt(user1.eurBalance) - parseInt(amount);
				break;
			case 'GBP':
				if (parseInt(user1.gbpBalance) < parseInt(amount)) {
					return res.status(401).json({ msg: 'Insufficient GBP Balance' });
				}
				user1Fields.gbpBalance = parseInt(user1.gbpBalance) - parseInt(amount);
				break;
			default:
				break;
		}
		user1Fields.date = Date.now();
		await User.findByIdAndUpdate(
			req.user.id,
			{ $set: user1Fields },
			{ new: true }
		);

		let user2 = await User.findById(sendTo);
		if (!user2) {
			return res.status(400).json({ msg: 'User does not exist!' });
		}
		//Build Contact Object
		const user2Fields = {};
		switch (recipientCurrency) {
			case 'USD':
				if (senderCurrency === currencies[2]) {
					amount = amount * 1.3;
					console.log('gbp to usd', amount);
				}
				if (senderCurrency === currencies[1]) {
					amount = amount * 1.1345;
					console.log('eur to usd', amount);
				}
				user2Fields.usdBalance =
					parseFloat(user2.usdBalance) + parseFloat(amount);
				break;
			case 'EUR':
				if (senderCurrency === currencies[0]) {
					amount = amount * 0.88;
					console.log('usd to eur', amount);
				}
				if (senderCurrency === currencies[2]) {
					amount = amount * 1.1946;
					console.log('gbp to eur', amount);
				}
				user2Fields.eurBalance =
					parseFloat(user2.eurBalance) + parseFloat(amount);
				break;
			case 'GBP':
				if (senderCurrency === currencies[0]) {
					amount = amount * 0.74;
					console.log('usd to gbp', amount);
				}
				if (senderCurrency === currencies[1]) {
					amount = amount * 0.8427;
					console.log('eur to gbp', amount);
				}
				user2Fields.gbpBalance =
					parseFloat(user2.gbpBalance) + parseFloat(amount);
				break;
			default:
				break;
		}
		user2Fields.date = Date.now();
		await User.findByIdAndUpdate(sendTo, { $set: user2Fields }, { new: true });

		let transaction = await new Transaction({
			user: req.user.id,
			sendTo,
			amount,
			senderCurrency,
			recipientCurrency,
		});

		const newTransaction = await transaction.save();
		res.json({ newTransaction, msg: 'Money sent successfully' });
	} catch (error) {
		console.log(error);
	}
};
