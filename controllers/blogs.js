const router = require('express').Router()

const { Blog, User } = require('../models')
const { blogFindById, tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User,
      attributes: ['name']
    }
  })
  res.json(blogs)
})

router.post('/', tokenExtractor, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  const blog = await Blog.create({ ...req.body, userId: user.id })
  res.json(blog)
})

router.get('/:id', blogFindById, async (req, res) => {
  res.json(req.blog)
})

router.delete('/:id', blogFindById, async (req, res) => {
  await req.blog.destroy()
})

router.put('/:id', blogFindById, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router

