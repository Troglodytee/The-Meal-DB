import React from 'react';
import MealCard from '../components/MealCard';

function MealList({owner, meals}) {
  return (
    <div className='row center-h list'>
      {meals.map((meal) => <MealCard key={meal.mealId} owner={owner} data={meal}/>)}
    </div>
  );
}

export default MealList;