<template>
  <div id="app">
    
    <!-- <SiteHeader/> -->

    <header>

        <h1>BOOLFIX</h1>

        
        <form @submit.prevent="searchFilms">
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
        
        <ul>

          <li><h2>FILMS</h2></li>
          <li v-for="film in films" :key="film.id">{{film.title}} / {{film.original_title}} / {{film.vote_average}} / <lang-flag :iso="film.original_language" /> </li>
          <li><h2>TV SERIES</h2></li>
          <li v-for="serie in series" :key="serie.id">{{serie.name}} / {{serie.original_name}} / {{serie.vote_average}} / <lang-flag :iso="serie.original_language" /> </li>

        </ul>

    </main>

  </div>
</template>

<script>
import axios from "axios";
//import SiteHeader from "@/components/HeaderComponent.vue";
//import SiteMain from "@/components/MainComponent.vue";


export default {
  name: 'App',
  components: {
    //SiteHeader,
    //SiteMain
  },
  data() {
    return {
      films: null,
      series: null,
      searchText: null,
      error: null
    }   
  },
  methods: {

      searchFilms() {

        if(this.searchText) {

          let films_api_url = "https://api.themoviedb.org/3/search/movie?api_key=041d7f18aab0e82c43022e918273c2dd&query=" + this.searchText;
          let series_api_url = "https://api.themoviedb.org/3/search/tv?api_key=041d7f18aab0e82c43022e918273c2dd&query=" + this.searchText;

          this.callApis(films_api_url, series_api_url);

        }

      },

      callApis(film_url, series_url) {   
          
          // Lista di film
          axios
              .get(film_url)
              .then((response) => {
                  //console.log(response);
                  this.films = response.data.results;
                  //console.log(this.films);
                  
              })
              .catch((error) => {
                  console.error();
                  this.error = `Sorry, there is a problem! ${error}`;
              });

          // Lista di serie tv
          axios
              .get(series_url)
              .then((response) => {
                  //console.log(response);
                  this.series = response.data.results;
                  //console.log(this.films);
                  
              })
              .catch((error) => {
                  console.error();
                  this.error = `Sorry, there is a problem! ${error}`;
              });
      },
  }

}
</script>

<style lang="scss">

@import '@/assets/scss/common.scss';

header {
        background-color: black;
        color: red;
        height: 8vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
    }

main {
        background-color: rgb(80, 80, 80);
        min-height: 92vh;
}

form>* {
  padding: 0.2rem;
}

input {
  margin: 0 0.5rem;
}


</style>
