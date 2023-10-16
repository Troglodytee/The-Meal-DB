import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Error403() {
    return (
        <>
            <Header/>
            <main>
                <section>
                    <h1>Erreur 403</h1>
                    <p className='center-h'>Vous devez être connecté pour voir cette page.</p>
                    <p className='center-h'>Allez à la <Link to='/login' className='txt-primary'>page de connexion</Link></p>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Error403;