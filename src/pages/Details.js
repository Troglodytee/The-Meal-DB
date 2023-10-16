import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Api from '../components/Api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Loading from '../components/Loading';
import Error404 from './Error404';
import StarFill from '../img/star-fill.svg';
import StarEmpty from '../img/star-empty.svg';
import PlaceHolder from '../img/placeholder.png';

function Details({owner}) {
  const navigate = useNavigate();
  const params = useParams();
  const [data, setData] = useState(null);
  const [load, setLoad] = useState(false);
  const [favorite, setFavorite] = useState(localStorage.getItem('favorites') ? JSON.parse(localStorage.getItem('favorites')).includes(params.id) : false);
  useEffect(() => {
    if (owner) {
      const recipes = JSON.parse(localStorage.getItem('recipes'));
      if (recipes && params.id < recipes.length) {setData(recipes[params.id]);}
      setLoad(true);
    }
    else {
      let func = async () => Api.getById(params.id, setData, setLoad);
      func();
    }
  }, [owner, params]);
  const handleFavorite = () => {
    if (data) {
      let l = localStorage.getItem('favorites');
      if (l) {
        l = JSON.parse(l);
        if (favorite && l.includes(data.idMeal)) {
          l.splice(l.indexOf(data.idMeal), 1);
          if (l.length === 0) {localStorage.removeItem('favorites');}
          else {localStorage.setItem('favorites', JSON.stringify(l));}
        }
        else if (!favorite && !l.includes(data.idMeal)) {
          l.push(data.idMeal);
          localStorage.setItem('favorites', JSON.stringify(l));
        }
      }
      else if (!favorite) {localStorage.setItem('favorites', JSON.stringify([data.idMeal]));}
    }
    setFavorite(!favorite);
  };
  const handleDelete = () => {
    let l = localStorage.getItem('recipes');
    if (l) {
      l = JSON.parse(l);
      if (data.idMeal < l.length) {l.splice(data.idMeal, 1);}
      if (l.length === 0) {localStorage.removeItem('recipes');}
      else {
        for (let i = data.idMeal; i < l.length; i++) {l[i].idMeal -= 1;}
        localStorage.setItem('recipes', JSON.stringify(l));
      }
    }
    navigate('/my-recipes');
  };
  let ingredients = [];
  if (data) {
    for (let i = 1; i <= 20; i++) {
      if (data['strIngredient'+i] === '' || data['strIngredient'+i] === null) {break;}
      else {ingredients.push([data['strIngredient'+i], data['strMeasure'+i]])}
    }
  }
  return load && data ? (
    <>
      <Header/>
      <main>
        <section className='column center-h'>
          {
            owner
            ? <div className='button button-danger' onClick={handleDelete}>Supprimer la recette</div>
            : null
          }
          <div className='row center-h'>
            <h1>{data.strMeal}</h1>
            {
              owner || !localStorage.getItem('token') ? null : (
                favorite
                ? <img className='star' src={StarFill} alt='Retirer des favoris' onClick={handleFavorite}/>
                : <img className='star' src={StarEmpty} alt='Mettre en favori' onClick={handleFavorite}/>
              )
            }
          </div>
          <img className='presentation-img' src={data.strMealThumb ? data.strMealThumb : PlaceHolder} alt={'Image de '+data.strMeal}/>
          <div className='row types'>
            <div className='bg-dark txt-light'>{data.strCategory}</div>
            <div className='bg-dark txt-light'>{data.strArea}</div>
          </div>
        </section>
        {
          ingredients.length === 0
          ? null
          : <section className='column center-h'>
            <h2>Ingrédients :</h2>
            <table>
              <thead>
                <tr>
                  <th>Ingrédient</th>
                  <th>Quantité</th>
                </tr>
              </thead>
              <tbody>
                {
                  ingredients.map((line, i) => (
                    <tr key={i} className={i%2 ? 'bg-lightgrey' : 'bg-light'}>
                      <td>{line[0]}</td>
                      <td>{line[1]}</td>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </section>
        }
        {
          data.strInstructions === ''
          ? null
          : <section>
            <h2>Recette :</h2>
            <p>{data.strInstructions}</p>
          </section>
        }
        {
          data.strSource === ''
          ? null
          : <section>
            <h2>Source :</h2>
            <p>{data.strSource}</p>
          </section>
        }
      </main>
      <Footer/>
    </>
  ) : load ? <Error404/> : (
    <>
      <Header/>
      <main>
        <section>
          <Loading/>
        </section>
      </main>
      <Footer/>
    </>
  );
}

export default Details;