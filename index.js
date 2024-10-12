const cors = require('cors')
const express = require('express')

const { getAllGames, getGameById } = require('./controllers')

const app = express()

app.use(cors())
app.use(express.json())

app.get('/games', (req, res) => {
    const games = getAllGames()
    res.status(200).json({ games })
})

app.get('/games/details/:id', (req, res) => {
    const id = Number(req.params.id)
    const game = getGameById(id)
    res.status(200).json({ game })
})


module.exports = { app }