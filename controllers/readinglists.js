const router = require('express').Router()

const { Readinglists } = require('../models')

router.post('/', async (req, res) => {
  const blogToReadingslist = await Readinglists.create({
    blogId: req.body.blog_id,
    userId: req.body.user_id
  })
  res.json(blogToReadingslist)
})

module.exports = router

