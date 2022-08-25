<template>
    <div class="container">
        <img alt="reset image" class="reset-image" src="../../assets/images/movie-poster.jpg">

        <div class="reset">
            <h2 class="reset-title">Forgot password</h2>

            <form class="reset-form" @submit.prevent="submitEmail()">
                <div v-if="errorMessage" class="error">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="success">
                    {{ successMessage }}
                </div>
                <div class="reset-form-item">
                    <input v-model="email" class="reset-form-item-input" name="email" type="text" id="forgot" placeholder="Your email address..."/>
                    <label for="forgot">Email</label>
                </div>
                <div class="reset-form_back">
                    <a href="login" class="reset-form_back--link">Back to Login</a>
                </div>
                
                <input type="submit" class="reset-form-submit_btn" value="SEND"/>
            </form>
        </div>
    </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: "ForgotPassword",
        data() {
            return {
                email: "",
                errorMessage: "",
                successMessage: ""
            }
        },
        methods: {
            validEmail(email_data) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email_data);
            },

            checkForm() {
                if (!this.email) {
                    this.errorMessage = "Email field is required if you want to reset your password!";
                    return false;
                }

                else if (!this.validEmail(this.email)) {
                    this.errorMessage = "Invalid email!";
                    return false;
                }

                else {
                    this.errorMessage = "";
                    return true;
                }
            },

            async submitEmail() {
                this.successMessage = "";
                this.errorMessage = "";

                if (this.checkForm()) {
                    await Axios.post(`${process.env.VUE_APP_API_URL}/users/forgotpassword`, { email: this.email })
                    .then((res) => {
                        if (res.data.status) {
                            this.successMessage = res.data.message;
                        }
                        else if (!res.data.status) {
                            this.errorMessage = res.data.message;
                        }
                    })
                    .catch(error => {
                        if (error.response.status >= 500 && error.response.status <= 599) {
                            this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
                        }
                    });
                    this.email = "";
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
                    width: 100%;
                    background-color: $c-red;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                    margin-bottom: 15px;
                }

                .success {
                    width: 100%;
                    background-color: $c-green-theme;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                    margin-bottom: 15px;
                }

                &-item {
                    width: 100%;
                    position: relative;
                    margin: 12px 0;

                    label {
                        position: absolute;
                        z-index: 2;
                        left: 15px;
                        top: 50%;
                        transform: translateY(-50%);
                        font-size: 16px;
                        transition: all .2s ease-in-out;
                        color: $c-9;
                        pointer-events: none;
                    }

                    &-input {
                        height: 40px;
                        font-size: 16px;
                        background-color: $c-3;
                        font-family: $c-main-font;
                        color: $c-white;
                        padding: 5px 15px;
                        border-radius: 3px;
                        outline: none;
                        border: none;
                        width: 100%;
                        margin: 0;

                        &:focus, &:active {
                            outline: 2px solid $c-green-theme;
                        }

                        &:focus + label, &:not(:placeholder-shown) + label, &:active + label, &:-webkit-autofill + label {
                            top: -12px;
                            left: 5px;
                            color: $c-green-theme;
                            font-size: 12px;
                        }

                        &::placeholder {
                            opacity: 0;
                            color: $c-9;
                            transition: all .3s;
                            font-family: $c-main-font;
                        }

                        &:focus::placeholder {
                            opacity: 1;
                        }
                    }
                }

                &_back {
                    width: 100%;
                    margin-bottom: 20px;

                    &--link {
                        font-size: 14px;
                        transition: .3s;
                        color: $c-green-theme;
                        text-decoration: none;

                        @media #{$r-max-mobile-s} {
                            font-size: 12px;
                        }

                        &:hover {
                            color: $c-white;
                        }
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