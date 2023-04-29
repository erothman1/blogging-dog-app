const router = require('express').Router()
const { User, Post, Comment } = require('../models')
const withAuth = require('../utils/auth')

//Get request to get all posts joined with user data, rendered on the homepage
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: ['username']
                },
            ],
        })

        const posts = postData.map((post) => post.get({ plain: true }))

        res.render('homepage', {
            posts,
            loggedIn: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to get single post joined with user data and comment data, rendered on blogPost page
//need middleware to require login before accessing this page
router.get('/blog/:id', async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User, Comment
                },
            ],
        })
        const post = postData.get({ plain: true })

        res.render('blogPost', {
            ...post,
            logged_in: req.session.logged_in
          })

    } catch (err) {
        res.status(500).json(err)
    }
})

// Get request to get single (logged in) user joined with their post data
//need middleware to require login before accessing this page

//Get request to render login page

module.exports = router