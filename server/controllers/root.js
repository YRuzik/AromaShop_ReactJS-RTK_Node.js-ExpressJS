const authRoutes = require('./authController')

const handleRoutes = (app) => {
    app.use('/api', authRoutes)
}

module.exports = {handleRoutes}