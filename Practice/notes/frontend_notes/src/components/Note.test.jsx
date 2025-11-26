import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Note from './Note'

test('renders content', async () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    // content: 'This is a reminder',
    important: true,
  }
  const mockHandler = vi.fn()

  render(<Note note={note} toggleImportance={mockHandler} />)

  const user = userEvent.setup()
  const button = screen.getByText('make not important')
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(1)

  // const element = screen.getByText(
  //   'Component testing is done with react-testing-library'
  // )

  // screen.debug(element)

  // const { container } = render(<Note note={note} />)
  // const div = container.querySelector('.note')
  // expect(div).toHaveTextContent(
  //   'Component testing is done with react-testing-library'
  // )

  // const element = screen.getByText('Does not work anymore :(')

  // const element = screen.findByText('Does not work anymore :(', {
  //   exact: false,
  // })
  // const element = screen.findByText('Does not work anymore :(')
  // expect(element).toBeDefined()

  // const element = screen.queryByText('do not want this thing to be rendered')

  // expect(element).toBeNull()
})
