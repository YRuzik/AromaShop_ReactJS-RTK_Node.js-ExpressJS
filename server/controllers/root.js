const authRoutes = require('./authController')
const commonRoutes = require('./commonController')
const userRoutes = require('./userController')

const handleRoutes = (app) => {
    app.use('/api', authRoutes)
    app.use('/api', commonRoutes)
    app.use('/api', userRoutes)
}

module.exports = {handleRoutes}