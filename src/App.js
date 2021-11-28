import './App.css';
import { useEffect, useState } from 'react';
import { Link, Outlet, useNavigate } from "react-router-dom";

import getToken from './api/token';
import getUserInfo from './api/user_info';

function App() {
  let navigate = useNavigate()
  const [loggedUser, setLoggedUser] = useState('')

  useEffect(()=>{
    const token = getToken()
    if(token == null){
      navigate('/login')
    }
    setLoggedUser(getUserInfo())
  }, [navigate])

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <div className="container">
        <nav className="navbar-container">
          <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
            <Link to="/" className="link"> Cedro </Link>
          </div>
          <div>
            <Link to="/projects" className="link"> Projetos </Link>
            <Link to="/forms" className="link"> Forms</Link>
            <Link to="/users" className="link"> Users </Link>
            <Link to="/questions" className="link"> Questions </Link>
          </div>
          <div style={{ height: "100%", display: "flex", alignItems: "center" }}>
            <Link to={`/users/${loggedUser.userID}`} className="link"> {loggedUser.name} </Link>
            <Link to="/login" className="link" onClick={handleLogout}> Logout </Link>
          </div>
        </nav>
      </div>

      <Outlet />
    </div>
  );
}

export default App;
