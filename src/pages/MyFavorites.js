import React, { useState, useEffect } from 'react';
import Api from '../components/Api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import MealList from '../components/MealList';
import Loading from '../components/Loading';
import Error403 from './Error403';

function MyFavorites() {
    const [meals, setMeals] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        if (localStorage.getItem('favorites')) {(async () => Api.getListByIDs(JSON.parse(localStorage.getItem('favorites')), setMeals, setLoad))();}
        else {setLoad(true);}
    }, []);
    if (localStorage.getItem('token')) {
        let content;
        if (load) {
            if (meals.length === 0) {content = <p className='center-h'>Aucun résultat</p>;}
            else {content = <MealList owner={false} meals={meals}/>;}
        }
        else {content = <Loading/>}
        return (
            <>
                <Header/>
                <main>
                    <section>
                        {content}
                    </section>
                </main>
                <Footer/>
            </>
        );
    }
    else {return <Error403/>;}
}

export default MyFavorites;