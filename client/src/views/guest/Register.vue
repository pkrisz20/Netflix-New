<template>
<div class="register_view">
    <Header />
    <div class="container">
        <div class="register">
            <h2 class="register-title">Registration</h2>

            <form class="register-form" @submit.prevent="submitRegistration">
                <div v-if="errorMessage" class="error">{{ errorMessage }}</div>
                <div v-if="successMessage" class="success">{{ successMessage }}</div>

                <div class="register-form-item">
                    <input v-model="email" class="register-form-item-input" id="email" name="email" type="text" placeholder="Email address..."/>
                    <label for="email">Email</label>
                </div>
                <div class="register-form-item">
                    <input v-model="username" id="username" class="register-form-item-input" name="username" type="text" placeholder="Your username..."/>
                    <label for="username">Username</label>
                </div>
                <div class="register-form-item">
                    <input v-model="password" id="pass" class="register-form-item-input" :class="[{ weak :  passwordLength > 0 && passwordLength < 6 }, { medium : passwordLength >= 6 && passwordLength <= 11 }, { strong : passwordLength > 11 }]" name="password" type="password" placeholder="Your password..."/>
                    <label for="pass">Password</label>
                </div>
                <div class="register-form-item">
                    <input v-model="passwordRepeat" id="pass-repeat" class="register-form-item-input" :class="[{ strong : samePassword && repeatPasswordLength > 0 }, { weak : !samePassword && repeatPasswordLength > 0 }]" name="repeat-password" type="password" placeholder="Confirm password..."/>
                    <label for="pass-repeat">Password repeat</label>
                </div>

                <input type="submit" class="register-form-submit_btn" value="SIGN UP"/>
                
                <div class="register-form-checkbox">
                    <input type="checkbox" id="remember" name="remember" checked/>
                    <label for="remember">Remember me</label>
                </div>
            </form>

            <span class="register-below">Already have an account? <router-link to="/login" class="link">Sign In</router-link></span>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import Header from '@/components/guest/Header.vue';
import Footer from "@/components/global/Footer.vue";
import Axios from "axios";

    export default {
        name: "Register",
        components: {
            Header,
            Footer
        },
        data() {
            return {
                email: '',
                username: '',
                password: '',
                passwordRepeat: '',
                errorMessage: '',
                successMessage: ''
            }
        },
        methods: {

            validEmail(email_data) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email_data);
            },
            checkForm() {
                this.successMessage = '';

                if (!this.username || !this.password || !this.email || !this.passwordRepeat) {
                    this.errorMessage = 'Each field is required!';
                    return false;
                }

                else if (!this.validEmail(this.email)) {
                    this.errorMessage = 'Invalid email!';
                    return false;
                }

                else if (this.username.length < 2) {
                    this.errorMessage = 'The username has to be at least 2 characters!';
                    return false;
                }

                else if (this.username.length > 14) {
                    this.errorMessage = 'The username can not be longer than 14 characters!';
                    return false;
                }

                else if (this.password.length < 6) {
                    this.errorMessage = 'Too weak password!';
                    return false;
                }

                else if (this.password !== this.passwordRepeat) {
                    this.errorMessage = 'Passwords do not match!';
                    return false;
                }

                else {
                    this.errorMessage = '';
                    return true;
                }
            },
            async submitRegistration() {
                
                if(this.checkForm()) {
                    await Axios.post(`${process.env.VUE_APP_API_URL}/users/register`, { email: this.email, username: this.username, pass: this.password })
                    .then((res) => {
                        if (!res.data.status) {
                            this.errorMessage = res.data.message;
                        }

                        else if (res.data.status) {
                            this.successMessage = res.data.message;
                        }
                    });

                    this.username = '';
                    this.password = '';
                    this.passwordRepeat = '';
                    this.email = '';
                }
            },
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
        }
    }
</script>

<style lang="scss" scoped>
    .register_view {
        position: relative;
        z-index: 0;
    }

    .container {
        width: 100%;
        height: 100vh;
        background-image: url('../../assets/images/movie-poster.jpg');
        background-position: center;
        background-size: cover;
        position: relative;
        @include flexCenter();

        &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, 0.7);
        }

        .register {
            background-color: rgba($c-black, 0.8);
            border-radius: 5px;
            padding: 50px;
            @include flexCenter();
            flex-direction: column;
            position: relative;
            z-index: 2;

            @media #{$r-max-tablet} {
                padding: 35px;
            }

            @media #{$r-max-mobile-s} {
                width: 100%;
                height: auto;
                padding: 20px 0;
            }

            &-title {
                font-size: 30px;
                color: $c-white;
                width: 100%;
                margin: 0 0 15px;

                @media #{$r-max-tablet} {
                    font-size: 24px;
                    width: 300px;
                }
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
                    margin: 0 0 15px;

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
                }

                .success {
                    width: 100%;
                    background-color: $c-success;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                    margin: 0 0 15px;

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
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
                        font-family: $c-main-font;
                        font-size: 16px;
                        background-color: $c-3;
                        color: $c-white;
                        padding: 0 15px;
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

                        &.weak {
                            background-color: rgba($c-red, .75);
                        }

                        &.medium {
                            background-color: rgba($c-orange, .75);
                        }

                        &.strong {
                            background-color: rgba($c-success, .75);
                        }

                        @media #{$r-max-tablet} {
                            height: 26px;
                            font-size: 16px;
                        }

                        @media #{$r-max-mobile-s} {
                            font-size: 12px;
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
                    margin: 15px 0 10px;
                    cursor: pointer;
                    transition: .3s;

                    @media #{$r-max-tablet} {
                        padding: 10px 0;
                        font-size: 16px;
                        margin: 10px 0 5px;
                    }
                }

                
                &-checkbox {
                    display: flex;
                    justify-content: flex-start;
                    width: 100%;
                    color: $c-b;
                    margin: 5px 0;
                    
                    label {
                        font-size: 16px;
                        color: $c-a;

                        @media #{$r-max-mobile-s} {
                            font-size: 12px;
                        }
                    }
                }
            }

            &-below {
                width: 300px;
                font-size: 14px;
                color: $c-a;

                @media #{$r-max-mobile-s} {
                    font-size: 12px;
                }

                .link {
                    transition: .3s;
                    color: $c-green-theme;
                    text-decoration: none;

                    &:hover {
                        color: $c-white;
                    }
                }
            }
        }
    }
</style>