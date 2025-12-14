import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import App from './App.jsx'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')).render(
  // wrap the App in the QueryClientProvider to make it accessible to everything
  <QueryClientProvider client={queryClient}>
    <App />
  </QueryClientProvider>
)
