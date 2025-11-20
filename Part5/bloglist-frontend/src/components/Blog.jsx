import { useState } from 'react'

const Blog = ({ blog, updateBlog }) => {
  const [visible, setVisible] = useState(false)

  const showWhenVisible = { display: visible ? '' : 'none' }

  const buttonLabel = visible ? 'hide' : 'view'

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  // Update the likes in the blog object
  const updateLikes = (event) => {
    event.preventDefault()

    // Allows for the like button to work multiple times without error
    // console.log('Blog user:', blog.user)
    // console.log('Blog user type:', typeof blog.user)
    // console.log(blog.user.id)
    const userId =
      typeof blog.user === 'object' && blog.user !== null
        ? blog.user.id
        : blog.user
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: userId }
    // const userId = blog.user.id.toString() // ensure it's a string
    // const updatedBlog = { ...blog, likes: blog.likes + 1, user: userId } // also add the user id to the object
    updateBlog(updatedBlog)
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}{' '}
        <button onClick={toggleVisibility}>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        <a href={blog.url}>{blog.url}</a>
        <p>
          likes {blog.likes} <button onClick={updateLikes}>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog
