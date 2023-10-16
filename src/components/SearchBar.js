import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import SearchIcon from '../img/search.svg'

function SearchBar({value, setLoad}) {
    const navigate = useNavigate();
    const [search, setSearch] = useState(value ? value : '');
    const handleChange = (e) => setSearch(e.target.value);
    const handleSearch = (e) => {
        if (e.type === 'click' || (e.type === 'keydown' && e.code === 'Enter')) {
            setLoad(false);
            if (search === '') {navigate('/');}
            else {navigate('/search/'+search);}
        }
    }
    return (
        <div className='row center-v center-h searchbar'>
            <input type='text' placeholder='Rechercher un plat...' value={search} onChange={handleChange} onKeyDown={handleSearch}/>
            <img src={SearchIcon} alt='Rechercher' onClick={handleSearch}/>
        </div>
    )
}

export default SearchBar