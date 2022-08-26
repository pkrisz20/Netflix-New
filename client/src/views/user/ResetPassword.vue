<template>
    <div class="container">
        <img alt="reset image" class="reset-image" src="../../assets/images/movie-poster.jpg">

        <div class="reset">
            <h2 class="reset-title">Reset password</h2>

            <form class="reset-form" @submit.prevent="submitReset()">
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
                <div v-if="successMessage" class="success">{{ successMessage }}</div>

                <div class="reset-form-item">
                    <input v-model="email" class="reset-form-item-input" name="email" id="email" type="email" placeholder="Your email address..."/>
                    <label for="email">Email</label>
                </div>
                <div class="reset-form-item">
                    <input v-model="password" class="reset-form-item-input" id="pass" name="password" :class="[{ weak :  passwordLength > 0 && passwordLength < 6 }, { medium : passwordLength >= 6 && passwordLength <= 11 }, { strong : passwordLength > 11 }]" type="password" placeholder="New password..."/>
                    <label for="pass">Password</label>
                </div>
                <div class="reset-form-item">
                    <input v-model="passwordRepeat" class="reset-form-item-input" id="pass-again" :class="[{ strong : samePassword && repeatPasswordLength > 0 }, { weak : !samePassword && repeatPasswordLength > 0 }]" name="password-again" type="password" placeholder="Password again..."/>
                    <label for="pass-again">Confirm password</label>
                </div>
                <div class="reset-form-item">
                    <input v-model="code" class="reset-form-item-input" name="code" id="code" type="text" placeholder="Your code..."/>
                    <label for="code">Code</label>
                </div>

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
        computed: {
            passwordLength() {
                return this.password.length;
            },
            repeatPasswordLength() {
                return this.passwordRepeat.length;
            },
            samePassword() {
                return this.password === this.passwordRepeat ? true : false;
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
                    .catch(error => {
                        if (error.response.status >= 500 && error.response.status <= 599) {
                            this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
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
                    position: relative;
                    width: 100%;
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
                        color: $c-white;
                        padding: 5px 15px;
                        border-radius: 3px;
                        outline: none;
                        border: none;
                        width: 100%;
                        margin: 0;
                        font-family: $c-main-font;

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

                        &.weak {
                            background-color: rgba($c-red, .75);
                        }

                        &.medium {
                            background-color: rgba($c-orange, .75);
                        }

                        &.strong {
                            background-color: rgba($c-success, .75);
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