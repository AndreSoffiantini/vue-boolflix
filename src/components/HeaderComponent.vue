<template>
  
    <header>

        <h1>BOOLFIX</h1>

        <form action="">
            <input type="search" >
        </form>

    </header>

</template>

<script>
export default {
    name: 'HeaderComponent'

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