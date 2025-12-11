import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notifications',
  initialState: 'EMPTY NOTIFICATION BANNER',
  reducers: {
    setNotification(state, action) {
      const notification = action.payload
      return `notification: ${notification}`
    },
  },
})

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer
