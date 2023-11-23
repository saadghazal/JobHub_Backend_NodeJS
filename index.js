const express = require('express')
const app = express()
const dotenv = require("dotenv")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
dotenv.config();
// process.env.VARIABLE_NAME

mongoose.connect(process.env.MONGO_DB_URL).then(result => {
    console.log("CONNECTED")
}).catch(err =>{
    console.log("NOT CONNECTED")
})

app.use(express.json())
app.use("/api",authRoute)
// localhost:5001/api/register


app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`))