<template>
<div class="register_view">
    <Header />
    <div class="container">
        <div class="register">
            <h2 class="register-title">Registration</h2>

            <form class="register-form" @submit.prevent="submitRegistration">
                <div v-if="errorMessage" class="error">
                    {{ errorMessage }}
                </div>
                <div v-if="successMessage" class="success">
                    {{ successMessage }}
                </div>

                <input v-model="email" class="register-form-input" name="email" type="text" placeholder="Email address"/>
                <input v-model="username" class="register-form-input" name="username" type="text" placeholder="Username"/>

                <div class="register-form" :class="[{ password_weak :  passwordLength > 0 && passwordLength < 6 }, { password_medium : passwordLength >= 6 && passwordLength <= 11 }, { password_strong : passwordLength > 11 }]"></div>

                <input v-model="password" class="register-form-input" :class="{ password : passwordLength > 0 }" name="password" type="password" placeholder="Password"/>
                <input v-model="passwordRepeat" class="register-form-input" name="repeat-password" type="password" placeholder="Confirm password"/>
                
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
            submitRegistration() {
                
                if(this.checkForm()) {
                    Axios.post(`${process.env.VUE_APP_API_URL}/users/register`, { email: this.email, username: this.username, pass: this.password })
                    .then((res) => {
                        if (!res.data[0]) {
                            this.errorMessage = res.data[1];
                        }

                        else if (res.data[0]) {
                            this.successMessage = res.data[1];
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
                    width: calc(100% - 16px);
                    background-color: $c-red;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
                }

                .success {
                    width: calc(100% - 16px);
                    background-color: $c-success;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
                }

                .password_weak {
                    height: 5px;
                    width: calc(100% - 30px);
                    margin-top: 8px;
                    background-color: $c-red;
                }

                .password_medium {
                    height: 5px;
                    width: calc(100% - 30px);
                    margin-top: 8px;
                    background-color: $c-yellow;
                }

                .password_strong {
                    height: 5px;
                    width: calc(100% - 30px);
                    margin-top: 8px;
                    background-color: $c-green-theme;
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

                    &.password {
                        margin-top: 0;
                    }

                    @media #{$r-max-tablet} {
                        height: 26px;
                        font-size: 16px;
                    }

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
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