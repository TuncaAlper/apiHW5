const { Router } = require('express')
const router = new Router()
const Song = require('./model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware')

router.post('/playlists/:id/songs', (req, res, next) => {
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            Song
            .create({...req.body, playlistId})
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
        .catch(error => next(error))
})


module.exports = router