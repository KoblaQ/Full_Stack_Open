import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    createAnecdote(state, action) {
      state.push(action.payload)
    },
    addVote(state, action) {
      const updatedAnecdote = action.payload
      return state.map((anecdote) =>
        anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
      )
    },
    setAnecdotes(state, action) {
      return action.payload
    },
  },
})

const { setAnecdotes, createAnecdote, addVote } = anecdoteSlice.actions

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const appendAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(createAnecdote(newAnecdote))
  }
}

export const increaseVote = (anecdoteObject) => {
  return async (dispatch) => {
    const updatedAnecdote = await anecdoteService.updateAnecdote(anecdoteObject)
    dispatch(addVote(updatedAnecdote))
  }
}

// export const { addVote } = anecdoteSlice.actions
export default anecdoteSlice.reducer
