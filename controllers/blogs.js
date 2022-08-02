const router = require('express').Router()

const { Blog, User } = require('../models')
const { blogFindById, tokenExtractor } = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({
    attributes: { exclude: ['userId'] },
    include: {
      model: User
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

router.delete('/:id', tokenExtractor, blogFindById, async (req, res) => {
  const user = await User.findByPk(req.decodedToken.id)
  console.log(user)
  console.log(req.blog)
  if (user.id === req.blog.userId) {
    await req.blog.destroy()
  } else {
    return res
      .status(401)
      .json({ error: 'only user who created it can remove blog' })
  }
  res.status(204).end()
})

router.put('/:id', blogFindById, async (req, res) => {
  req.blog.likes = req.body.likes
  await req.blog.save()
  res.json(req.blog)
})

module.exports = router

