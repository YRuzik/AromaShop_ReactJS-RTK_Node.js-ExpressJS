const knex = require('../configs/knex.config')
const apiError = require('../errors/errors')
const router = require('express').Router()
const bcrypt = require('bcrypt')
const uuid = require('uuid')
const jwt = require('jsonwebtoken')

router.post('/auth', async (req, res, next) => {
    try {
        const cookies = req.cookies;

        const {login, password} = req.body;
        if (!login || !password) return res.status(400).json({'message': 'Username and password are required.'});

        const foundUser = await knex.select("*").from("users").where("login", login);
        if (foundUser.length <= 0) return res.sendStatus(401); //Unauthorized

        const extractedUser = foundUser[0]

        const match = await bcrypt.compare(password, extractedUser.password);

        if (match) {
            const accessToken = jwt.sign(
                {
                    "UserInfo": {
                        "login": extractedUser.login,
                        "role": extractedUser.role
                    }
                },
                process.env.ACCESS_TOKEN_SECRET,
                {expiresIn: '10s'}
            );
            const newRefreshToken = jwt.sign(
                {"login": extractedUser.login},
                process.env.REFRESH_TOKEN_SECRET,
                {expiresIn: '1d'}
            );


                const refreshToken = cookies.jwt;
                const foundToken = await knex
                    .select("*")
                    .from("refresh_tokens")
                    .where("user_id", extractedUser.id);
                console.log(foundToken)
                if (foundToken[0]) {
                    await knex('refresh_tokens')
                        .where("user_id", extractedUser.id)
                        .update("token", newRefreshToken)
                } else {
                    await knex('refresh_tokens')
                        .insert({
                            user_id: extractedUser.id,
                            token: refreshToken
                        })
                }

            if (cookies?.jwt) {
                res.clearCookie('jwt', {httpOnly: true, sameSite: 'None', secure: true});
            }

            res.cookie('jwt', newRefreshToken, {
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
        const cookies = req.cookies;
        if (!cookies?.jwt) return res.sendStatus(401);
        const refreshToken = cookies.jwt;

        const foundUser = (await knex.select("*")
            .from("refresh_tokens")
            .joinRaw("join users ON users.id = refresh_tokens.user_id", [])
            .where("token", refreshToken));

        if (!foundUser[0]) {
            await jwt.verify(
                refreshToken,
                process.env.REFRESH_TOKEN_SECRET,
                async (err, decoded) => {
                    if (err) return res.sendStatus(403); //Forbidden
                    await knex("refresh_tokens")
                        .where("token", refreshToken)
                        .update("token", null)
                }
            )
            return res.sendStatus(403); //Forbidden
        }

        await jwt.verify(
            refreshToken,
            process.env.REFRESH_TOKEN_SECRET,
            async (err, decoded) => {
                if (err || foundUser[0].login !== decoded.login) return res.sendStatus(403);
                const accessToken = jwt.sign(
                    {
                        "UserInfo": {
                            "login": decoded.login,
                            "roles": foundUser[0].role
                        }
                    },
                    process.env.ACCESS_TOKEN_SECRET,
                    { expiresIn: '10s' }
                );

                const newRefreshToken = jwt.sign(
                    { "login": foundUser[0].login },
                    process.env.REFRESH_TOKEN_SECRET,
                    { expiresIn: '1d' }
                );

                await knex('refresh_tokens')
                    .where("user_id", foundUser[0].id)
                    .update("token", newRefreshToken)

                res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });

                res.cookie('jwt', newRefreshToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: 'None',
                    maxAge: 24 * 60 * 60 * 1000
                });

                res.json({accessToken, user: foundUser[0]});
            }
        );
    } catch (e) {
        next(e)
    }
})

module.exports = router