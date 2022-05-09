<template>
  
    <form @submit.prevent="$emit('formSubmit')">
        <input 
            type="search"
            placeholder="Search films"
            :value="searchText"
            @input="$emit('input', $event.target.value)"
            @keyup="$emit('formSubmit', searchText)" 
        />

        <button
            type="submit"
            :disabled="searchText < 1"
        >
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        Search
        </button>
    </form>

</template>

<script>
export default {
    name: 'SearchboxComponent'

}
</script>

<style lang="scss" scoped>

    form>* {
        padding: 0.2rem;
    }

    input {
        margin: 0 0.5rem;
    }

</style>