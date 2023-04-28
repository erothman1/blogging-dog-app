const User = require("./User")
const Post = require("./Post")
const Comment = require("./Comment")

//user has many posts
User.hasMany(Post, {
    foreignKey: "user_id"
})

//post belongs to one user
Post.belongsTo(User)

//user has many comments
User.hasMany(Comment, {
    foreignKey: "user_id"
})

//comment belongs to one user
Comment.belongsTo(User)

//post has many comments
Post.hasMany(Comment, {
    foreignKey: "post_id"
})

//comment belongs to post
Comment.belongsTo(Post)

module.exports = {
    User,
    Post, 
    Comment
}