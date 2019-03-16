const { Router } = require('express')
const Playlist = require('./model')
const router = new Router()
const auth = require('../auth/middleware')
const User = require('../users/model')
const Song = require('../songs/model')

router.post('/playlists' , (req, res, next) => {
    Playlist
        .create({...req.body,userId})
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

router.get('/playlists' ,  (req, res, next) => {
    // console.log(req.user,"HEYY")
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

router.get('/playlists/:id' , (req, res, next) => {
    // console.log(req.params, "PARAMS")
    
    Playlist
        .findByPk(req.params.id)
        .then(playlist => {
            // console.log(playlist,"USERRR")        
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

router.delete('/playlists/:id', (req, res, next) => {
    Playlist
        .findById(req.params.id)
        .then(playlist => {
            if (!playlist) {
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


// return res.status(200).send(playlist)