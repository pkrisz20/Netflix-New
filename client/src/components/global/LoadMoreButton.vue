<template>
    <div>
        <button class="show-more" @click="$emit('showMore');" v-if="counter < listLength">Load more</button>
    </div>
</template>

<script>
    export default {
        name: "Loadmore",
        props: {
            counter: Number,
            listLength: Number,
        },
    }
</script>

<style lang="scss" scoped>
.show-more {
    background-color: $c-green-theme;
    padding: 10px 18px;
    cursor: pointer;
    color: $c-d;
    border: none;
    border-radius: 5px;
    font-family: $c-main-font;
    text-transform: uppercase;
    font-size: 16px;
    font-weight: 700;
    margin: 15px auto;
    transition: all .3s ease-in-out;
    
    &:hover {
        background-color: $c-red;
    }
}
</style>