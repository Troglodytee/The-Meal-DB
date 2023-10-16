import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../components/Header';
import Footer from '../components/Footer';

function Login() {
    const navigate = useNavigate();
    const [valid, setValid] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const handleChangeEmail = (e) => setEmail(e.target.value);
    const handleChangePassword = (e) => setPassword(e.target.value);
    useEffect(() => {
        setValid(false)
        let a = email.split("@");
        if (a.length === 2 && a[0].length > 0 && a[1].length > 0) {
            let domain = a[1].split(".");
            if (domain.length === 2 && domain[0].length > 0 && domain[1].length > 0 && password.length > 0) {setValid(true);}
        }
    }, [email, password]);
    const handleSubmit = (e) => {
        e.preventDefault();
        localStorage.setItem('token', 'test');
        navigate('/');
    }
    let submit;
    if (valid) {submit = <input type='submit' value='Se connecter' onClick={handleSubmit}/>;}
    else {submit = <input type='submit' value='Se connecter' onClick={handleSubmit} disabled/>;}
    return (
        <>
            <Header/>
            <main>
                <section>
                    <form>
                        <fieldset className='column'>
                            <legend>Se connecter</legend>
                            <label htmlFor='email'>Email&nbsp;:</label>
                            <input id='email' name='email' type='email' onChange={handleChangeEmail} placeholder='example@domaine.com'/>
                            <label htmlFor='password'>Mot de passe&nbsp;:</label>
                            <input id='password' name='password' type='password' onChange={handleChangePassword} placeholder='Mot de passe'/>
                            {submit}
                        </fieldset>
                    </form>
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Login;