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
          <li v-for="film in films" :key="film.id"> 
            <img :src="film.cover_path" :alt="film.original_title"> 
            {{film.title}} / 
            {{film.original_title}} /
            <font-awesome-icon v-for="index in film.vote_stars" :key="'film_solid'+index" icon="fa-solid fa-star" />
            <font-awesome-icon v-for="index in 5-film.vote_stars" :key="'film_regular'+index" icon="fa-regular fa-star" /> /
            <lang-flag :iso="film.original_language" /> 
          </li>

          <li><h2>TV SERIES</h2></li>
          <li v-for="serie in series" :key="serie.id"> 
            <img :src="serie.cover_path" :alt="serie.original_title"> 
            {{serie.cover_path}} {{serie.name}} / 
            {{serie.original_name}} / 
            <font-awesome-icon v-for="index in serie.vote_stars" :key="'serie_solid'+index" icon="fa-solid fa-star" />
            <font-awesome-icon v-for="index in 5-serie.vote_stars" :key="'serie_regular'+index" icon="fa-regular fa-star" /> /
            <lang-flag :iso="serie.original_language" /> 
          </li>

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
      errorsArray: []
    }   
  },
  methods: {

      searchFilms() {

        if(this.searchText) {

          const films_api_url = "https://api.themoviedb.org/3/search/movie?api_key=041d7f18aab0e82c43022e918273c2dd&query=" + this.searchText;
          const series_api_url = "https://api.themoviedb.org/3/search/tv?api_key=041d7f18aab0e82c43022e918273c2dd&query=" + this.searchText;

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
                  this.films.forEach(film => {
                    film.cover_path = "https://image.tmdb.org/t/p/" + "w300" + film.backdrop_path;
                    film.vote_stars = Math.ceil(film.vote_average/2);       
                  });                  
              })
              .catch((error) => {
                  console.error();
                  this.errorsArray.push(error);
              });

          // Lista di serie tv
          axios
              .get(series_url)
              .then((response) => {
                  //console.log(response);
                  this.series = response.data.results;
                  //console.log(this.series);
                  this.series.forEach(serie => {
                    serie.cover_path = "https://image.tmdb.org/t/p/" + "w300" + serie.backdrop_path;
                    serie.vote_stars = Math.ceil(serie.vote_average/2);       
                  }); 
              })
              .catch((error) => {
                  console.error();
                  this.errorsArray.push(error);
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
