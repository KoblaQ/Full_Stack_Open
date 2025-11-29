import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('<Blog /> component', () => {
  beforeEach(() => {
    const blog = {
      title: 'Testing blog title in component',
      author: 'Author for test',
      url: 'www.fullstackopen.com',
      likes: 2,
      user: { name: 'Tester' },
    }
    const user = {
      name: 'Tester',
    }
    render(<Blog blog={blog} user={user} />)
  })

  test('renders the blog title and author and not the url nor number of likes', () => {
    const blogTitleAndAuthor = screen.getByText(
      'Testing blog title in component Author for test'
    )

    //
    const blogUrl = screen.queryByText('www.fullstackopen.com')
    const blogLikes = screen.queryByText('likes 2')

    // screen.debug(blogTitleAndAuthor)
    // screen.debug(blogLikes)

    expect(blogTitleAndAuthor).toBeVisible(
      'Testing blog title in component Author for test'
    )
    expect(blogUrl).toBeDefined()
    expect(blogUrl).not.toBeVisible() // Expects the blog url to be hidden
    expect(blogLikes).toBeDefined()
    expect(blogLikes).not.toBeVisible() // Expects the blog likes to be hidden
  })

  test('blog URL and number of likes are shown when the view button is clicked', async () => {
    const user = userEvent.setup()
    const viewButton = screen.getByText('view')

    const blogUrl = screen.getByText('www.fullstackopen.com')
    const blogLikes = screen.getByText('likes 2')

    // expect(blogUrl).not.toBeVisible()
    // screen.debug(viewButton)
    screen.debug(blogUrl)
    await user.click(viewButton)

    // screen.debug(viewButton)

    expect(blogUrl).toBeVisible()
    expect(blogLikes).toBeVisible()
  })
})

// describe('<Blog /> component', () => {
//   let container
//   beforeEach(() => {
//     const blog = {
//       title: 'Testing blog title in component',
//       author: 'Author for test',
//       url: 'www.fullstackopen.com',
//       user: { name: 'Tester' },
//     }
//     const user = {
//       name: 'Tester',
//     }

//     // render(<Blog blog={blog} user={user} />)
//     container = render(<Blog blog={blog} user={user} />).container // Store the container for later use
//   })

//   test('renders the blog title and author and not the url nor number of likes', () => {
//     const blogDiv = container.querySelector('.blog')
//     const blogDetails = container.querySelector('.blogDetails')
//     const blogLikes = container.querySelector('.blogLikes')
//     const blogUrl = container.querySelector('.blogUrl')

//     const element = screen.getByText(
//       'Testing blog title in component Author for test'
//     )

//     // screen.debug(blogDetails)
//     // screen.debug(element)

//     expect(blogDiv).toBeDefined()
//     expect(element).toBeVisible(
//       'Testing blog title in component Author for test'
//     )
//     expect(blogDetails).toBeDefined()
//     expect(blogDetails).not.toBeVisible() // Expects the blog details to be hidden
//     expect(blogLikes).toBeDefined()
//     expect(blogLikes).not.toBeVisible()
//     expect(blogUrl).toBeDefined()
//     expect(blogUrl).not.toBeVisible()
//   })
// })
