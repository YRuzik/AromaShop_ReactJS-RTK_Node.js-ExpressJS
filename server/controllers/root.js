const authRoutes = require('./authController')
const commonRoutes = require('./commonController')

const handleRoutes = (app) => {
    app.use('/api', authRoutes)
    app.use('/api', commonRoutes)
}

module.exports = {handleRoutes}