const knex = require('../configs/knex.config')
const apiError = require('../errors/errors')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')
const tokenService = require("../services/tokenService")

router.post('/auth', async (req, res, next) => {
    try {
        const {jwtRefresh} = req.cookies;

        const {login, password} = req.body;
        if (!login || !password) return res.status(400).json({'message': 'Username and password are required.'});

        const foundUser = await knex
            .select("*")
            .from("users")
            .join("roles", "roles.r_id", "users.role_id")
            .where("login", login);
        if (foundUser.length <= 0) return res.sendStatus(401); //Unauthorized

        const extractedUser = foundUser[0]

        const match = await bcrypt.compare(password, extractedUser.password);

        if (match) {

            const {accessToken, refreshToken} = tokenService.generateTokens(extractedUser)
                const foundToken = await knex
                    .select("*")
                    .from("refresh_tokens")
                    .where("user_id", extractedUser.id);

                if (foundToken[0]) {
                    await knex('refresh_tokens')
                        .where("user_id", extractedUser.id)
                        .update("token", refreshToken)
                } else {
                    await knex('refresh_tokens')
                        .insert({
                            user_id: extractedUser.id,
                            token: jwtRefresh
                        })
                }

            if (jwtRefresh) {
                res.clearCookie('jwtRefresh', {httpOnly: true, sameSite: 'None', secure: true});
            }

            res.cookie('jwtRefresh', refreshToken, {
                httpOnly: true,
                secure: true,
                sameSite: 'None',
                maxAge: 24 * 60 * 60 * 1000
            });

            res.json({accessToken, user: extractedUser});

        } else {
            res.sendStatus(401);
        }
    } catch (e) {
        next(e)
    }
})

router.post('/registration', async (req, res, next) => {
    const {name, surname, patronymic, login, email, password} = req.body;
    const users = await knex.select('email', 'login').from('users')

    try {
        const hasDuplicates = await users.some((user) => {
            return (user.email === req.body.email) || (user.login === req.body.login);
        })

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

router.get('/refresh', async (req, res, next) => {
    try {
        const {jwtRefresh} = req.cookies;

        if (!jwtRefresh) {
            throw apiError.UnauthorizedError()
        }

        const userData = jwt.verify(jwtRefresh, process.env.REFRESH_TOKEN_SECRET)
        const tokenFromDB = await knex.select("*").from("refresh_tokens").where("token", jwtRefresh)
        if (!userData || !tokenFromDB) {
            throw apiError.UnauthorizedError()
        }

        const user = await knex
            .select('*')
            .from('users')
            .join("roles", "roles.r_id", "users.role_id")
            .where('id', userData.id)

        const extractedUser = user[0]

        const {accessToken, refreshToken} = tokenService.generateTokens(extractedUser)

        await knex("refresh_tokens")
            .where("user_id", extractedUser.id)
            .update("token", refreshToken)

        res.cookie('jwtRefresh', refreshToken, {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})

        res.status(200).send({accessToken, user: extractedUser})
    } catch (e) {
        next(e)
    }
})

module.exports = router