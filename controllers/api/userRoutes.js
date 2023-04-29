const router = require('express').Router()
const { User } = require('../../models')
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

            req.session.username = req.body.username

            res.status(200).json(userData)
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Post request to login a user
router.post('/login', async (req, res) => {
    try {
        const userData = await User.findOne({
            where: {
                username: req.body.username,
            },
        })

        if (!userData) {
            res.status(400).json({ message: 'Incorrect username or password 🙈 Please try again!' })
            return
        }

        const validPassword = await userData.checkPassword(req.body.password)

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect username or password 🙈 Please try again!' })
            return
        }

        req.session.save(() => {
            req.session.loggedIn = true

            req.session.username = req.body.username

            res.status(200).json({ user: userData, message: 'You are now logged in!' })
        })
    } catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
})

//Post request to log out a user
router.post('/logout', withAuth, (req, res) => {
    if (req.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end()
        })
    } else {
        res.status(404).end()
    }
})

module.exports = router