const Blog = require('./blog')
const User = require('./user')
const Readinglists = require('./readinglist')
const Session = require('./session')

User.hasOne(Session)
User.hasMany(Blog)
Blog.belongsTo(User)

User.belongsToMany(Blog, { through: Readinglists, as: 'readings' })
Blog.belongsToMany(User, { through: Readinglists, as: 'usersMarked' })

module.exports = {
  Blog,
  User,
  Readinglists,
  Session
}

