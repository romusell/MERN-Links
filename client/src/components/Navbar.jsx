import {NavLink,useHistory} from 'react-router-dom';
import {useContext} from 'react';
import {AuthContext} from '../context/AuthContext';

export const Navbar = () => {
    const history = useHistory();
    const auth = useContext(AuthContext);
    const handleLogout = (event) =>{
     event.preventDefault();
     auth.logout();
     history.push('/');
  }
    return <nav>
    <div className="nav-wrapper blue darken-1" style={{padding:'0 2rem'}}>
      <span className="brand-logo center">Скращение Ссылок</span>
      <ul id="nav-mobile" className="left hide-on-med-and-down">
        <li><NavLink to="/create">Создать</NavLink></li> 
        <li><NavLink to="/links">Ссылки</NavLink></li> 
        <li><a href="/" onClick={handleLogout}>Войти</a></li> 
      </ul>
    </div>
  </nav>
}