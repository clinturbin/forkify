import Search from './models/Search';
import Recipe from './models/Recipe';
import * as searchView from './views/searchView';
import { elements, renderLoader, clearLoader } from './views/base';

/* 
    Global State of the App
    - Search object
    - Current recipe object
    - Shopping List object
    - Liked recipes
*/

const state = {};

/*
    SEARCH CONTROLLER
    -------------------------------
*/
const controlSearch = async () => {
    // 1) Get the query from the view
    const query = searchView.getInput();

    if(query) {
        // 2) New search object and add it to state
        state.search = new Search(query);

        // 3) Prepare UI for results
        searchView.clearInput();
        searchView.clearResults();
        renderLoader(elements.searchRes);

        try {
            // 4) Search for recipes
            await state.search.getResults();

            // 5) Render results on UI
            clearLoader();
            searchView.renderResults(state.search.result, 1);
        } catch (error) {
            alert('Something went wrong with the search...')
            clearLoader();
        }
        
    }
};

elements.searchForm.addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});

elements.searchResPages.addEventListener('click', event => {
    const btn = event.target.closest('.btn-inline');
    if (btn) {
        const goToPage = parseInt(btn.dataset.goto, 10);
        searchView.clearResults();
        searchView.renderResults(state.search.result, goToPage);
    }
});

/*
    RECIPE CONTROLLER
    -----------------------------
*/

const controlRecipe = async () => {
    // Get the ID from the URL
    const id = window.location.hash.replace('#', '');
    console.log(id);

    if (id) {
        // Prepare the UI for changes

        // Create new recipe object
        state.recipe = new Recipe(id);

        try {
            // Get recipe data and parse ingredients
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();

            // Caluclate servings and time
            state.recipe.calcTime();
            state.recipe.calcServings();

            // Render the recipe
            console.log(state.recipe);
        } catch (error) {
            alert('Error processing recipe');
        }
    }
};

['hashchange', 'load'].forEach(event => window.addEventListener(event, controlRecipe));