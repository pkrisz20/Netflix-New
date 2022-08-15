<template>
    <div class="cookies">
        <div v-if="!this.isAccepted" class="cookies-container">
            <p class="cookies-container-text">If you scroll further, then you accept all cookies! <i class="fas fa-cookie-bite"></i></p>
            <button @click="accept" class="cookies-container-btn">OK</button>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Cookies",
        data() {
            return {
                propertyName: "accepted_cookies",
                isAccepted: false
            }
        },
        methods: {
            accept() {
                sessionStorage.setItem(this.propertyName, true);
                this.isAccepted = sessionStorage.getItem(this.propertyName);
            }
        },
        mounted() {
            this.isAccepted = sessionStorage.getItem(this.propertyName);
        }
    }
</script>

<style lang="scss" scoped>
.cookies {
    position: fixed;
    left: 50%;
    transform: translateX(-50%);
    bottom: 15px;
    width: auto;
    height: auto;
    background-image: linear-gradient(to right top, $c-purple, $c-discord);
    border-radius: 5px;

    &-container {
        width: 100%;
        @include flexCenter();
        padding: 15px 25px;

        &-text {
            font-family: $c-main-font;
            margin: 0;
            color: $c-d;
            font-weight: 600;
            font-size: 16px;

            i {
                font-size: 20px;
                margin-left: 4px;
                color: $c-white;
            }
        }

        &-btn {
            background-color: $c-d;
            font-family: $c-main-font;
            color: $c-3;
            padding: 8px 16px;
            border-radius: 3px;
            margin-left: 10px;
            border: none;
            font-weight: 600;
            font-size: 18px;
            cursor: pointer;
            transition: .2s ease-in-out;

            &:hover {
                color: $c-white;
                background-color: $c-green-theme;
            }
        }
    }
}
</style>