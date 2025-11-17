import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  const [newBlog, setNewBlog] = useState('')
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  // UseEffect for the user in localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token) // Get and set the user jwt from the localStorage
    }
  }, [])

  // Login Helper functions
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <div>
        <label>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          password{' '}
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label>
      </div>
      <button type="submit">login</button>
    </form>
  )

  // create a blog post helper function
  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    setNewBlog(blogObject)

    const createdBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(createdBlog))

    // console.log(blogObject)
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  // Create Blog form
  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      <div>
        <label>
          title:{' '}
          <input
            type="text"
            value={blogTitle}
            onChange={({ target }) => setBlogTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:{' '}
          <input
            type="text"
            value={blogAuthor}
            onChange={({ target }) => setBlogAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:{' '}
          <input
            type="text"
            value={blogUrl}
            onChange={({ target }) => setBlogUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  // Login Handler
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)) // Save the logged in user to local storage.
      setUser(user)
      setUsername('')
      setPassword('')
      // console.log('Logged in user: ', user)
    } catch {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  // Logout Handler
  const handleLogout = (event) => {
    event.preventDefault()
    console.log('LOGOUT clicked')
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  if (user === null) {
    return loginForm()
  }
  return (
    <div>
      <h2>blogs</h2>
      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}

      {blogForm()}

      {blogs.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default App
