import { useContext } from 'react'
import NotificationContext from './NotificationContext'

const Notification = () => {
  // const Notification = ({ message, type }) => {
  // if (message === null) {
  //   return null
  // }

  const { notification } = useContext(NotificationContext)

  if (notification) {
    return (
      <div className={notification.type === 'error' ? 'error' : 'message'}>
        {notification.message}
      </div>
      // <div className={type === 'error' ? 'error' : 'message'}>{message}</div>
    )
  }
}

export default Notification
