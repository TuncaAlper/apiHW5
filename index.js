const express = require('express')
const bodyParser = require('body-parser')
const usersRouter = require('./users/routes')
const tokenRouter = require('./auth/routes')
const playlistRouter = require('./playlists/routes')
const songRouter = require('./songs/routes')

const app = express()
const port = process.env.PORT || 4000

app
    .use(bodyParser.json())
    .use(usersRouter, tokenRouter, playlistRouter, songRouter)
    .listen(port, () => console.log(`Listening on port ${port}`))

