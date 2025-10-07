const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: 'First Blog',
    author: 'Kobla',
    url: 'https://fullstackopen.com/en/',
    likes: 44,
  },
  {
    title: 'Second Blog',
    author: 'Fafa',
    url: 'https://fullstackopen.com/en/',
    likes: 84,
  },
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map((blog) => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb,
}
