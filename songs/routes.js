const { Router } = require('express')
const router = new Router()
const Song = require('./model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware')

router.post('/playlists/:id/songs', (req, res, next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            return res.status(200).send(playlist)
        })
        .catch(error => next(error))

    Song
        .create(req.body)
        .then(song => {
            if (!song) {
                return res.status(404).send({
                    message: `Song does not exist`
                })
            }
            return res.status(201).send(song)
        })
        .catch(error => next(error))
})


module.exports = router