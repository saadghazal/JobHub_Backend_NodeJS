const express = require('express')
const app = express()
const dotenv = require("dotenv");

dotenv.config();
// process.env.VARIABLE_NAME

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`))