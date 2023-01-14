const express = require('express')
const axios = require('axios')
const router = express.Router()

const CoinModel = require("../models/coinmodel")

router.get("/assets", async (_, res) => {

    try {
        var config = {
            method: 'get',
            url: 'https://api.coincap.io/v2/assets',
            headers: {Authorization:"Bearer 562d83c1-6580-458d-9441-85635259da45"}
          };

        let coinData = await axios(config)

        let coinArr = coinData.data.data

        let sortedCoin = coinArr.sort((c1, c2) => {

            const { changePercent24Hr: p1 } = c1
            const { changePercent24Hr: p2 } = c2

            return p1 - p2
        })

        let dbCoin = await CoinModel.create(coinArr)

        await CoinModel.deleteMany({ _id: { $nin: dbCoin.map(i => i._id) } })

        res.status(201).send({ status: true, message: dbCoin })
    }
    catch (error) {
        res.status(500).send({ status: false, message: error.message })
    }
})


module.exports = router