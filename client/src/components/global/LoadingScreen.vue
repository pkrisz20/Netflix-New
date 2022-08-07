<template>
    <div class="loading">
        <div class="loading__box">
            <img class="loading__box-spinner" alt="spinner" src="@/assets/icons/spinner.gif">
            <h2 class="loading__box-text">Loading...</h2>
        </div>
    </div>
</template>

<script>
    export default {
        name: "LoadingScreen",
        mounted() {
            document.body.style.overflowY = 'hidden';
        },
        beforeDestroy() {
            document.body.style.overflowY = 'scroll';
        }
    }
</script>

<style lang="scss" scoped>
.loading {
    background-color: $c-dark-theme;
    position: fixed;
    z-index: 100;
    width: 100vw;
    height: 100vh;
    @include flexCenter();

    &__box {
        @include flexCenter();
        flex-direction: column;

        &-text {
            color: $c-white;
            letter-spacing: 2px;
        }
    }
}

</style>