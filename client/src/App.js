import React from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import {useRoutes} from "./routes";
import {useAuth} from './hooks/auth.hook'
import {AuthContext} from './context/AuthContext';
import {Navbar} from './components/Navbar';
import "materialize-css";
import {Preloader} from './components/Preloader'


function App() {
  const {login,logout,token,userId,ready} =useAuth();
  const isAuthenticated = !!token;
  const routers = useRoutes(isAuthenticated);
  if(!ready){
    return <Preloader />
  }
  return (
    <AuthContext.Provider value={{
      login,logout,token,userId,isAuthenticated,
    }}>
      <Router>
        {isAuthenticated && <Navbar/>}
      <div className="container">
        {routers}
      </div>
      </Router>
     </AuthContext.Provider> 
  );
}

export default App;
