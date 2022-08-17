<template>
<div class="login_view">
    <Header />
    <div class="container">
        <div class="login">
            <h2 class="login-title">Sign In</h2>

            <form class="login-form" @submit.prevent="submitLogin">
                <div v-if="errorMessage" class="error">
                    {{ errorMessage }}
                </div>

                <input v-model="username" class="login-form-input" name="username" type="text" placeholder="Username"/>
                <input v-model="password" class="login-form-input" name="password" type="password" placeholder="Password"/>

                <div class="forgot-pass">
                    <a href="forgotpassword" class="forgot-link">Forgot your password?</a>
                </div>

                <input type="submit" class="login-form-submit_btn" value="SIGN IN"/>
                
                <div class="login-form-checkbox">
                    <input type="checkbox" id="remember" name="remember" checked/>
                    <label for="remember">Remember me</label>
                </div>
            </form>

            <span class="login-below">Don't have an account? <router-link class="link" to="/register">Sign Up</router-link></span>
        </div>
    </div>
    <Footer />
</div>
</template>

<script>
import Header from '@/components/guest/Header.vue';
import Footer from '@/components/global/Footer.vue';
import Axios from "axios";
Axios.defaults.withCredentials = true;

    export default {
        name: "Login",
        components: {
            Header,
            Footer
        },
        data() {
            return {
                username: '',
                password: '',
                errorMessage: '',
            }
        },
        methods: {

            checkForm() {
                if (!this.username || !this.password) {
                    this.errorMessage = 'Each field is required!';
                    return false;
                }

                else {
                    this.errorMessage = '';
                    return true;
                }
            },
            async submitLogin() {
                
                if (this.checkForm()) {
                    await Axios.post(`${process.env.VUE_APP_API_URL}/users/login`, { username: this.username, pass: this.password })
                    .then((res) => {
                        
                        if (!res.data.status) {
                            this.errorMessage = res.data.message;
                        }

                        else if (res.data.status) {
                            this.$store.state.isLoggedIn = true;
                            this.$router.push({ name: 'UserInterface'});
                        }
                    })
                    .catch(error => {
                        if (error.response.status >= 500 && error.response.status <= 599) {
                            this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
                        }
                    });
                    this.username = '';
                    this.password = '';
                }
            },
        },
        mounted() {
            this.$store.httpStatus = 200;   //need to be set
        }
    }
</script>

<style lang="scss" scoped>
    .login_view {
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

        .login {
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

                    @media #{$r-max-tablet} {
                        height: 26px;
                        font-size: 16px;
                    }

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
                }

                .forgot-pass {
                    width: 100%;

                    .forgot-link {
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
                    margin: 25px 0 15px;
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