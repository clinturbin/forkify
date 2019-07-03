// https://www.food2fork.com/api/search
// https://www.food2fork.com/api/get 


import Search from './models/Search';

const search = new Search('pizza');
console.log(search);
search.getResults();