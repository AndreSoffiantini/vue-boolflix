<template>

    <header class="px-2">

        <h1 class="m-0">BOOLFIX</h1>

        <SearchBox v-model="searchText" @formSubmit="searchMovies" />

    </header>

</template>

<script>
import axios from "axios";
import SearchBox from "@/components/SearchboxComponent.vue"
import state from "@/state.js";

export default {
    name: 'HeaderComponent',
    components: {
        SearchBox
    },
    data() {
        return {
            API_KEY: '041d7f18aab0e82c43022e918273c2dd',
            API_PATH: 'https://api.themoviedb.org/3/',
            API_SEARCH: 'https://api.themoviedb.org/3/search/',
            sections_titles: ["FILMS","TV SERIES"],
            searchText: null,
            API_calls_results: [],
            API_casts_results: [],
            errorsArray: []
        }   
    },
    methods: {

        callApi(api_urls_array, titles_array) {

            api_urls_array.forEach((url,index) => {
                axios
                    .get(url)
                    .then((response) => {
                        //console.log(response);
                        response.data.results.forEach(movie => {
                            movie.cover_path = "https://image.tmdb.org/t/p/" + "w342" + movie.poster_path;
                            movie.vote_stars = Math.ceil(movie.vote_average/2);
                            
                            if (index === 0) {

                              //console.log(this.API_PATH + 'movie/' + movie.id + "/credits?" + "api_key=" + this.API_KEY); 

                              axios
                                .get(this.API_PATH + 'movie/' + movie.id + "/credits?" + "api_key=" + this.API_KEY)
                                .then((credits_response) => {
                                    //console.log(credits_response);

                                    const cast_result = {
                                        "movie_id": movie.id,
                                        "cast": credits_response.data.cast
                                    }

                                    //console.log(object_result);
                                    this.API_casts_results.push(cast_result);
                                })

                            } else if (index === 1) {

                                axios
                                .get(this.API_PATH + 'tv/' + movie.id + "/credits?" + "api_key=" + this.API_KEY)
                                .then((credits_response) => {
                                    //console.log(credits_response);
                                    movie.cast = credits_response.data.cast;
                                    //console.log(movie.cast);

                                    const cast_result = {
                                        "serie_id": movie.id,
                                        "cast": credits_response.data.cast
                                    }

                                    //console.log(object_result);
                                    this.API_casts_results.push(cast_result);
                                })  
                            }

                        });

                        //console.log(response.data.results);
                        const object_result = {
                            "title": titles_array[index],
                            "result": response.data.results 
                        }

                        //console.log(object_result);
                        this.API_calls_results.push(object_result);

                    })
                    .catch((error) => {
                        console.error();
                        this.errorsArray.push(error);
                    })
            })

            //console.log(this.API_calls_results);
            state.query_results = this.API_calls_results;
            state.casts_results = this.API_casts_results;

        },

        searchMovies(){
            if(this.searchText) {
                
                //console.log(this.searchText);

                this.API_calls_results = [];
                this.API_casts_results = [];

                const key_end_url = "api_key=" + this.API_KEY + "&query=" + this.searchText;

                const search_films_url = this.API_SEARCH + "movie?" + key_end_url;
                const search_series_url = this.API_SEARCH + "tv?" + key_end_url;

                const api_urls_array = [search_films_url, search_series_url];

                this.callApi(api_urls_array, this.sections_titles);

            }
        }

    }
}  
</script>

<style lang="scss" scoped>

   header {
        background-color: black;
        color: red;
        height: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

</style>