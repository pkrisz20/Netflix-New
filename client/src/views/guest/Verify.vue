<template>
    <div class="verify" :class="{ fail : !this.isVerified }">
        <h1 v-if="this.isVerified" class="verify-title">Verification was successfully</h1>
        <h1 v-else-if="!this.isVerified" class="verify-title">Verification failed</h1>
        <h3 v-if="this.isVerified" class="verify-subtitle">Thank you to verify yourself! Now you can close this tab and log in!</h3>
        <h3 v-else-if="!this.isVerified" class="verify-subtitle">Sorry, the verification have been failed!</h3>
    </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: "Verify",
        data() {
            return {
                isVerified: false
            }
        },
        methods: {
            async verifyAccount() {
                await Axios.put(`${process.env.VUE_APP_API_URL}/users/verify/${this.$route.params.userid}`)
                .then((res) => {
                    console.log(res.data.status);
                    if (res.data.status) {
                        this.isVerified = true;
                    }
                    else if (!res.data.status) {
                        this.isVerified = false;
                    }
                    this.$store.state.httpStatus = 200;
                })
                .catch(function (error) {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            }
        },
        mounted() {
            this.$store.state.httpStatus = 0;
            this.verifyAccount();
        }
    }
</script>

<style lang="scss" scoped>
.verify {
    font-family: $c-main-font;
    min-height: 100vh;
    width: 100%;
    background-color: $c-3;
    @include flexCenter();
    flex-direction: column;

    &-title {
        font-size: 50px;
        color: $c-success;
        margin: 0 0 15px;
    }
    
    &-subtitle {
        margin: 20px 0 0;
        font-size: 30px;
        color: $c-white;
    }

    &.fail {
        .verify-title {
            color: $c-error;
        }
    }
}
</style>