const express = require('express')
const axios = require('axios')
const router = express.Router()

const CoinModel = require("../models/coinmodel")

router.get("/assets", async (_, res) => {

    try {

        let coinData = await axios('http://api.coincap.io/v2/assets')

        let coinArr = coinData.data.data

        let sortedCoin = coinArr.sort((c1, c2) => {

            const { changePercent24Hr: p1 } = c1
            const { changePercent24Hr: p2 } = c2

            return p1 - p2
        })

        let dbCoin = await CoinModel.create(sortedCoin)

        await CoinModel.deleteMany({ _id: { $nin: dbCoin.map(i => i._id) } })

        res.status(201).send({ status: true, message: dbCoin })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
})


module.exports = router