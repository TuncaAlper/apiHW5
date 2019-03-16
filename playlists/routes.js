const { Router } = require('express')
const Playlist = require('./model')
const router = new Router()
const auth = require('../auth/middleware')
const Song = require('../songs/model')


router.post('/playlists' , auth, (req, res, next) => {
    
    Playlist
        .create({
            name: req.body.name, 
            userId: req.user.id
        })
        .then(playlist => {
            if (!playlist ) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            return res.status(201).send(playlist)
        })
        .catch(error => next(error))
})

router.get('/playlists' ,  auth, (req, res, next) => {
    Playlist
        .findAll()
        .filter(playlists => playlists.userId === req.user.id)
        .then(playlists => {
            if (!playlists){
                return res.status(404).send({message: "Playlist does not exist"})
            }
            return res.status(200).send(playlists)
        })
        .catch(error => next(error))
})

router.get('/playlists/:id' , auth, (req, res, next) => {
    
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {      
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            Song
                .findAll()
                .filter(songs => songs.playlistId === playlist.id)
                .then(songs => {
                    if (!songs){
                        return res.status(404).send({
                            message:"Song does not exist"
                        })
                    }
                    return res.status(200).send({playlist , songs})
                })
                .catch(error => next(error))
        })
        .catch(error => next(error))
})

router.delete('/playlists/:id', auth, (req, res, next) => {
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            if (!playlist || (playlist.userId !== req.user.id)) {
                return res.status(404).send({
                    message: `Playlist does not exist`
                })
            }
            Song
                .findAll()
                .filter (songs=> songs.playlistId === playlist.id)
                .then(songs=>{
                    songs.map(song => song.destroy())
                })

            return playlist
                        .destroy()
                        .then(() => res.send({
                            message: `Playlist was deleted`
                        })
                        )
            })
        .catch(error => next(error))
})


module.exports = router
