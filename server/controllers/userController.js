const knex = require('../configs/knex.config')
const apiError = require('../errors/errors')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid')

router.post("/verification-password", async (req, res, next) => {
    try {
        const {password, user_id} = req.body;
        const hashedPassword = (await knex.select("*").from("users").where("id", user_id))[0].password
        const passed = await bcrypt.compare(password, hashedPassword)

        if (!passed) {
            throw apiError.BadRequest("Пароли не совпадают")
        }

        res.status(200).send("success")
    } catch (e) {
        next(e)
    }
})

router.post("/create-order", async (req, res, next) => {
    try {
        const orderInfo = req.body.order_json;
        const userId = req.body.user_id;
        const orderName = uuid.v4()
        const id = uuid.v4()

        const deserialized = JSON.parse(orderInfo);

        await knex('orders').insert({
            order_id: id,
            user_id: userId,
            order_json: orderInfo,
            order_name: orderName,
            order_status: "Собирается",
        })

        await (async function () {
            for await (const obj of deserialized) {
                const available = (obj.quantity - obj.selected_quantity) > 0
                await knex("products").where("product_id", obj.product_id).update({
                    quantity: obj.quantity - obj.selected_quantity,
                    available: available
                })
            }
        })();

        setTimeout(async () => {
            const ord = await knex.select("*").from("orders").where("order_id", id)
            if (ord[0].order_status !== "Отменен") {
                await knex('orders').update({
                    order_status: "Готов к выдаче"
                }).where("order_id", id)
            }
        }, 30000)


        res.send({message: "Заказ сформирован"})

    } catch (e) {
        next(e)
    }
})

router.get("/orders/:id", async (req, res, next) => {
  try {
      const id = req.params.id;
      const orders = await knex.select("*").from("orders").where("user_id", id);
        console.log(orders)
      res.status(200).send(orders)

  } catch (e) {
    next(e)
  }
})

module.exports = router