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
    const updatedBlog = { ...blog, likes: blog.likes + 1, user: blog.user.id } // also add the user id to the object
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
        <p>{blog.url}</p>
        <p>
          likes {blog.likes} <button onClick={updateLikes}>like</button>
        </p>
        <p>{blog.author}</p>
      </div>
    </div>
  )
}

export default Blog
