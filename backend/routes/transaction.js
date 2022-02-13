/** @format */

const express = require("express");
const auth = require("../middleware/auth");
const router = express.Router();

const { findTransactions, processTransaction } = require("../services/transaction");

router.get("/", auth, findTransactions);

router.post("/", auth, processTransaction);

module.exports = router;
