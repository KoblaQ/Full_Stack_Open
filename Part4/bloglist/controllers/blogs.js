const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const { userExtractor } = require('../utils/middleware')

// Get all blogs
blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user', { username: 1, name: 1 }) // .populate works like join in SQL
  response.json(blogs)
})

// Create a blog
blogsRouter.post('/', userExtractor, async (request, response) => {
  const body = request.body

  const user = request.user // Get the user from the userExtractor middleware
  if (!user) {
    return response.status(400).json({ error: 'userId missing or not valid' })
  }

  // Adds like property at value 0 if omitted
  if (!body.likes) {
    body.likes = 0
  }

  // If the blog is missing a title or url
  if (!body.title || !body.url) {
    return response.status(400).end()
  }

  const blog = new Blog({
    title: body.title,
    author: user.name, // Set the author of the blog to the name of the user creating it
    url: body.url,
    user: user._id,
    likes: body.likes || 0,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.status(201).json(savedBlog)
})

// Delete by ID
blogsRouter.delete('/:id', userExtractor, async (request, response) => {
  const user = request.user
  // console.log('User extracted by middleware:', user)
  const blogToDelete = await Blog.findById(request.params.id)

  if (blogToDelete.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Invalid user' })
  }
})

// Update blog by ID
blogsRouter.put('/:id', async (request, response) => {
  const { likes } = request.body
  const blogToUpdate = await Blog.findById(request.params.id)
  blogToUpdate.likes = likes

  const updatedBlog = await blogToUpdate.save()
  response.status(200).json(updatedBlog)
})

// blogsRouter.get('/:id', async (request, response) => {
//   const blog = await Blog.findById(request.params.id)
//   if (blog) {
//     response.json(blog)
//   } else {
//     response.status(404).end()
//   }
// })

module.exports = blogsRouter
