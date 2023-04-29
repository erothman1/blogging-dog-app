const router = require('express').Router()
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/auth')

//Post request to create a comment (post content, username, and date created)
router.post('/', withAuth, async (req, res) => {
    try {
        const user = await User.findOne({
            where: {
                username: req.session.username
            }
        })
        const userId = user.id

        const post = await Post.findOne({
            where: {
                user_id: userId
            }
        })
        const postId = post.id

        const newComment = await Comment.create({
            content: req.body.content, 
            user_id: userId, 
            post_id: postId
        })

        res.status(200).json(newComment)
        
    } catch (err) {
        res.status(400).json(err)
    }
})

//Put request to update existing comment

//Delete request to delete existing comment 

module.exports = router