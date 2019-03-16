const { Router } = require('express')
const router = new Router()
const Song = require('./model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware')

router.post('/playlists/:id/songs', auth, (req, res, next) => {
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            Song
                .create({
                    ...req.body, 
                    playlistId:req.params.id
                })
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


router.delete('/playlists/:id/songs/:songsid', auth, (req, res, next) => {
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            Song
                .findByPk(req.params.songsid)
                .then(song=> {
                    if (!song || (song.playlistId != req.params.id)){
                        return res.status(404).send({
                            message: 'Song does not exist'
                        })
                    }
                    return song
                                .destroy()
                                .then(()=> res.status(200).send({
                                    message: 'Song deleted'
                                })
                                )
                    .catch(error => next(error))
                })
            })
        .catch(error => next(error))
})

router.put('/playlists/:id/songs/:songsid', auth, (req, res, next) => {
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
        Song
            .findByPk(req.params.songsid)
            .then(song => {
                if (!song || song.playlistId !== req.params.id) {
                    return res.status(404).send({
                        message: `Song does not exist`
                    })
                }
                return song
                            .update(req.body, song.playlistId)
                            .then(song => res.status(201).send(song)) 
            })        
            .catch(error => next(error))
        })      
        .catch(error => next(error))
})


module.exports = router