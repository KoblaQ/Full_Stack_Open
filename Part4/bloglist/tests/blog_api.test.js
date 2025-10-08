const assert = require('node:assert')
const { test, after, beforeEach, describe } = require('node:test')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blog')
const helper = require('./test_helper')
const Test = require('supertest/lib/test')
const {
  notesInDb,
} = require('../../../Practice/notes/notes_server/tests/test_helper')

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

test('a valid blog can be added', async () => {
  const newBlog = {
    title: 'Testing post Blog',
    author: 'Kafui',
    url: 'https://fullstackopen.com/en/',
    likes: 100,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].title, newBlog.title)
})

test('verify that likes property defaults to value 0 if left out', async () => {
  const newBlog = {
    title: 'Testing post Blog',
    author: 'Kafui',
    url: 'https://fullstackopen.com/en/',
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const blogsAtEnd = await helper.blogsInDb()
  assert.strictEqual(blogsAtEnd[blogsAtEnd.length - 1].likes, 0)
})

describe('missing title or url', () => {
  test('a blog without title cannot be added', async () => {
    const newBlog = {
      author: 'Kafui',
      url: 'https://fullstackopen.com/en/',
      likes: 99,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })

  test('a blog without url cannot be added', async () => {
    const newBlog = {
      title: 'Testing post Blog',
      author: 'Kafui',
      likes: 35,
    }

    await api.post('/api/blogs').send(newBlog).expect(400)
    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})

test('delete a blog by ID', async () => {
  const blogsAtStart = await helper.blogsInDb()
  const blogToBeDeleted = blogsAtStart[0]

  await api.delete(`/api/blogs/${blogToBeDeleted.id}`).expect(204)
  const blogsAtEnd = await helper.blogsInDb()

  const blogTitles = blogsAtEnd.map((blog) => blog.title)
  assert(!blogTitles.includes(blogToBeDeleted.title))

  assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 3)
})

after(async () => {
  await mongoose.connection.close()
})
