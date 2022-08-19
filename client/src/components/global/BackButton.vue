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
    top: 95px;
    left: 20px;
    z-index: 8;
    cursor: pointer;
    background-color: $c-error2;
    padding: 10px;
    border-radius: 25%;
    transition: transform .3s ease;

    .icon {
        font-size: 30px;
        color: $c-white;
    }

    &:hover {
        transform: translateX(-5px);
    }
}
</style>