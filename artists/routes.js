const { Router } = require('express')
const auth = require('../auth/middleware')
const Playlist = require('../playlists/model')
const Song = require('../songs/model')
const router = new Router()


router.get('/artists', auth, (req, res, next) => {
    
    Song
        .findAll()
        .then(artists => {
            if(!artists){
                return res.status(404).send({
                    message:'Artist do not exist'
                })
            }
            const artist = artists[0].dataValues.artistName
            res.status(200).send({ artist, ...artists })
        })
        .catch(error => next(error))
})

// router.post('/users', (req, res, next) => {
//     const user = {
//         email: req.body.email,
//         password: bcrypt.hashSync(req.body.password, 10),
//         password_confirmation: bcrypt.hashSync(
//             req.body.password_confirmation, 10)
//     }
    
//     User
//         .create(user)
//         .then(user => {
//             if (!user) {
//                 return res.status(500).send({
//                     message: `Something went wrong`
//                 })
//             }
//             return res.status(201).send(user)
//         })
//         .catch(error => next(error))
// })

module.exports = router

