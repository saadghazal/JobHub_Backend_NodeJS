const express = require('express')
const app = express()
const dotenv = require("dotenv")
const morgan = require("morgan")
const mongoose = require("mongoose")
const authRoute = require("./routes/auth")
const userRoute = require('./routes/user')
const jobRoute  = require ("./routes/job")
const bookmarkRoute = require("./routes/bookmark")
dotenv.config();
// process.env.VARIABLE_NAME

mongoose.connect(process.env.MONGO_DB_URL).then(result => {
    console.log("CONNECTED")
}).catch(err =>{
    console.log("NOT CONNECTED")
}) 
app.use(morgan("dev"))
app.use(express.json())
app.use("/api",authRoute)

// localhost:5001/api/register

app.use('/api/users',userRoute)

// localhost:5001/api/users/id

app.use("/api/jobs",jobRoute)

app.use("/api/bookmarks",bookmarkRoute)



app.listen(process.env.PORT || 5002, () => console.log(`Example app listening on port ${process.env.PORT}!`))