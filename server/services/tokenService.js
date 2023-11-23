const jwt = require("jsonwebtoken")

class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '10s'})
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'})

        return {
            accessToken,
            refreshToken
        }
    }

}

module.exports = new TokenService()