import { useState, useEffect, useRef } from 'react'
import BlogView from './components/BlogView'
import BlogList from './components/BlogList'
import blogService from './services/blogs'
import userService from './services/users'
import loginService from './services/login'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'
import LoginForm from './components/LoginForm'
import User from './components/User'
import UserList from './components/UserList'

// React-Router imports
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'

// Imports for Redux
// import { useDispatch, useSelector } from 'react-redux'
// import { setNotification } from './reducers/notificationReducer'
// import { initializeBlogs, setBlogs } from './reducers/blogReducer'
// import { initializeUser, setUser } from './reducers/userReducer'

// Imports for React Query and Context
import NotificationContext from './components/NotificationContext'
import UserContext from './components/UserContext'
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

const App = () => {
  // const dispatch = useDispatch() // REDUX
  const queryClient = useQueryClient() // REACT QUERY

  // const [blogs, setBlogs] = useState([])
  // const blogs = useSelector((state) => state.blogs) // REDUX
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  // const user = useSelector((state) => state.user) // REDUX
  const { user, userDispatch } = useContext(UserContext)
  // const [user, setUser] = useState(null)
  // const notification = useSelector((state) => state.notification) // REDUX NOTIFICATION
  const { notification, notificationDispatch } = useContext(NotificationContext)

  // USESTATE NOTIFICATION
  // const [notification, setNotification] = useState({
  //   message: null,
  //   type: null,
  // })

  // USE STATE Initialization of blogs
  // useEffect(() => {
  //   blogService.getAll().then((blogs) => setBlogs(blogs))
  // }, [])

  // REDUX
  // useEffect(() => {
  //   dispatch(initializeBlogs())
  // }, [dispatch])

  // REACT QUERY
  const blogResult = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
    refetchOnWindowFocus: false, // disable refetching when window is focused (ie. tabs are changed)
    retry: 1,
  })
  const blogs = blogResult.data || []
  // console.log(JSON.parse(JSON.stringify(blogResult)))

  // REACT QUERY USERS
  const usersResult = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
    refetchOnWindowFocus: false,
    retry: 1,
  })

  const users = usersResult.data || []

  // UseEffect for the user in localStorage
  useEffect(() => {
    // REACT QUERY
    const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      userDispatch({
        type: 'SET',
        payload: user,
      })
      blogService.setToken(user.token) // Get and set the user jwt from the localStorage
    }

    // dispatch(initializeUser()) // REDUX

    // USE STATE
    // const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
    // if (loggedUserJSON) {
    //   const user = JSON.parse(loggedUserJSON)
    //   setUser(user)
    //   blogService.setToken(user.token) // Get and set the user jwt from the localStorage
    // }
  }, [])

  // UseRef
  const blogFormRef = useRef() // Passed as a prop to the Toggable Component

  // REACT QUERY ADD BLOG
  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (createdBlog) => {
      const blogs = queryClient.getQueryData(['blogs'])

      // const updatedBlogList = blogs.concat(createdBlog)
      queryClient.setQueryData(['blogs'], blogs.concat(createdBlog))
    },
  })

  // create a blog post helper function
  const addBlog = async (blogObject) => {
    // const createdBlog = await blogService.create(blogObject)
    // dispatch(setBlogs(blogs.concat(createdBlog))) // REDUX

    newBlogMutation.mutate(blogObject) // REACT QUERY

    // USE STATE NOTIFICATION
    // setNotification({
    //   message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
    //   type: 'success',
    // })
    // // Make the blog notification vanish after 5 seconds
    // setTimeout(() => {
    //   setNotification({ message: null, type: null })
    // }, 5000)

    // REDUX NOTIFICATION
    // dispatch(
    //   setNotification({
    //     message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
    //     type: 'success',
    //   })
    // )

    // REACT QUERY AND CONTEXT NOTIFICATIONS
    notificationDispatch({
      type: 'SET',
      payload: {
        message: `a new blog ${blogObject.title} by ${blogObject.author} added`,
        type: 'success',
      },
    })

    setTimeout(() => {
      // dispatch(setNotification({ message: null, type: null }))
      notificationDispatch({ type: 'RESET' })
    }, 5000)
    blogFormRef.current.toggleVisibility() // Hide the blog form after submission
  }

  // REACT QUERY For Update
  const updateMutation = useMutation({
    mutationFn: ({ id, ...blogObject }) => blogService.update(id, blogObject),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  // Update Blog likes
  const updateBlog = async (blogObject) => {
    // const updatedBlog = await blogService.update(blogObject.id, blogObject)
    // Update the blog state to reflect the new change in likes
    // dispatch(
    //   setBlogs(
    //     blogs.map((blog) => (blog.id === updatedBlog.id ? updatedBlog : blog))
    //   )
    // )

    updateMutation.mutate({ id: blogObject.id, ...blogObject })
  }

  // Delete Mutation React Query
  const deleteBlogMutation = useMutation({
    mutationFn: blogService.deleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] })
    },
  })

  // Delete blog
  const deleteBlog = async (id) => {
    // await blogService.deleteBlog(id)
    // dispatch(setBlogs(blogs.filter((blog) => blog.id !== id))) // Refresh the blogs after deletion (REDUX)
    deleteBlogMutation.mutate(id) // REACT QUERY
  }

  // Create Blog form and add a ref for useRef
  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  // Login Helper functions
  const loginForm = () => (
    <LoginForm
      username={username}
      setUsername={setUsername}
      password={password}
      setPassword={setPassword}
      // notification={notification} // Nolonger needed to be passed as a prop because of redux OR react Query CONTEXT
      handleLogin={handleLogin}
    />
  )

  // Login Handler
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user)) // Save the logged in user to local storage.
      // dispatch(setUser(user)) // REDUX

      userDispatch({
        type: 'SET',
        payload: user,
      })
      blogService.setToken(user.token) // set the token for the user
      setUsername('')
      setPassword('')
    } catch {
      // setNotification({ message: 'wrong username or password', type: 'error' })
      // setTimeout(() => {
      //   setNotification({ message: null, type: null })
      // }, 5000)

      // REDUX NOTIFICATION
      // dispatch(
      //   setNotification({
      //     message: 'wrong username or password',
      //     type: 'error',
      //   })
      // )

      // REACT QUERY AND CONTEXT NOTIFICATIONS
      notificationDispatch({
        type: 'SET',
        payload: {
          message: 'wrong username or password',
          type: 'error',
        },
      })

      setTimeout(() => {
        // dispatch(setNotification({ message: null, type: null }))
        notificationDispatch({ type: 'RESET' })
      }, 5000)
    }
  }

  // Logout Handler
  const handleLogout = (event) => {
    event.preventDefault()
    window.localStorage.removeItem('loggedBlogAppUser')
    // dispatch(setUser(null)) // REDUX
    userDispatch({
      type: 'RESET',
    })
  }

  if (user === null) {
    return loginForm()
  }

  if (blogResult.isLoading) {
    return <div>Loading data...</div>
  } else if (blogResult.isError) {
    return <div>blog service not available due to problems in server</div>
  }

  return (
    <div>
      {notification && notification.message && (
        <Notification />
        // <Notification message={notification.message} type={notification.type} />
      )}
      <h2>blogs</h2>

      {user && (
        <div>
          <p>
            {user.name} logged in
            <button onClick={handleLogout}>logout</button>
          </p>
        </div>
      )}

      {/* {blogForm()} */}

      <Routes>
        <Route
          path="/"
          element={
            <BlogList
              blogs={blogs}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              addBlog={addBlog}
            />
          }
        />
        <Route path="/users/:id" element={<User users={users} />} />
        <Route path="/users" element={<UserList users={users} />} />
        <Route
          path="/blogs/:id"
          element={
            <BlogView
              blogs={blogs}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
            />
          }
        />
      </Routes>
    </div>
  )
}

export default App
