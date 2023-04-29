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
router.get('/blog/:id', 
//withAuth, 
async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: ['username']
                    },
                },
            ],
        })
        const post = postData.get({ plain: true })
        const postId = postData.id

        res.render('blogPost', {
            ...post,
            logged_in: req.session.loggedIn,
            postId: req.params.id
        })

    } catch (err) {
        res.status(500).json(err)
    }
})

// Get request to get single (logged in) user joined with their post data
//need middleware to require login before accessing this page
router.get('/dashboard/:id', 
//withAuth, 
async (req, res) => {
    try {
        const userData = await User.findByPk(req.params.id, {
            include: [
                { model: Post }
            ]
        })

        const user = userData.get({ plain: true })

        res.render('dashboard', {
            ...user, 
            logged_in: req.session.loggedIn
        })
    } catch (err) {
        res.status(500).json(err)
    }
})

//Get request to render login page
router.get('/login', (req, res) => {
    // Redirects user to dashboard if already logged in
    if (req.session.logged_in) {
      res.redirect('/dashboard')
      return
    }
  
    res.render('login')
  })

module.exports = router