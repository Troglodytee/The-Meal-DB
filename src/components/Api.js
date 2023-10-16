import axios from 'axios';

class Api {
    static URL = 'https://www.themealdb.com/api/json/v1/1/';

    static getSearchResults(search, func, confirm = null) {
        axios.get(`${Api.URL}search.php?s=${search}`)
        .then((response) => {
            response.data.meals == null ? func([]) : func(response.data.meals);
            if (confirm) {confirm(true);}
        });
    }

    static getById(id, func, confirm = null) {
        axios.get(`${Api.URL}lookup.php?i=${id}`)
        .then((response) => {
            response.data.meals == null ? func(null) : func(response.data.meals[0]);
            if (confirm) {confirm(true);}
        });
    }

    static getRandoms(n, func, confirm = null) {
        const get = (r = []) => {
            axios.get(`${Api.URL}random.php`)
            .then((response) => {
                let found = false;
                for (let i = 0; i < r.length; i++) {
                    if (r[i].idMeal === response.data.meals[0].idMeal) {
                        found = true;
                        break;
                    }
                }
                if (!found) {r.push(response.data.meals[0]);}
                if (r.length === n) {
                    func(r);
                    if (confirm) {confirm(true);}
                }
                else {get(r);}
            });
        }
        get();
    }

    static getListByIDs(l, func, confirm = null) {
        const get = (i = 0, r = []) => {
            axios.get(`${Api.URL}lookup.php?i=${l[i]}`)
            .then((response) => {
                if (response.data.meals) {r.push(response.data.meals[0]);}
                if (i === r.length) {
                    func(r);
                    if (confirm) {confirm(true);}
                }
                else {get(i+1, r);}
            });
        }
        get();
    }

    static getCategoryList(func, confirm = null) {
        axios.get(`${Api.URL}list.php?c=list`)
        .then((response) => {
            if (response.data.meals) {
                let r = [];
                for (let i of response.data.meals) {r.push(i.strCategory);}
                func(r);
            }
            else {func([]);}
            if (confirm) {confirm(true);}
        });
    }

    static getAreaList(func, confirm = null) {
        axios.get(`${Api.URL}list.php?a=list`)
        .then((response) => {
            if (response.data.meals) {
                let r = [];
                for (let i of response.data.meals) {r.push(i.strArea);}
                func(r);
            }
            else {func([]);}
            if (confirm) {confirm(true);}
        });
    }
};

export default Api;