import { useSelector, useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 10,
  }

  const dispatch = useDispatch()
  // dispatch(setNotification('HAHAHA'))
  const notification = useSelector((state) => state.notifications)

  return <div style={style}>{notification}</div>
}

export default Notification
