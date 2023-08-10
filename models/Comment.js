const {db, DataTypes, Model} = require('../db/connection');

class Comment extends Model{};

Comment.init({
    body: DataTypes.STRING,
},
{
    sequelize: db,
    modelName: 'Comment'
});


module.exports = Comment;