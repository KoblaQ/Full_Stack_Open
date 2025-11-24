import { render, screen } from '@testing-library/react'
import Note from './Note'

test('renders content', () => {
  const note = {
    content: 'Component testing is done with react-testing-library',
    // content: 'This is a reminder',

    important: true,
  }

  const { container } = render(<Note note={note} />)
  const div = container.querySelector('.note')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )

  // const element = screen.getByText(
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
