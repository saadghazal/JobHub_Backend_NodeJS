const express = require('express')
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
dotenv.config();
// process.env.VARIABLE_NAME

mongoose.connect(process.env.MONGO_DB_URL).then(result => {
    console.log("CONNECTED")
}).catch(err =>{
    console.log("NOT CONNECTED")
})

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`))