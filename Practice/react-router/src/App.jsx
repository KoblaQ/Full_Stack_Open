import { useState } from 'react'
import {
  Routes,
  Route,
  Link,
  Navigate,
  useParams,
  useNavigate,
  useMatch,
} from 'react-router-dom'
// import { Table, Form, Button, Alert, Navbar, Nav } from 'react-bootstrap'
// import {
//   Container,
//   TableContainer,
//   TableRow,
//   Paper,
//   Table,
//   TableBody,
//   TableCell,
//   TextField,
//   Button,
//   Alert,
//   AppBar,
//   Toolbar,
//   IconButton,
// } from '@mui/material'
import styled from 'styled-components'

// STYLED COMPONENTS
const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

// END OF STYLED COMPONENTS

const Home = () => (
  <div>
    <h2>TKTL notes app</h2>
    <p>
      Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      Lorem Ipsum has been the industry's standard dummy text ever since the
      1500s, when an unknown printer took a galley of type and scrambled it to
      make a type specimen book. It has survived not only five centuries, but
      also the leap into electronic typesetting, remaining essentially
      unchanged. It was popularised in the 1960s with the release of Letraset
      sheets containing Lorem Ipsum passages, and more recently with desktop
      publishing software like Aldus PageMaker including versions of Lorem
      Ipsum.
    </p>
  </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div>
        <strong>{note.important ? 'important' : ''}</strong>
      </div>
    </div>
  )
}
// const Note = ({ notes }) => {
//   const id = useParams().id
//   const note = notes.find((n) => n.id === Number(id))
//   return (
//     <div>
//       <h2>{note.content}</h2>
//       <div>{note.user}</div>
//       <div>
//         <strong>{note.important ? 'important' : ''}</strong>
//       </div>
//     </div>
//   )
// }

const Notes = ({ notes }) => (
  <div>
    <h2>Notes</h2>
    {/* NOTES TABLE -  USING STYLED-COMPONENTS */}
    <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul>

    {/* NOTES TABLE WITH MATERIAL UI */}
    {/* <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {notes.map((note) => (
            <TableRow key={note.id}>
              <TableCell>
                <Link to={`/notes/${note.id}`}>{note.content}</Link>
              </TableCell>
              <TableCell>{note.user}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer> */}

    {/* NOTES TABLE - WITH REACT-BOOTSTRAP */}
    {/* <Table striped>
      <tbody>
        {notes.map((note) => (
          <tr key={note.id}>
            <td>
              <Link to={`/notes/${note.id}`}>{note.content}</Link>
            </td>
            <td>{note.user}</td>
          </tr>
        ))}
      </tbody>
    </Table> */}

    {/* NOTES TABLE - BEFORE USING REACT-BOOTSTRAP */}
    {/* <ul>
      {notes.map((note) => (
        <li key={note.id}>
          <Link to={`/notes/${note.id}`}>{note.content}</Link>
        </li>
      ))}
    </ul> */}
  </div>
)

const Users = () => (
  <div>
    <h2>TKTL notes app</h2>
    <ul>
      <li>Matti Luukkainen</li>
      <li>Juha Tauriainen</li>
      <li>Arto Hellas</li>
    </ul>
  </div>
)

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('KoblaQ')
    navigate('/')
  }

  return (
    // LOGIN FORM - USING STYLED-COMPONENTS
    <div>
      <h2>login</h2>
      <form onSubmit={onSubmit}>
        <div>
          username: <Input />
        </div>
        <div>
          password: <Input type="password" />
        </div>
        <Button type="submit" primary="">
          login
        </Button>
      </form>
    </div>

    // LOGIN FORM - WITH MATERIAL UI
    // <div>
    //   <h2>login</h2>
    //   <form onSubmit={onSubmit}>
    //     <div>
    //       <TextField label="username" />
    //       {/* username: <input /> */}
    //     </div>
    //     <div>
    //       <TextField label="password" type="password" />
    //       {/* password: <input type="password" /> */}
    //     </div>
    //     <Button variant="contained" color="primary" type="submit">
    //       login
    //     </Button>
    //     {/* <button type="submit">login</button> */}
    //   </form>
    // </div>

    // LOGIN FORM - WITH REACT-BOOTSTRAP
    // <div>
    //   <h2>login</h2>
    //   <Form onSubmit={onSubmit}>
    //     <Form.Group>
    //       <Form.Label>username</Form.Label>
    //       <Form.Control type="text" name="username" />
    //     </Form.Group>
    //     <Form.Group>
    //       <Form.Label>password</Form.Label>
    //       <Form.Control type="password" />
    //     </Form.Group>
    //     <Button variant="primary" type="submit">
    //       login
    //     </Button>
    //   </Form>
    // </div>

    // LOGIN FORM - BEFORE USING REACT-BOOTSTRAP
    // <div>
    //   <h2>login</h2>
    //   <form onSubmit={onSubmit}>
    //     <div>
    //       username: <input />
    //     </div>
    //     <div>
    //       password: <input type="password" />
    //     </div>
    //     <button type="submit">login</button>
    //   </form>
    // </div>
  )
}

const App = () => {
  const [notes, setNotes] = useState([
    // ...
    {
      id: 1,
      content: 'HTML is easy',
      important: true,
      user: 'Matti Luukkainen',
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      important: false,
      user: 'Matti Luukkainen',
    },
    {
      id: 3,
      content: 'Most important methods of HTTP-protocol are GET and POST',
      important: true,
      user: 'Arto Hellas',
    },
  ])

  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)

  const login = (user) => {
    setUser(user)
    setMessage(`welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }

  const padding = {
    padding: 5,
  }

  const match = useMatch('/notes/:id')
  const note = match
    ? notes.find((note) => note.id === Number(match.params.id))
    : null

  return (
    // Container for the MATERIAL UI (The whole app must be wrapped in a Container component)
    // <Container>
    // <div className="container">
    <Page>
      {/* NAVBAR -  USING STYLED-COMPONENTS  */}
      <Navigation>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </Navigation>

      {/* <div> */}
      {/* ALERT - USING MATERIAL UI */}

      {/* {message && <Alert severity="success">{message}</Alert>} */}

      {/* ALERT - WITH BOOTSTRAP */}
      {/* {message && <Alert variant="success">{message}</Alert>} */}
      {/* </div> */}
      {/* NAVBAR - WITH MATERIAL UI  */}
      {/* <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
          ></IconButton>
          <Button color="inherit" component={Link} to="/">
            home
          </Button>
          <Button color="inherit" component={Link} to="/notes">
            notes
          </Button>
          <Button color="inherit" component={Link} to="/users">
            users
          </Button>
          {user ? (
            <em>{user} logged in</em>
          ) : (
            <Button color="inherit" component={Link} to="/login">
              login
            </Button>
          )}
        </Toolbar>
      </AppBar> */}

      {/* NAVBAR - WITH REACT-BOOTSTRAP */}

      {/* <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-naav-bar" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">
                home
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">
                notes
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">
                users
              </Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user ? (
                <em>{user} logged in</em>
              ) : (
                <Link style={padding} to="/login">
                  login
                </Link>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar> */}

      {/* NAVBAR BEFORE USING REACT-BOOTSTRAP  */}
      {/* <div>
        <Link style={padding} to="/">
          home
        </Link>
        <Link style={padding} to="/notes">
          notes
        </Link>
        <Link style={padding} to="/users">
          users
        </Link>
        {user ? (
          <em>{user} logged in</em>
        ) : (
          <Link style={padding} to="/login">
            login
          </Link>
        )}
      </div> */}

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route
          path="/users"
          element={user ? <Users /> : <Navigate replace to="/login" />}
        />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer>
        <br />
        <em>Note app, Department of Computer Science 2024</em>
      </Footer>
    </Page>
    // </div>
    // </Container>
  )
}

export default App
