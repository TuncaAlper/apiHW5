const { Router } = require('express')
const User = require('./model')
const bcrypt = require('bcrypt')
const router = new Router()


router.get('/users', (req, res, next) => {
    User
        .findAll()
        .then(users => {
            res.status(200).send({ users })
        })
        .catch(error => next(error))
})

router.post('/users', (req, res, next) => {
    const user = {
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
        password_confirmation: bcrypt.hashSync(
            req.body.password_confirmation, 10)
    }
    
    User
        .create(user)
        .then(user => {
            if (!user) {
                return res.status(500).send({
                    message: `Something went wrong`
                })
            }
            return res.status(201).send(user)
        })
        .catch(error => next(error))
})

module.exports = router

