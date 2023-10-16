import React from 'react';
import { Link } from 'react-router-dom';
import PlaceHolder from '../img/placeholder.png';

function MealCard({owner, data}) {
  return (
    <Link to={owner ? '/recipe/'+data.idMeal : '/details/'+data.idMeal}>
      <article className='column center-h'>
          <p>{data.strMeal}</p>
          <img src={data.strMealThumb ? data.strMealThumb : PlaceHolder} alt={'Image de '+data.strMeal}/>
          <div className='row types'>
            <div className='bg-dark txt-light'>{data.strCategory}</div>
            <div className='bg-dark txt-light'>{data.strArea}</div>
          </div>
      </article>
    </Link>
  );
}

export default MealCard;