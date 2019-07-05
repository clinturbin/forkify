import Search from './models/Search';

/* 
    Global State of the App
    - Search object
    - Current recipe object
    - Shopping List object
    - Liked recipes
*/

const state = {};

const controlSearch = async () => {
    // 1) Get the query from the view
    const query = 'pizza'; //ToDo

    if(query) {
        // 2) New search object and add it to state
        state.search = new Search(query);

        // 3) Prepare UI for results

        // 4) Search for recipes
        await state.search.getResults();

        // 5) Render results on UI
        console.log(state.search.result);
    }
};

document.querySelector('.searhc').addEventListener('submit', event => {
    event.preventDefault();
    controlSearch();
});