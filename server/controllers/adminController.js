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

router.get('/additional-info', async (req, res, next) => {
    try {
        const countries = await knex
            .select("*")
            .from("countries")

        const categories = await knex
            .select("*")
            .from("categories")

        const candleTypes = await knex
            .select("*")
            .from("candle_types")

        res.status(200).json({categories, countries, types: candleTypes})
    } catch (e) {
        next(e)
    }
})

router.get("/orders/:id", async (req, res, next) => {
    try {
        const id = req.params.id;
        const order = await knex
            .select("*")
            .from("orders")
            .join("users", "orders.user_id", "users.id")
            .where("order_id", id);

        res.status(200).send(order[0])

    } catch (e) {
        next(e)
    }
})

router.post('/change-order', async (req, res, next) => {
    try {
        const orderId = req.body.order_id;
        const orderStatus = req.body.order_status;
        const orderJson = req.body.order_json;
        const reason = req.body.reason;
        const seen = req.body.seen;

        await knex('orders')
            .where("order_id", orderId)
            .update({
                order_status: orderStatus,
                reason,
                seen
            })

        if (orderStatus === "Собирается") {
            await (async function () {
                for await (const obj of orderJson) {
                    const available = (obj.quantity - obj.selected_quantity) > 0
                    await knex("products").where("product_id", obj.product_id).update({
                        quantity: obj.quantity - obj.selected_quantity,
                        available: available
                    })
                }
            })();

            setTimeout(async () => {
                const ord = await knex.select("*").from("orders").where("order_id", orderId)
                if ((ord[0].order_status !== "Отменен") || (ord[0].order_status !== "Отменен администратором")) {
                    await knex('orders').update({
                        order_status: "Готов к выдаче"
                    }).where("order_id", orderId)
                }
            }, 30000)
        }

        res.status(200).send("Заказ успешно изменен")
    } catch (e) {
        next(e)
    }
})

router.post('/change-product', async (req, res, next) => {
    try {
        const {product_id, title, image_url, price, c_id, t_id, cat_id, available, creation_date, quantity} = req.body;

        await knex("products")
            .where("product_id", product_id)
            .update({
                title,
                image_url,
                price,
                c_id,
                t_id,
                cat_id,
                available,
                creation_date,
                quantity
            })

        res.status(200).send("Товар успешно изменен")
    } catch (e) {
        next(e)
    }
})

module.exports = router