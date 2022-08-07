<template>
    <div class="block_title">
        <h1 class="block_title-main">{{ title }}</h1>
    </div>
</template>

<script>
    export default {
        name: "BlockTitle",
        props: ['title'],
    }
</script>

<style lang="scss">
.block_title {
    height: auto;
    padding: 90px 15px 0;
    @include flexCenter();
    margin-bottom: 50px;

    &-main {
        position: relative;
        color: $c-d;
        margin: 0;
        font-size: 30px;

        @media #{$r-max-tablet} {
            font-size: 25px;
        }

        &::before {
            position: absolute;
            content: '';
            bottom: -15px;
            right: 50%;
            transform: translate(40%);
            width: 76px;
            height: 1px;
            background-color: $c-green-theme;
        }

        &::after {
            position: absolute;
            content: '';
            bottom: -20px;
            left: 50%;
            transform: translate(-40%);
            width: 76px;
            height: 1px;
            background-color: $c-green-theme;
        }
    }
}
</style>