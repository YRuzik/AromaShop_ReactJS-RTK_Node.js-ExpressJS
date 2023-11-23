require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path");
const app = express()
const errorMiddleware = require('../middlewares/errorMiddleware')
const PORT = 6001;
const rootController = require('../controllers/root')

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: ['http://localhost:5173']}))
app.use('/public', express.static(path.join(__dirname, '/public')))

rootController.handleRoutes(app)

app.use(errorMiddleware)

app.listen(PORT, () => {
    console.log(`API server listening on port: ${PORT}`)
})


