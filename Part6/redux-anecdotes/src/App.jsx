import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  const vote = (id) => {
    console.log('vote', id)
    return {
      type: 'VOTE',
      payload: { id },
    }
  }

  const getId = () => (100000 * Math.random()).toFixed(0)

  const addAnecdote = (event) => {
    event.preventDefault()
    console.log('create')
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch({
      type: 'NEW_ANECDOTE',
      payload: {
        content,
        votes: 0,
        id: getId(),
      },
    })
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .sort(
          (firstAnecdote, secondAnecdote) =>
            secondAnecdote.votes - firstAnecdote.votes
        )
        .map((anecdote) => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
            </div>
          </div>
        ))}
      <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default App
