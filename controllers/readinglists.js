const router = require('express').Router()
const { Op } = require('sequelize')

const { Readinglists } = require('../models')
const { tokenExtractor } = require('../util/middleware')

router.post('/', async (req, res) => {
  const blogToReadingslist = await Readinglists.create({
    blogId: req.body.blog_id,
    userId: req.body.user_id
  })
  res.json(blogToReadingslist)
})

router.put('/:id', tokenExtractor, async (req, res) => {
  const readinglistBlog = await Readinglists.findOne({
    where: {
      [Op.and]: [{ blogId: req.params.id }, { userId: req.decodedToken.id }]
    }
  })
  readinglistBlog.read = req.body.read
  await readinglistBlog.save()
  res.json(readinglistBlog)
})

module.exports = router

