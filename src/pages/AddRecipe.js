import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Api from '../components/Api';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Error403 from './Error403';

function AddRecipe() {
    const navigate = useNavigate();
    const [valid, setValid] = useState(false);
    const [categories, setCategories] = useState([]);
    const [areas, setAreas] = useState([]);
    const [name, setName] = useState('');
    const [image, setImage] = useState('');
    const [category, setCategory] = useState('');
    const [area, setArea] = useState('');
    const [instructions, setInstructions] = useState('');
    const [source, setSource] = useState('');
    const [nIngredients, setNIngredients] = useState(1);
    const handleChangeName = (e) => setName(e.target.value);
    const handleChangeImage = (e) => setImage(e.target.value);
    const handleChangeCategory = (e) => setCategory(e.target.value);
    const handleChangeArea = (e) => setArea(e.target.value);
    const handleChangeInstructions = (e) => setInstructions(e.target.value);
    const handleChangeSource = (e) => setSource(e.target.value);
    const handleAddIngredient = (e) => {e.preventDefault(); setNIngredients(nIngredients+1);}
    const handleDelIngredient = (e) => {e.preventDefault(); setNIngredients(nIngredients-1);}
    useEffect(() => {(async () => Api.getCategoryList(setCategories))()}, []);
    useEffect(() => {(async () => Api.getAreaList(setAreas))()}, []);
    useEffect(() => {
        setValid(false)
        if (name.length > 0 && category !== '' && area !== '') {setValid(true);}
    }, [name, category, area]);
    const handleSubmit = (e) => {
        e.preventDefault();
        let l = [];
        if (localStorage.getItem('recipes')) {l = JSON.parse(localStorage.getItem('recipes'));}
        let data = {
            idMeal: l.length,
            strMeal: name,
            strMealThumb: image,
            strCategory: category,
            strArea: area,
            strInstructions: instructions,
            strSource: source,
        };
        let values = new FormData(document.querySelector('form'));
        values = [...values.entries()];
        for (let i of values) {
            if (i[0].startsWith('strIngredient')) {data[i[0]] = i[1];}
            else if (i[0].startsWith('strMeasure')) {data[i[0]] = i[1];}
        }
        for (let i = nIngredients+1; i <= 20; i++) {
            data['strIngredient'+i] = '';
            data['strMeasure'+i] = '';
        }
        l.push(data);
        localStorage.setItem('recipes', JSON.stringify(l));
        navigate('/my-recipes');
    }
    let ingredientRows = [];
    for (let i = 0; i < nIngredients; i++) {
        ingredientRows.push((
            <tr key={i} className={i%2 ? 'bg-lightgrey' : 'bg-light'}>
                <td><input name={'strIngredient'+(i+1)} type='text'></input></td>
                <td><input name={'strMeasure'+(i+1)} type='text'></input></td>
            </tr>
        ))
    }
    if (localStorage.getItem('token')) {
        let submit;
        if (valid) {submit = <input type='submit' value='Ajouter la recette' onClick={handleSubmit}/>;}
        else {submit = <input type='submit' value='Ajouter la recette' onClick={handleSubmit} disabled/>;}
        return (
            <>
                <Header/>
                    <main>
                        <section>
                            <form>
                                <fieldset className='column'>
                                    <legend>Ajouter une recette</legend>
                                    <label htmlFor='name'><span className='txt-danger'>*</span> Nom&nbsp;:</label>
                                    <input id='name' name='name' type='text' onChange={handleChangeName} placeholder='Nom de la recette'/>
                                    <label htmlFor='image'>Image&nbsp;:</label>
                                    <input id='image' name='image' type='url' placeholder="URL d'une image" onChange={handleChangeImage}/>
                                    <label htmlFor='category'><span className='txt-danger'>*</span> Catégorie&nbsp;:</label>
                                    <select id='category' name='category' onChange={handleChangeCategory}>
                                        <option key='0' value=''></option>
                                        {categories.map((category, i) => <option key={i+1} value={category}>{category}</option>)}
                                    </select>
                                    <label htmlFor='area'><span className='txt-danger'>*</span> Zone&nbsp;:</label>
                                    <select id='area' name='area' onChange={handleChangeArea}>
                                        <option key='0' value=''></option>
                                        {areas.map((area, i) => <option key={i+1} value={area}>{area}</option>)}
                                    </select>
                                    <table>
                                        <thead>
                                            <tr>
                                                <th>Ingrédient</th>
                                                <th>Quantité</th>
                                            </tr>
                                        </thead>
                                        <tbody>{ingredientRows}</tbody>
                                    </table>
                                    <div className='row center-h'>
                                        {nIngredients < 20 ? <button className='button button-primary' onClick={handleAddIngredient}>+</button> : null}
                                        {nIngredients > 0 ? <button className='button button-danger' onClick={handleDelIngredient}>-</button> : null}
                                    </div>
                                    <label htmlFor='instructions'>Intructions&nbsp;:</label>
                                    <textarea id='instructions' name='instructions' placeholder='Les instructions de la recette' rows='10' onChange={handleChangeInstructions}/>
                                    <label htmlFor='source'>Source&nbsp;:</label>
                                    <input id='source' name='source' type='url' placeholder='La source de la recette' onChange={handleChangeSource}/>
                                    {submit}
                                </fieldset>
                            </form>
                        </section>
                    </main>
                <Footer/>
            </>
        );
    }
    else {return <Error403/>;}
}

export default AddRecipe;