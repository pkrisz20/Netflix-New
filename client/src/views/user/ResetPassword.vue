<template>
    <div class="container">
        <img alt="reset image" class="reset-image" src="../../assets/images/movie-poster.jpg">

        <div class="reset">
            <h2 class="reset-title">Reset password</h2>

            <form class="reset-form" @submit.prevent="submitReset()">
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
                <div v-if="successMessage" class="success">{{ successMessage }}</div>

                <input v-model="email" class="reset-form-input" name="email" type="email" placeholder="Email"/>
                <input v-model="password" class="reset-form-input" name="password" type="password" placeholder="Password"/>
                <input v-model="passwordRepeat" class="reset-form-input" name="password-again" type="password" placeholder="Confirm password"/>
                <input v-model="code" class="reset-form-input" name="code" type="text" placeholder="Your code"/>

                <input type="submit" class="reset-form-submit_btn" value="SAVE"/>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: "ResetPassword",
        data() {
            return {
                errorMessage: "",
                successMessage: "",
                email: "",
                code: null,
                passwordRepeat: "",
                password: ""
            }
        },
        methods: {
            validEmail(emailData) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(emailData);
            },

            checkForm() {
                if (!this.email || !this.password || !this.passwordRepeat || !this.code) {
                    this.errorMessage = "Each field is required, if you want to reset your password!";
                    return false;
                }

                else if (!this.validEmail(this.email)) {
                    this.errorMessage = "Invalid email!";
                    return false;
                }

                else if (this.password.length < 6) {
                    this.errorMessage = "Password has to be at least 6 characters!";
                    return false;
                }

                else if (this.password !== this.passwordRepeat) {
                    this.errorMessage = "Passwords don't match!";
                    return false;
                }

                else if (isNaN(this.code)) {
                    this.errorMessage = "Invalid code!";
                    return false;
                }

                else {
                    this.errorMessage = "";
                    return true;
                }
            },

            async submitReset() {
                this.errorMessage = "";
                this.successMessage = "";

                if (this.checkForm()) {
                    await Axios.post(`${process.env.VUE_APP_API_URL}/users/reset-password`,
                    {
                        email: this.email,
                        password: this.password,
                        code: this.code
                    })
                    .then((res) => {
                        if (res.data.status) {
                            this.successMessage = res.data.message;
                        }
                        else if (!res.data.status) {
                            this.errorMessage = res.data.message;
                        }
                    })
                    .catch(function (error) {
                        if (error.response.status >= 500 && error.response.status <= 599) {
                            commit('SET_SERVER_ERROR_STATUS', error.response);
                        }
                    });
                    this.email = "";
                    this.code = "";
                    this.passwordRepeat = "";
                    this.password = "";
                }
            },
        },
        mounted() {
            this.$store.state.httpStatus = 200; // need to be loaded the page
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        max-height: 100vh;
        position: relative;

        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, 0.7);
        }

        .reset-image {
            width: 100%;
            max-height: 100vh;
            @include object-fit();
        }

        .reset {
            position: absolute;
            top: 55%;
            left: 50%;
            transform: translate(-50%, -50%);
            background-color: rgba($c-black, 0.8);
            border-radius: 5px;
            padding: 65px;
            @include flexCenter();
            flex-direction: column;

            &-title {
                font-size: 30px;
                color: $c-white;
                width: 100%;
                margin: 0 0 15px;
            }

            &-form {
                @include flexCenter();
                flex-direction: column;
                width: 300px;

                .error {
                    width: calc(100% - 16px);
                    background-color: $c-red;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                }

                .success {
                    width: calc(100% - 16px);
                    background-color: $c-green-theme;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                }

                &-input {
                    height: 40px;
                    font-size: 16px;
                    background-color: $c-3;
                    color: $c-white;
                    padding: 5px 15px;
                    border-radius: 3px;
                    outline: none;
                    border: none;
                    width: calc(100% - 30px);
                    margin: 8px 0;

                    &::placeholder {
                        color: $c-9;
                    }
                }

                &-submit_btn {
                    width: 100%;
                    padding: 12px 0;
                    font-size: 18px;
                    color: $c-white;
                    background-color: $c-green-theme;
                    border: none;
                    border-radius: 3px;
                    margin: 10px 0 0;
                    cursor: pointer;
                    transition: .3s;
                }
            }
        }
    }
</style>