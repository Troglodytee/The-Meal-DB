import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealList from '../components/MealList';
import Loading from '../components/Loading';
import Error403 from './Error403';

function MyRecipes() {
    const [meals, setMeals] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('recipes')) {setMeals(JSON.parse(localStorage.getItem('recipes')));}
        setLoad(true);
    }, []);
    if (localStorage.getItem('token')) {
        let content;
        if (load) {
            if (meals.length === 0) {content = <p className='center-h'>Aucun résultat</p>;}
            else {content = <MealList owner={true} meals={meals}/>;}
        }
        else {content = <Loading/>}
        return (
            <>
                <Header/>
                <main>
                    <section>
                        <Link to='/add-recipe' className='button button-primary'>Ajouter une recette</Link>
                        {content}
                    </section>
                </main>
                <Footer/>
            </>
        );
    }
    else {return <Error403/>;}
}

export default MyRecipes;