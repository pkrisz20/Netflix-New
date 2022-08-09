<template>
<div class="admin">
    <div class="container">
        <div class="admin">
            <h2 class="admin-title">Admin Login</h2>

            <form class="admin-form" @submit.prevent="submitAdminLogin">
                <div v-if="adminErrorMessage" class="error">
                    {{ adminErrorMessage }}
                </div>

                <input v-model="adminUsername" class="admin-form-input" name="username" type="text" placeholder="Username"/>
                <input v-model="adminPassword" class="admin-form-input" name="password" type="password" placeholder="Password"/>

                <div class="forgot-pass">
                    <a target="blank" href="forgotpassword" class="forgot-link">Forgot your password?</a>
                </div>

                <input type="submit" class="admin-form-submit_btn" value="SIGN IN"/>
                
                <div class="admin-form-checkbox">
                    <input type="checkbox" id="remember" name="remember" checked/>
                    <label for="remember">Remember me</label>
                </div>
            </form>
        </div>
    </div>
</div>
</template>

<script>
import Axios from "axios";
Axios.defaults.withCredentials = true;

    export default {
        name: "AdminLogin",
        data() {
            return {
                adminUsername: "",
                adminPassword: "",
                adminErrorMessage: "",
            }
        },
        methods: {
            checkForm() {
                if (!this.adminUsername || !this.adminPassword) {
                    this.adminErrorMessage = 'Each field is required!';
                    return false;
                }

                else {
                    this.adminErrorMessage = "";
                    return true;
                }
            },
            submitAdminLogin() {
                
                if (this.checkForm()) {
                    Axios.post(`${process.env.VUE_APP_API_URL}/admin/login`, { username: this.adminUsername, pass: this.adminPassword })
                    .then((res) => {
                        
                        if (!res.data.status) {
                            if (res.data.message === "You don't have admin permission") {
                                this.$router.push("/403");
                            }
                            else {
                                this.adminErrorMessage = res.data.message;
                            }
                        }

                        else if (res.data.status) {
                            this.$store.state.adminLoggedIn = true;
                            this.$router.push({ name: 'AdminPanel'});
                        }
                    });
                    this.adminUsername = "";
                    this.adminPassword = "";
                }
            },
        },
        mounted() {
            this.$store.state.httpStatus = 200; // need to be loaded the admin login page
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        width: 100%;
        height: 100vh;
        background-image: url('../../assets/images/admin.jpg');
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

        .admin {
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
        }
    }
</style>