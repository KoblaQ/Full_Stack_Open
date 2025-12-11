import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: null,
  reducers: {
    createNotification(state, action) {
      return `You added '${action.payload}'`
    },
    voteNotification(state, action) {
      return `You voted '${action.payload}'`
    },
    resetNotification(state, action) {
      return null
    },
  },
})

export const { createNotification, voteNotification, resetNotification } =
  notificationSlice.actions
export default notificationSlice.reducer
