import React from 'react'
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Error404() {
  return (
    <>
        <Header/>
        <main>
            <section>
              <h1>Erreur 404</h1>
              <p className='center-h'>Retourner à l'<Link to='/' className='txt-primary'>accueil</Link></p>
            </section>
        </main>
        <Footer/>
    </>
  )
}

export default Error404