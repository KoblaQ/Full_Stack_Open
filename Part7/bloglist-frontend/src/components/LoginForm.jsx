import Notification from './Notification'
import { TextField, Button } from '@mui/material'

const LoginForm = ({
  password,
  setPassword,
  username,
  setUsername,
  handleLogin,
  // notification,
}) => {
  return (
    <form onSubmit={handleLogin}>
      <h2>log in to application</h2>
      <Notification />
      {/* <Notification message={notification.message} type={notification.type} /> */}
      <div>
        <TextField
          label="username"
          type="text"
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        {/* <label>
          username
          <input
            name="username"
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </label> */}
      </div>
      <div>
        <TextField
          label="password"
          type="password"
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
        {/* <label>
          password{' '}
          <input
            name="password"
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </label> */}
      </div>
      <Button variant="contained" color="primary" type="submit">
        login
      </Button>
      {/* <button type="submit">login</button> */}
    </form>
  )
}

export default LoginForm
