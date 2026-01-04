import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useContext } from 'react'
import UserContext from './UserContext'

// Material UI
import { List } from '@mui/material'

const BlogList = ({ blogs, updateBlog, deleteBlog, blogForm }) => {
  const { user } = useContext(UserContext)
  // const blogFormRef = useRef() // Passed as a prop to the Toggable Component

  // Create Blog form
  // const blogForm = () => {
  //   return (
  //     <Togglable buttonLabel="create new blog" ref={blogFormRef}>
  //       <BlogForm createBlog={addBlog} />
  //     </Togglable>
  //   )
  // }

  return (
    <div>
      {blogForm()}

      {
        <List>
          {blogs
            .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                updateBlog={updateBlog}
                deleteBlog={deleteBlog}
                user={user}
              />
            ))}
        </List>
      }
      {/* {
        //Sort the blogs based on the number of likes before rendering them
        // [...blogs] // REDUX NEEDS Spread out
        blogs
          .sort((firstBlog, secondBlog) => secondBlog.likes - firstBlog.likes)
          .map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              updateBlog={updateBlog}
              deleteBlog={deleteBlog}
              user={user}
            />
          ))
      } */}
    </div>
  )
}

export default BlogList
