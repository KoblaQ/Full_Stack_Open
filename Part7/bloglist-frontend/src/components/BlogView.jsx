import { useContext } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserContext from './UserContext'

const BlogView = ({ blogs, updateBlog, deleteBlog }) => {
  // const user = useContext(UserContext)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)

  // Update the likes in the blog object
  const updateLikes = (event) => {
    event.preventDefault()

    const updatedBlog = {
      ...blog,
      likes: blog.likes + 1,
      user: blog.user.id,
    }
    // console.log('Updated blog:', updatedBlog)
    updateBlog(updatedBlog)
  }

  const handleDeleteBlog = (event) => {
    event.preventDefault()
    if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
      deleteBlog(blog.id)
    }
  }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  return (
    <div style={blogStyle} className="blogDetails">
      <div>
        <h2>
          {blog.title} {blog.author}
        </h2>
        <div>
          <p>
            <Link to={blog.url}>{blog.url}</Link>
          </p>
          <p className="blogLikes">
            {blog.likes} likes <button onClick={updateLikes}>like</button>
          </p>
          <p>added by {blog.user.name}</p>

          {/* {blog.user.name === user.user.name && (
            <button
              style={{ backgroundColor: '#24A0ED' }}
              onClick={handleDeleteBlog}
            >
              remove
            </button>
          )} */}
        </div>
      </div>
    </div>
  )
}

export default BlogView
