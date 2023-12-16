import Header from './components/Header';
import { Outlet }  from 'react-router-dom';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
import { AuthContextProvider } from './context/AuthContext';


function App() {
  const queryClient = new QueryClient();

  return(
    <QueryClientProvider client = {queryClient}>
      <AuthContextProvider>
        <Header />
        <Outlet />
      </AuthContextProvider>
    </QueryClientProvider>
  )
}

export default App;
