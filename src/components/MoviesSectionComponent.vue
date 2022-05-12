<template>
  
    <div class="movies_section py-3">

        <h2 class="text-center py-2">{{title}}</h2>

        <div class="row gy-4">

            <div class="col d-flex flex-direction-column justify-content-center" v-for="(movie,index) in movies" :key="movie.id">

                <MovieCard :movie ='movie' :cast='casts[index]'/>

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
        movies: Array,
        casts: Array
    },
    components: {
        MovieCard
    }

}
</script>

<style lang="scss">

        h2 {
          margin: 1rem auto;
        }

</style>