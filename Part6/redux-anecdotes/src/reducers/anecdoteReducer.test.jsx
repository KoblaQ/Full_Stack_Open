import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import anecdoteReducer from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('anecdote/addVote increases the vote', () => {
    const action = {
      type: 'anecdotes/addVote',
      payload: 1,
    }

    const state = [
      {
        content: 'Test anecdote',
        id: 1,
        votes: 0,
      },
    ]

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toEqual([
      {
        content: 'Test anecdote',
        id: 1,
        votes: 1,
      },
    ])
  })

  test('returns new state with action anecdotes/createAnecdote', () => {
    const state = []
    const action = {
      type: 'anecdotes/createAnecdote',
      payload: 'Newly created anecdote from test',
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState.map((anecdote) => anecdote.content)).toContainEqual(
      action.payload
    )
  })
})
