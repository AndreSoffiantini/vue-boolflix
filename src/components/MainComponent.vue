<template>
  
    <main>
        
        <div class="container">

          <MoviesSection v-for="(result,index) in results[0]" :key="'result' + index" :title='result.title' :movies='result.result' :casts='results[1]'/>        

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
    computed: {
        results() {

            return [state.query_results, state.casts_results]

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