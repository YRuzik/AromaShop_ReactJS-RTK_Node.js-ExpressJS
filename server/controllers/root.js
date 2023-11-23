const authRoutes = require('./authController')
const commonRoutes = require('./commonController')
const userRoutes = require('./userController')
const adminRoutes = require('./adminController')

const handleRoutes = (app) => {
    app.use('/api', authRoutes)
    app.use('/api', commonRoutes)
    app.use('/api', userRoutes)
    app.use('/api/admin', adminRoutes)
}

module.exports = {handleRoutes}