const express = require("express");
const connectDB = require("./config/db");
// const path = require("path");

const app = express();

//Connect Database
connectDB();

//Init Middleware for accepting data from body
app.use(express.json({ extended: false }));

//Define Routes
app.use("/api/users", require("./routes/users"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/transfer", require("./routes/transaction"));
// app.use("/api/contacts", require("./routes/contacts"));


const PORT = process.env.PORT || 5020;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
