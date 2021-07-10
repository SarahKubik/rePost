const User = require('./User');
const Post = require('./Post');
const Repost = require('./Repost');

User.hasMany(Post, {
  foreignKey: 'user_id'
});

Post.belongsTo(User, {
  foreignKey: 'user_id'
});

Post.hasMany(Repost, {
  foreignKey: 'post_id'
});

User.hasMany(Repost, {
  foreignKey: 'user_id'
});

Post.hasOne(Post, {
  foreignKey: 'post_id'
});


module.exports = { User, Post, Repost };
