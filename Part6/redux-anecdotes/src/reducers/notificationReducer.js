import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return action.payload
    },
    resetNotification(state, action) {
      return null
    },
  },
})

const { createNotification } = notificationSlice.actions

export const setNotification = (message, duration) => {
  return async (dispatch) => {
    dispatch(createNotification(message))
    setTimeout(() => {
      dispatch(resetNotification())
    }, duration * 1000)
  }
}

export const { resetNotification } = notificationSlice.actions
export default notificationSlice.reducer
