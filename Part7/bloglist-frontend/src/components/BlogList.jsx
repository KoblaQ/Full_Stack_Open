import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Togglable'
import { useContext, useRef } from 'react'
import UserContext from './UserContext'

const BlogList = ({ blogs, updateBlog, deleteBlog, addBlog }) => {
  const { user } = useContext(UserContext)
  const blogFormRef = useRef() // Passed as a prop to the Toggable Component

  // Create Blog form
  const blogForm = () => {
    return (
      <Togglable buttonLabel="create new blog" ref={blogFormRef}>
        <BlogForm createBlog={addBlog} />
      </Togglable>
    )
  }

  return (
    <div>
      {blogForm()}
      {
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
      }
    </div>
  )
}

export default BlogList
