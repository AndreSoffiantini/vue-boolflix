<template>
  
    <div class="movie_card d-flex">

        <img class="cover_img" :src="movie.poster_path ? movie.cover_path : placeholder_image" :alt="movie.original_title"> 

        <div class="info p-2">

            <div class="title">
                <strong>Titolo: </strong> {{movie.title}} 
            </div>

            <div class="original_title">
                <strong>Titolo originale: </strong> {{movie.original_title}}
            </div>

            <div class="vote_stars">
                <strong>Voto: </strong>
                <font-awesome-icon v-for="index in movie.vote_stars" :key="'film_solid'+index" icon="fa-solid fa-star" />
                <font-awesome-icon v-for="index in 5-movie.vote_stars" :key="'film_regular'+index" icon="fa-regular fa-star" />
            </div>

            <div class="original_language">
                <strong>Lingua originale: </strong> <lang-flag :iso="movie.original_language" />
            </div>

            <!-- <div class="cast">
                <strong>Cast: </strong> <span v-for="(actor, index) in cast" :key="actor.name" v-show="index < 5">{{actor.name}} </span>
            </div> -->

            <div class="overview">
                <strong>Overview: </strong>
                <p>{{movie.overview}}</p> 
            </div>
                
        </div>
              
    </div>

</template>

<script>
export default {

    name: 'CardComponent',
    props: {
        movie: Object
    },
    data() {
        return {
            placeholder_image: 'https://www.altavod.com/assets/images/poster-placeholder.png'
        }
    }

}
</script>

<style lang="scss">

    .movie_card {
        position: relative;
        cursor: pointer;
        height: 420px;
        overflow: hidden;
        font-size: 0.8rem;
        max-width: 300px;

        &:hover img {
            opacity: 0.7;
            filter: brightness(0.3);
        }

        .info {
            display: none;
            position: absolute;
            z-index: 2;
            top: 0;
            color:white;
        }

        &:hover .info {
            display: block;
        }
    }

</style>