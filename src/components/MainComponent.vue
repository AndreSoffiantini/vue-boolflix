<template>
  
    <main>
        
        <div class="container">

          <MoviesSection v-for="(result,index) in results" :key="'result' + index" :title='result.title' :movies='result.result'/>        

        </div>

    </main>

</template>

<script>
import state from "@/state.js";
import MoviesSection from '@/components/MoviesSectionComponent.vue';

export default {
    name: 'MainComponent',
    components: {
        MoviesSection
    },
    /* data() {
        return {
            results: []
        }
    }, */
    computed: {
        results() {

            return state.results

        }
    }
}
</script>

<style lang="scss" scoped>

    main {
        background-color: rgb(80, 80, 80);
        min-height: 90vh;
    }

</style>