import { useState } from 'react'
import { TextField, Button } from '@mui/material'

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    })

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }
  return (
    <div>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        <div>
          <TextField
            label="title"
            value={blogTitle}
            onChange={(event) => setBlogTitle(event.target.value)}
          />
          {/* <label>
            title:{' '}
            <input
              type="text"
              value={blogTitle}
              onChange={(event) => setBlogTitle(event.target.value)}
            />
          </label> */}
        </div>
        <div>
          <TextField
            label="author"
            value={blogAuthor}
            onChange={(event) => setBlogAuthor(event.target.value)}
          />
          {/* <label>
            author:{' '}
            <input
              type="text"
              value={blogAuthor}
              onChange={(event) => setBlogAuthor(event.target.value)}
            />
          </label> */}
        </div>
        <div>
          <TextField
            label="url"
            value={blogUrl}
            onChange={(event) => setBlogUrl(event.target.value)}
          />
          {/* <label>
            url:{' '}
            <input
              type="text"
              value={blogUrl}
              onChange={(event) => setBlogUrl(event.target.value)}
            />
          </label> */}
        </div>
        <Button variant="contained" color="primary" type="submit" size="small">
          create
        </Button>
        {/* <button type="submit">create</button> */}
      </form>
    </div>
  )
}

export default BlogForm
