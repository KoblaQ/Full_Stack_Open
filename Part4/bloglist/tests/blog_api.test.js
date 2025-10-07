const assert = require('node:assert')
const { test, after, beforeEach } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})

  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  // console.log(blogsAtEnd)
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
})

test('unique identifier property of blog posts is named id', async () => {
  const blogsAtEnd = await helper.blogsInDb()
  const blogToTest = blogsAtEnd[0]

  assert.ok(Object.keys(blogToTest).includes('id'))
})

after(async () => {
  await mongoose.connection.close()
})
