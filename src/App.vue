<template>
  <div id="app">
    
    <SiteHeader/>

    <SiteMain/>

  </div>
</template>

<script>
import axios from "axios";
import SiteHeader from "@/components/HeaderComponent.vue";
import SiteMain from "@/components/MainComponent.vue";


export default {
  name: 'App',
  components: {
    SiteHeader,
    SiteMain
  },
  data() {
    return {
      api_url: "https://api.themoviedb.org/3/search/movie?api_key=041d7f18aab0e82c43022e918273c2dd&query=ritorno+al+futuro",
      films: null,
      error: null
    }   
  },
  methods: {
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

</style>
