import { useDispatch, useSelector } from 'react-redux'
import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'

const App = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector((state) => state)

  const vote = (id) => {
    // console.log('vote', id)
    dispatch(addVote(id))
  }

  // const addAnecdote = (event) => {
  //   event.preventDefault()
  //   // console.log('create')
  //   const content = event.target.anecdote.value
  //   event.target.anecdote.value = ''

  //   dispatch(createAnecdote(content))
  // }

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
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
      <AnecdoteForm />
    </div>
  )
}

export default App
