import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// For React Redux
import { Provider } from 'react-redux'
import store from './store'

// For React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext'
const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <NotificationContextProvider>
        <App />
      </NotificationContextProvider>
    </QueryClientProvider>
  </Provider>
)
