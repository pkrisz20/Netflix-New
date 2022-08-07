<template>
    <div @click="goBack()" class="back">
        <i class="icon far fa-arrow-left"></i>
    </div>
</template>

<script>
    export default {
        name: "BackButton",
        methods: {
            goBack() {
                this.$router.go(-1);
            }
        }
    }
</script>

<style lang="scss" scoped>
.back {
    position: fixed;
    top: 90px;
    left: 20px;
    z-index: 8;
    cursor: pointer;

    .icon {
        font-size: 35px;
        color: $c-white;
    }
}
</style>