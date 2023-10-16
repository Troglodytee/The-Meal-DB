import * as React from 'react';
import * as ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import reportWebVitals from './reportWebVitals';
import Home from './pages/Home';
import Details from './pages/Details';
import Login from './pages/Login';
import MyFavorites from './pages/MyFavorites';
import MyRecipes from './pages/MyRecipes';
import AddRecipe from './pages/AddRecipe';
import Error404 from './pages/Error404';
import './css/main.css';

const router = createBrowserRouter([
  {
    path:    '/',
    element: <Home/>,
  },
  {
    path:    '/search/:search',
    element: <Home/>
  },
  {
    path:    '/details/:id',
    element: <Details owner={false}/>
  },
  {
    path:    '/login',
    element: <Login/>
  },
  {
    path:    '/my-favorites',
    element: <MyFavorites/>
  },
  {
    path:    '/my-recipes',
    element: <MyRecipes/>
  },
  {
    path:    '/add-recipe',
    element: <AddRecipe/>
  },
  {
    path:    '/recipe/:id',
    element: <Details owner={true}/>
  },
  {
    path:    '*',
    element: <Error404/>
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
