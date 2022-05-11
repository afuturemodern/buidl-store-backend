const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Middleware
const bodyParser = require("body-parser"); // JSON Requests
const morgan = require('morgan'); // Logging

app.use(express.static("public"));
app.use(bodyParser.json());
app.use(morgan('tiny'));

// start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;