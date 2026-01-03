import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './UserContext'

const Menu = ({ handleLogout }) => {
  const padding = {
    paddingRight: 5,
  }

  const user = useContext(UserContext)

  return (
    <div
      className="menu-bar"
      style={{
        display: 'flex',
        alignItems: 'center',
        backgroundColor: 'lightgray',
        padding: 5,
      }}
    >
      <Link style={padding} to={`/`}>
        blogs
      </Link>
      <Link style={padding} to={`/users`}>
        users
      </Link>
      {user && (
        <div>
          {user.user.name} logged in
          <button onClick={handleLogout}>logout</button>
        </div>
      )}
    </div>
  )
}

export default Menu
