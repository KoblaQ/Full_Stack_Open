import { Link } from 'react-router-dom'
import { useContext } from 'react'
import UserContext from './UserContext'
import LogoutIcon from '@mui/icons-material/Logout'
import { Avatar, Button, Icon } from '@mui/material'
import PersonIcon from '@mui/icons-material/Person'
import HomeIcon from '@mui/icons-material/Home'
import Groups3Icon from '@mui/icons-material/Groups3'

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
        justifyContent: 'space-between',
      }}
    >
      <div>
        <Link style={padding} to={`/`}>
          <HomeIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
          blogs
        </Link>
        <Link style={padding} to={`/users`}>
          <Groups3Icon fontSize="small" style={{ verticalAlign: 'middle' }} />
          users
        </Link>
      </div>
      {user && (
        <div>
          <PersonIcon fontSize="small" style={{ verticalAlign: 'middle' }} />
          {user.user.name} logged in
          <Button
            variant="outlined"
            startIcon={<LogoutIcon />}
            onClick={handleLogout}
            style={{ marginLeft: '10px' }}
            size="small"
            color="warning"
          >
            logout
          </Button>
        </div>
      )}
    </div>
  )
}

export default Menu
