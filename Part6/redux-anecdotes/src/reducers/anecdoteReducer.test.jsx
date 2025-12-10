import deepFreeze from 'deep-freeze'
import { describe, expect, test } from 'vitest'
import anecdoteReducer from './anecdoteReducer'

describe('anecdote reducer', () => {
  test('vote increases the vote', () => {
    const action = {
      type: 'VOTE',
      payload: {
        id: 1,
      },
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

  test('returns new state with action NEW_ANECDOTE', () => {
    const state = []
    const action = {
      type: 'NEW_ANECDOTE',
      payload: {
        content: 'Newly created anecdote from test',
        id: 3,
        votes: 0,
      },
    }

    deepFreeze(state)
    const newState = anecdoteReducer(state, action)
    expect(newState).toContainEqual(action.payload)
  })
})
