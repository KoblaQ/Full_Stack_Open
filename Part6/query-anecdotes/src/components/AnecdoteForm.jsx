import { createAnecdote } from '../requests'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import NotificationContext from './NotificationContext'
import { useContext } from 'react'

const AnecdoteForm = () => {
  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      const anecdotes = queryClient.getQueryData(['anecdotes'])
      queryClient.setQueryData(['anecdotes'], anecdotes.concat(newAnecdote))
    },
  })

  const { notificationDispatch } = useContext(NotificationContext)

  const onCreate = (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    // console.log('new anecdote')
    newAnecdoteMutation.mutate({ content, votes: 0 })
    notificationDispatch({
      type: 'CREATE',
      payload: content,
    })
    setTimeout(() => {
      notificationDispatch({ type: 'RESET' })
    }, 5000)
  }

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
