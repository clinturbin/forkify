import axios from 'axios';

export default class Search {
    constructor(query) {
        this.query = query;
    }

    async getResults() {
        const proxy = 'https://cors-anywhere.herokuapp.com/';
        const key = 'API_KEY_GOES_HERE';
        try {
            const res = await axios(`${proxy}https://www.food2fork.com/api/search?key=${key}&${this.query}`);
            this.result = res.data.recipes;
            // console.log(this.result);
        } catch (error) {
            console.log(error);
        }
    }
}