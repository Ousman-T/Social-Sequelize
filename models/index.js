const Comment = require("./Comment");
const Like = require("./Like");
const Post = require("./Post");
const Profile = require("./Profile");
const User = require("./User");

// one to one user-profile association.
User.hasOne(Profile);
Profile.belongsTo(User);

// one to many user-post association.
User.hasMany(Post);
Post.belongsTo(User);

// one to many post-comment association.
Post.hasMany(Comment);
Comment.belongsTo(Post);

// many to many user-like association.
User.hasMany(Like);
Like.belongsToMany(User, {through: 'UserLikes'});

module.exports = {
    Comment,
    Like,
    Post,
    Profile,
    User
}