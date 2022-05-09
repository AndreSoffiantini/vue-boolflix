<template>
  <div id="app">
    
    <!-- <SiteHeader/> -->

    <header>

        <h1>BOOLFIX</h1>

        
        <form @submit.prevent="filterFilms">
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

          <li v-for="film in filtered_films" :key="film.id">{{film.title}} / {{film.original_title}} / {{film.original_language}} / {{film.vote_average}}</li>

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
      api_url: "https://api.themoviedb.org/3/search/movie?api_key=041d7f18aab0e82c43022e918273c2dd&query=ritorno+al+futuro",
      films: null,
      filtered_films: null,
      searchText: null,
      error: null
    }   
  },
  methods: {

      filterFilms() {

        //console.log(this.searchText);

        if(this.searchText) {
          this.filtered_films = this.films.filter(film => film.title.toLowerCase().includes(this.searchText.toLowerCase()));
          //console.log(this.filtered_films);
        }       

      },

      callApi() {
          axios
              .get(this.api_url)
              .then((response) => {
                  //console.log(response);
                  this.films = response.data.results;
                  //console.log(this.films);
              })
              .catch((error) => {
                  console.error();
                  this.error = `Sorry, there is a problem! ${error}`;
              });
      },
  },
  mounted() {
      this.callApi();
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
        height: 92vh;
}

form>* {
        padding: 0.2rem;
    }

    input {
        margin: 0 0.5rem;
    }

</style>
