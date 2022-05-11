<template>
  <div id="app">
    
    <!-- <SiteHeader/> -->

    <header class="px-2">

        <h1 class="m-0">BOOLFIX</h1>

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
        
        <div class="container">

          <MoviesSection title="FILMS" :movies='films'/>

          <MoviesSection title="TV SERIES" :movies='series'/>          

        </div>

    </main>

  </div>
</template>

<script>
import axios from "axios";
//import SiteHeader from "@/components/HeaderComponent.vue";
//import SiteMain from "@/components/MainComponent.vue";
import MoviesSection from "@/components/MoviesSectionComponent.vue";
//import MovieCard from "@/components/CardComponent.vue";

export default {
  name: 'App',
  components: {
    //SiteHeader,
    //SiteMain,
    MoviesSection,
    //MovieCard
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
                    film.cover_path = "https://image.tmdb.org/t/p/" + "w300" + film.poster_path;
                    film.vote_stars = Math.ceil(film.vote_average/2);       
                  });
                  
                  const images = document.querySelectorAll('.cover_img');
                  const defaultImageURL = 'https://foxi.ro/assets/images/no-image.svg';
                  images.forEach(image => {
                    image.addEventListener('error', function handleEmptyImage() {
                      image.src = defaultImageURL;
                    })
                  })

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
                    serie.cover_path = "https://image.tmdb.org/t/p/" + "w342" + serie.poster_path;
                    serie.vote_stars = Math.ceil(serie.vote_average/2);       
                  }); 
              })
              .catch((error) => {
                  console.error();
                  this.errorsArray.push(error);
          });
      }
  },

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

        /* h2 {
          margin: auto;
        }

        .col {
          display: flex;
          align-items: center;
        } */
}

/* .card {
  position: relative;
  cursor: pointer;
  height: 420px;
  overflow-y: hidden;
  font-size: 0.8rem;

  &:hover img {
    opacity: 0.7;
    filter: brightness(0.3);
  }

  .info {
    display: none;
    position: absolute;
    z-index: 2;
    top: 0;
    color: white;
  }

  &:hover .info {
    display: block;
  }
} */

form>* {
  padding: 0.2rem;
}

input {
  margin: 0 0.5rem;
}


</style>
