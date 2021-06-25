const express = require("express");
const app = express();
const mongoose = require('mongoose');
require('dotenv/config');
const toDoRoute = require('./routes/toDoRoute.js');
const authRoute = require('./routes/auth');


// Middlewares
app.use(express.json());
app.use('/todo', toDoRoute);
app.use("/api/user", authRoute);

app.get("/", (req, res) => {
    console.log("user hit the request");
    res.json(obj)
});


// connection to db
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Connected to DB");
})

// server listening
app.listen(5000, () => {
    console.log("server is listening at port 5000");
})