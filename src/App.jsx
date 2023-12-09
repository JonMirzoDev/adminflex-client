import { BrowserRouter } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from 'react-query'
import AuthProvider from './components/AuthProvider'
import { Toaster } from 'react-hot-toast'
const queryClient = new QueryClient()

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider />
        <Toaster position='top-right' />
      </QueryClientProvider>
    </BrowserRouter>
  )
}

export default App
