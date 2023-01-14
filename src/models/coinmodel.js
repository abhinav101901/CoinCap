
const mongoose = require('mongoose')


module.exports = mongoose.model(

    'coin',

    mongoose.Schema(
        {
            symbol: String,
            name: String,
            rank:String,
            marketCapUsd: String,
            priceUsd: String
        }
    ))
