const express = require("express")

const app = express()
const PORT = 3000;

app.listen(PORT, () => {
    console.log(`API server listening on port: ${PORT}`)
})


