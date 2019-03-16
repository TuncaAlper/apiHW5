const { Router } = require('express')
const Playlist = require('./model')
const router = new Router()
const auth = require('../auth/middleware')
const User = require('../users/model')

router.post('/playlists', (req, res, next) => {
    Playlist
        .create(req.body)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            return res.status(201).send(playlist)
        })
        .catch(error => next(error))
})

router.get('/playlists' , (req, res, next) => {

    Playlist
        .findAll()
        .filter(playlists => playlists.userId === req.params.id)
        .then(playlists => {
            if (playlists === null){
                return res.status(404).send({message: "Playlist does not exist"})
            }
            return res.status(200).send({ playlists })
        })
        .catch(error => next(error))
})

router.get('/playlists/:id', auth, (req, res, next) => {
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
})

router.delete('/playlists/:id', auth, (req, res, next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            return playlist.destroy()
                .then(() => res.send({
                    message: `Playlist was deleted`
                }))
        })
        .catch(error => next(error))
})

module.exports = router