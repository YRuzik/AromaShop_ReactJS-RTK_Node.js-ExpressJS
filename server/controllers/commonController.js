const knex = require('../configs/knex.config')
const router = require('express').Router()

router.get("/products", async (req, res, next) => {
    try {
        const products = await knex
            .select("*")
            .from("products")
            .leftJoin("categories", "products.cat_id", "categories.category_id")
            .leftJoin("countries", "products.c_id", "countries.country_id")
            .leftJoin("candle_types", "products.t_id", "candle_types.type_id")

        res.send(products)

    } catch (e) {
        next(e)
    }
});

router.get("/categories", async (req, res, next) => {
    try {
        const categories = await knex
            .select("*")
            .from("categories")

        res.status(200).send(categories)

    } catch (e) {
        next(e)
    }
});

router.get("/products/:id", async (req, res, next) => {
    try {
        const productId = req.params.id
        const product = await knex
            .select("*")
            .from("products")
            .leftJoin("categories", "products.cat_id", "categories.category_id")
            .leftJoin("countries", "products.c_id", "countries.country_id")
            .leftJoin("candle_types", "products.t_id", "candle_types.type_id")
            .where("product_id", productId)

        res.status(200).send(product[0])

    } catch (e) {
        next(e)
    }
})

module.exports = router