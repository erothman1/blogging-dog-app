const router = require('express').Router()
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/auth')

//Post request to create new blog post (title and content)
router.post('/', async (req, res) => {
    try {
        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.user_id
        })

        res.status(200).json(newPost)

    } catch (err) {
        res.status(400).json(err)
    }
})

//Put request to update existing blog post

//Delete request to destroy existing blog post 

module.exports = router