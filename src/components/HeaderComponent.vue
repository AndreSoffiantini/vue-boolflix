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
            API_PATH: 'https://api.themoviedb.org/3/search/',
            API_KEY: '041d7f18aab0e82c43022e918273c2dd',
            sections_titles: ["FILMS","TV SERIES"],
            searchText: null,
            API_calls_results: [],
            errorsArray: []
        }   
    },
    methods: {

        callApis(apis_urls_array, titles_array) {

            apis_urls_array.forEach((url,index) => {
                axios
                    .get(url)
                    .then((response) => {
                        //console.log(response);
                        response.data.results.forEach(element => {
                            element.cover_path = "https://image.tmdb.org/t/p/" + "w300" + element.poster_path;
                            element.vote_stars = Math.ceil(element.vote_average/2);       
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
            state.results = this.API_calls_results;

        },

        searchMovies(){
            if(this.searchText) {
                
                //console.log(this.searchText);

                this.API_calls_results = [];

                const films_api_url = this.API_PATH + "movie?" + "api_key=" + this.API_KEY + "&query=" + this.searchText;
                const series_api_url = this.API_PATH + "tv?" + "api_key="  + this.API_KEY + "&query=" + this.searchText;

                const api_urls_array = [films_api_url, series_api_url];

                this.callApis(api_urls_array, this.sections_titles);

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