const express = require('express')
const mongoose = require('mongoose')
const route = require("./routes/route")

const app = express()

app.use(express.json())

mongoose.set('strictQuery', true)

mongoose.connect(
    "mongodb+srv://abhinav:abhi123@cluster0.qicwtqo.mongodb.net/coins"
)
.then(() => console.log("MDB is connected"))
.catch(err => console.log(err))


app.use('/', route)


app.listen((3000), () => console.log("Server is running !"))

