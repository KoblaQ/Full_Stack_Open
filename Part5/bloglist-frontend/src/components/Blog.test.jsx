import { render, screen } from '@testing-library/react'
import Blog from './Blog'

test('renders the blog title and author and not the url nor number of likes', () => {
  const blog = {
    title: 'Testing blog title in component',
    author: 'Author for test',
    url: 'www.fullstackopen.com',
    user: { name: 'Tester' },
  }
  const user = {
    name: 'Tester',
  }

  // render(<Blog blog={blog} user={user} />)
  const { container } = render(<Blog blog={blog} user={user} />)

  const blogDiv = container.querySelector('.blog')
  const blogDetails = container.querySelector('.blogDetails')
  const blogLikes = container.querySelector('.blogLikes')
  const blogUrl = container.querySelector('.blogUrl')

  const element = screen.getByText(
    'Testing blog title in component Author for test'
  )

  // screen.debug(blogDetails)
  // screen.debug(element)

  expect(blogDiv).toBeDefined()
  expect(element).toBeVisible('Testing blog title in component Author for test')
  expect(blogDetails).toBeDefined()
  expect(blogDetails).not.toBeVisible() // Expects the blog details to be hidden
  expect(blogLikes).toBeDefined()
  expect(blogLikes).not.toBeVisible()
  expect(blogUrl).toBeDefined()
  expect(blogUrl).not.toBeVisible()
})
