import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'

// For React Redux
import { Provider } from 'react-redux'
import store from './store'

// For React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { NotificationContextProvider } from './components/NotificationContext'
import { UserContextProvider } from './components/UserContext'

import { BrowserRouter as Router } from 'react-router-dom'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
      <UserContextProvider>
        <NotificationContextProvider>
          <Router>
            <App />
          </Router>
        </NotificationContextProvider>
      </UserContextProvider>
    </QueryClientProvider>
  </Provider>
)
