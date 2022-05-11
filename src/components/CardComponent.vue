<template>
  
    <div class="card">

        <img class="cover_img img-fluid" :src="movie.cover_path" :alt="movie.original_title"> 

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
    }

}
</script>

<style lang="scss">

    .card {
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
            color:white;
        }

        &:hover .info {
            display: block;
        }
    }

</style>