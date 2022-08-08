const router = require('express').Router()

const { Blog } = require('../models')
const { sequelize } = require('../util/db')

router.get('/', async (req, res) => {
  const authorLikes = sequelize.fn('SUM', sequelize.col('likes'))
  const blogs = await Blog.findAll({
    group: 'author',
    attributes: [
      'author',
      [sequelize.fn('COUNT', sequelize.col('id')), 'blogs'],
      [authorLikes, 'likes']
    ],
    order: [[authorLikes, 'DESC']]
  })

  res.json(blogs)
})

module.exports = router

