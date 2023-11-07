require('dotenv').config()
const express = require("express")
const cors = require("cors")
const cookieParser = require("cookie-parser")
const path = require("path");
const app = express()
const PORT = 3000;
const rootController = require('../controllers/root')

app.use(express.json())
app.use(cookieParser())
app.use(cors({credentials: true, origin: ['http://localhost:5173']}))
app.use('/', express.static(path.join(__dirname, '/public')))

rootController.handleRoutes(app)

app.listen(PORT, () => {
    console.log(`API server listening on port: ${PORT}`)
})


