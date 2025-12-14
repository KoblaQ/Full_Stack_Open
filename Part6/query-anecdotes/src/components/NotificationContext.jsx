import { createContext, useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case 'CREATE':
      // return action.payload
      return `anecdote '${action.payload}' created`
    case 'VOTE':
      // return action.payload
      return `anecdote '${action.payload}' voted`
    case 'RESET':
      return null
    default:
      return null
  }
}

const NotificationContext = createContext()

export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(
    notificationReducer,
    null,
  )

  return (
    <NotificationContext.Provider
      value={{ notification, notificationDispatch }}
    >
      {props.children}
    </NotificationContext.Provider>
  )
}

export default NotificationContext
