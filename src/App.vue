<template>
  <div id="app">
    
    <!-- <SiteHeader/> -->

    <header class="px-2">

        <h1 class="m-0">BOOLFIX</h1>

        <form @submit.prevent="searchMovies">
          <input 
              type="search"
              placeholder="Search films"
              v-model="searchText"
          />
          <!-- @keyup="filterFilms" -->

          <button
              type="submit"
              :disabled="searchText < 1"
          >
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          Search
          </button>
          

        </form>

    </header>

    <!-- <SiteMain/> -->

    <main>
        
        <div class="container">

          <MoviesSection v-for="(result,index) in API_calls_results" :key="'result' + index" :title='result.title' :movies='result.result'/>        

        </div>

    </main>

  </div>
</template>

<script>
import axios from "axios";
//import SiteHeader from "@/components/HeaderComponent.vue";
//import SiteMain from "@/components/MainComponent.vue";
import MoviesSection from "@/components/MoviesSectionComponent.vue";

export default {
  name: 'App',
  components: {
    //SiteHeader,
    //SiteMain,
    MoviesSection
  },
  data() {
    return {
      API_KEY: '041d7f18aab0e82c43022e918273c2dd',
      API_calls_results: [],
      searchText: null,
      errorsArray: []
    }   
  },
  methods: {

      searchMovies() {

        if(this.searchText) {

          const films_api_url = "https://api.themoviedb.org/3/search/movie?api_key=" + this.API_KEY + "&query=" + this.searchText;
          const series_api_url = "https://api.themoviedb.org/3/search/tv?api_key="  + this.API_KEY + "&query=" + this.searchText;

          this.callApis([films_api_url, series_api_url], ["FILMS","TV SERIES"]);

        }

      },

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
                  this.API_calls_results.push(object_result);
              })
              .catch((error) => {
                  console.error();
                  this.errorsArray.push(error);
              })
        })
      }
                  
                  /* const images = document.querySelectorAll('.cover_img');
                  const defaultImageURL = 'https://foxi.ro/assets/images/no-image.svg';
                  images.forEach(image => {
                    image.addEventListener('error', function handleEmptyImage() {
                      image.src = defaultImageURL;
                    })
                  }) */
  }
}
</script>

<style lang="scss">

@import '@/assets/scss/common.scss';

header {
        background-color: black;
        color: red;
        height: 10vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

main {
        background-color: rgb(80, 80, 80);
        min-height: 90vh;
}

form>* {
  padding: 0.2rem;
}

input {
  margin: 0 0.5rem;
}


</style>
