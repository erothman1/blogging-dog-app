const router = require('express').Router()
const { User, Post, Comment } = require('../models')
//require middleware for if logged in

//Get request to get all posts joined with user data, rendered on the homepage

//Get request to get single post joined with user data and comment data, rendered on blogPost page
//need middleware to require login before accessing this page

// Get request to get single (logged in) user joined with their post data
//need middleware to require login before accessing this page

//Get request to render login page

module.exports = router