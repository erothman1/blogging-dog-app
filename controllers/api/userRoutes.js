const router = require('express').Router()
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/auth')

//Post request to create a new user
router.post('/', async (req, res) => {
    try {
        const userData = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: req.body.password,
        })

        req.session.save(() => {
            req.session.loggedIn = true

            res.status(200).json(userData)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Post request to login a user

//Post request to log out a user