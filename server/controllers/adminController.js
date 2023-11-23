const knex = require('../configs/knex.config')
const apiError = require('../errors/errors')
const router = require('express').Router()

router.get('/orders', async (req, res, next) => {
    try {
        const orders = await knex
            .select("*")
            .from("orders")
            .join("users", "orders.user_id", "users.id")

        res.status(200).send(orders)
    } catch (e) {
        next(e)
    }
})

module.exports = router