<template>
  
    <header>

        <h1>BOOLFIX</h1>

        <SearchBox/>

    </header>

</template>

<script>
import SearchBox from "@/components/SearchboxComponent.vue"

export default {
    name: 'HeaderComponent',
    components: {
        SearchBox
    }
}
</script>

<style lang="scss" scoped>

    header {
        background-color: black;
        color: red;
        height: 8vh;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0.5rem;
    }

</style>