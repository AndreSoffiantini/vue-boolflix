<template>
  
    <div class="movies_section">

        <h2 class="text-center py-2">{{title}}</h2>

        <div class="row gy-4">

            <div class="col-3" v-for="movie in movies" :key="movie.id">

                <MovieCard :movie ='movie'/>

            </div>

        </div>

    </div>

</template>

<script>

import MovieCard from "@/components/CardComponent.vue";

export default {

    name:'MoviesSectionComponent',
    props: {
        title: String,
        movies: Array
    },
    components: {
        MovieCard
    }

}
</script>

<style lang="scss">

        h2 {
          margin: auto;
        }

        .col {
          display: flex;
          align-items: center;
        }

</style>