const router = require('express').Router()
const { User, Post } = require('../../models')
const withAuth = require('../../utils/auth')

//Post request to create new blog post (title and content)
router.post('/', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.session.username
            }
        })
        const userId = user.id

        const newPost = await Post.create({
            title: req.body.title,
            content: req.body.content,
            user_id: userId
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
router.delete('/:id', withAuth, async (req, res) => {
    try {
        const postData = await Post.destroy({
            where: {
                id: req.params.id,
            }
        })
        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' })
            return
          }
      
          res.status(200).json(postData)
    } catch (err) {
        res.status(500).json(err)
    }
})

module.exports = router