const router = require('express').Router()

const { Blog } = require('../models')
const { blogFindById } = require('../util/middleware')

router.get('/', async (req, res) => {
  const blogs = await Blog.findAll({})
  res.json(blogs)
})

router.post('/', async (req, res) => {
  const blog = await Blog.create(req.body)
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

