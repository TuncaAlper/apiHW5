const { Router } = require('express')
const router = new Router()
const Song = require('./model')
const Playlist = require('../playlists/model')
const auth = require('../auth/middleware')

router.post('/playlists/:id/songs', auth, (req, res, next) => {
        console.log(req.params, "reqqqqq")
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                console.log(playlist.userId, "UserID")
                console.log(req.user.id, "IDDD")
                console.log(req.playlist, "REQQ")
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


module.exports = router