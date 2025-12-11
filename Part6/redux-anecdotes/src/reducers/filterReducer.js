import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: 'ALL',
  reducers: {
    filterChange(state, action) {
      const filter = action.payload
      // console.log(state)
      // console.log(current(state))
      return filter
    },
  },
})

export const { filterChange } = filterSlice.actions
export default filterSlice.reducer
