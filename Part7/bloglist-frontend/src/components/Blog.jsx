import { Link } from 'react-router-dom'
import ListItem from '@mui/material/ListItemText'

const Blog = ({ blog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }
  return (
    <div style={blogStyle} className="blog">
      <div>
        <Link to={`/blogs/${blog.id}`}>
          <ListItem key={blog.id}>
            {blog.title} {blog.author}
          </ListItem>
        </Link>
      </div>
    </div>
  )
}

export default Blog
