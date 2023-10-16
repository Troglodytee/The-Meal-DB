import React from 'react';
import { Link } from 'react-router-dom';
import Logo from '../img/logo.png';

function Header() {
  const handleDisconnect = () => localStorage.removeItem('token');
  return (
    <header className='row center-v'>
      <Link to='/'>
        <img src={Logo} alt='Logo'/>
      </Link>
      {
        localStorage.getItem('token')
        ? <nav className='row'>
          <Link to='/my-favorites'>Mes favoris</Link>
          <Link to='/my-recipes'>Mes recettes</Link>
          <Link to='/' onClick={handleDisconnect}>Se déconnecter</Link>
        </nav>
        : <Link to='/login'>Se connecter</Link>
      }
    </header>
  );
}

export default Header;