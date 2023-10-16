import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Api from '../components/Api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SearchBar from '../components/SearchBar';
import MealList from '../components/MealList';
import Loading from '../components/Loading';

function Home() {
    const params = useParams();
    const [meals, setMeals] = useState([]);
    const [load, setLoad] = useState(false);
    useEffect(() => {
        let func;
        if (params.search) {func = async () => Api.getSearchResults(params.search, setMeals, setLoad);}
        else {func = async () => Api.getRandoms(25, setMeals, setLoad);}
        func();
    }, [params]);
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
                    <SearchBar value={params.search ?? params.search} setLoad={setLoad}/>
                    {content}
                </section>
            </main>
            <Footer/>
        </>
    );
}

export default Home;