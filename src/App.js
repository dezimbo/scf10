import './App.css';
import { useRoutes } from './components/routes';
import { AuthContext } from './context/AuthContext';
import { useAuth } from './hooks/Auth.hook';
import { BrowserRouter } from 'react-router-dom';

function App() {
  const { login, logout, token, userId, isReady } = useAuth()
  const isLogin = !!token
  const routes = useRoutes(isLogin)
  return (
    <BrowserRouter>
    <AuthContext.Provider value={{ login, logout, token, userId, isReady, isLogin}}>
      <>
        
          {routes}
        
        
      </>
    </AuthContext.Provider>
    </BrowserRouter>
  );
}

export default App;
