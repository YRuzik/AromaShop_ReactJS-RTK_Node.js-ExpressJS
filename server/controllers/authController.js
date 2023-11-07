const knex = require('../configs/knex.config')
const apiError = require('../errors/errors')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid')

const handleLogin = async (req, res) => {
    const user = req.body;

}

router.post('/registration', async (req, res, next) => {
    const {name, surname, patronymic, login, email, password} = req.body;
    const users = await knex.select('email', 'login').from('users')

    try {
        const hasDuplicates = await users.some((user) => {
            return (user.email === req.body.email) || (user.login === req.body.login);
        })

        console.log(hasDuplicates)

        if (hasDuplicates) {
            throw apiError.AlreadyRegistered()
        }

        const hashPassword = await bcrypt.hash(password, 3)
        const id = uuid.v4()

        await knex('users').insert(
            {
                id,
                name,
                surname,
                patronymic,
                login,
                email,
                password: hashPassword
            }
        )

        res.status(201).json({'success': 'user created!'})

    } catch (e) {
        next(e)
    }

})

module.exports = router