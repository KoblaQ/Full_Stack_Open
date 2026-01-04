import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import UserContext from './UserContext'

import { Button, TextField } from '@mui/material'
import ThumbUpIcon from '@mui/icons-material/ThumbUp'

const BlogView = ({ blogs, updateBlog, deleteBlog }) => {
  // const user = useContext(UserContext)
  const id = useParams().id
  const blog = blogs.find((b) => b.id === id)
  // console.log(blog)

  const [blogComment, setBlogComment] = useState('')
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
    // border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const handleAddComment = (event) => {
    event.preventDefault()

    // console.log(blogComment)
    // setBlogComment(event.target)
    const updatedBlog = {
      ...blog,
      comments: blog.comments.concat(blogComment),
    }
    setBlogComment('')
    // console.log(updatedBlog)
    updateBlog(updatedBlog)
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
            {blog.likes} likes{' '}
            <Button
              size="small"
              variant="contained"
              endIcon={<ThumbUpIcon />}
              onClick={updateLikes}
            >
              like
            </Button>
          </p>
          <p>added by {blog.user.name}</p>
          {/* Contidionally render the comments */}
          {/* {blog.comments.length > 0 && <h3>comments</h3>} */}
          <h3>comments</h3>
          {/* <p> */}
          <TextField
            name="comment"
            label="comment"
            helperText="Please leave a comment here"
            value={blogComment}
            onChange={({ target }) => setBlogComment(target.value)}
          />{' '}
          <Button size="small" variant="contained" onClick={handleAddComment}>
            add comment
          </Button>
          {/* </p> */}
          <div>
            <ul>
              {blog.comments.map((comment, index) => (
                <li key={index}>{comment}</li>
              ))}
            </ul>
          </div>
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
