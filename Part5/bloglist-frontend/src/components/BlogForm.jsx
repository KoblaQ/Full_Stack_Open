const BlogForm = ({
  handleSubmit,
  blogTitle,
  handleBlogTitleChange,
  blogAuthor,
  handleBlogAuthorChange,
  blogUrl,
  handleBlogUrlChange,
}) => {
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h2>create new</h2>
        <div>
          <label>
            title:{' '}
            <input
              type="text"
              value={blogTitle}
              onChange={handleBlogTitleChange}
            />
          </label>
        </div>
        <div>
          <label>
            author:{' '}
            <input
              type="text"
              value={blogAuthor}
              onChange={handleBlogAuthorChange}
            />
          </label>
        </div>
        <div>
          <label>
            url:{' '}
            <input type="text" value={blogUrl} onChange={handleBlogUrlChange} />
          </label>
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm
