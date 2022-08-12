const Blog = require('./blog')
const User = require('./user')
const readinglists = require('./user_blogs')

User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: readinglists, as: 'readings' })
Blog.belongsToMany(User, { through: readinglists, as: 'usersMarked' })

module.exports = {
  Blog,
  User,
  readinglists
}

