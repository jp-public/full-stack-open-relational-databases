const router = require('express').Router()

const { UserBlogs } = require('../models')

router.post('/', async (req, res) => {
  const userBlog = await UserBlogs.create({
    blogId: req.body.blog_id,
    userId: req.body.user_id
  })
  res.json(userBlog)
})

module.exports = router

