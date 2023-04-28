const router = require('express').Router()
const { Comment, User, Post } = require('../../models')
const withAuth = require('../../utils/auth')

//Post request to create a comment (post content, username, and date created)

//Put request to update existing comment

//Delete request to delete existing comment 

module.exports = router