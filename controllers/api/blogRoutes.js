const router = require('express').Router()
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/auth')

//Post request to create new blog post (title and content)
router.post('/', withAuth, async (req, res) => {
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
router.put('/:id', withAuth, async (req, res) => {
    try {
        const updatedPost = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        )
        res.status(200).json(updatedPost)
    } catch (err) {
        res.status(400).json(err)
    }
})

//Delete request to destroy existing blog post 

module.exports = router