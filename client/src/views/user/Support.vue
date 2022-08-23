<template>
    <div class="support_view">
        <Header v-if="!this.activeUser" />
        <HeaderUser v-else-if="this.activeUser" />
        <section class="support">
            <div class="wrapper">
                <BlockTitle :title="'Contact Us'" />

                <form class="support-form" @submit.prevent="sendEmail()">
                    <div class="support-form-msg error" v-if="errorMessage">{{ errorMessage }}</div>
                    <div class="support-form-msg success" v-if="successMessage">{{ successMessage }}</div>

                    <input v-model="email" class="support-form-input" name="email" type="text" placeholder="Your email..." />
                    <input v-if="this.activeUser" v-model="username" class="support-form-input" name="username" type="text" placeholder="Your username..." />
                    <input v-model="fullName" class="support-form-input" name="fullname" type="text" placeholder="Your full name..." />
                    <input v-model="subject" class="support-form-input" name="subject" type="text" placeholder="Subject" />
                    <textarea class="support-form-textarea" maxlength="500" placeholder="Message..." v-model="userMessage" />
                    <span class="support-form-characters">You have {{ charactersCount }} characters.</span>

                    <input type="submit" class="support-form_btn" value="SEND" />
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import Axios from "axios";
import  BlockTitle from "@/components/global/BlockTitle.vue";
import Header from "@/components/guest/Header.vue";
import HeaderUser from "@/components/user/HeaderUser.vue";
import Footer from "@/components/global/Footer.vue";
import { mapState } from "vuex";

    export default {
        name: "Support",
        components: {
            Header,
            HeaderUser,
            Footer,
            BlockTitle
        },
        computed: {
            ...mapState({
                activeUser: state => state.isLoggedIn
            }),
            charactersCount() {
                return 500 - this.userMessage.length;
            }
        },
        data() {
            return {
                successMessage: "",
                errorMessage: "",
                email: "",
                username: null,
                subject: "",
                fullName: "",
                userMessage: ""
            }
        },
        methods: {
            validEmail(emailData) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(emailData);
            },
            hasWhiteSpace(text) {
                return /\s/.test(text);
            },
            checkForm() {
                this.successMessage = "";

                if (!this.subject || !this.fullName || !this.email || !this.userMessage) {
                    this.errorMessage = "Each field is required!";
                    return false;
                }

                if (this.activeUser && !this.username) {
                    this.errorMessage = "Each field is required!";
                    return false;
                }

                else if (!this.validEmail(this.email)) {
                    this.errorMessage = "Invalid email!";
                    return false;
                }

                else if (!this.hasWhiteSpace(this.fullName)) {
                    this.errorMessage = "The full name is at least two words!";
                    return false;
                }

                else {
                    this.errorMessage = "";
                    return true;
                }
            },
            async sendEmail() {
                if(this.checkForm()) {
                    await Axios.post(`${process.env.VUE_APP_API_URL}/users/emails`, { email: this.email, subject: this.subject, fullName: this.fullName, message: this.userMessage, username: this.username })
                    .then((res) => {
                        if (!res.data.status) {
                            this.errorMessage = res.data.message;
                        }

                        else if (res.data.status) {
                            this.successMessage = res.data.message;
                        }

                        this.subject = "";
                        this.fullName = "";
                        this.email = "";
                        this.userMessage = "";
                        this.username = null;
                    })
                    .catch(error => {
                        if (error.response.status >= 500 && error.response.status <= 599) {
                            this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
                        }
                    });
                }
            }
        },
        mounted() {
            this.$store.state.httpStatus = 200;
            this.$store.dispatch("getLoginStatus");
        },
        updated() {
            if (this.activeUser) {
                this.$store.dispatch('getFavourites');
                this.$store.dispatch("getMyList");
            }
        }
    }
</script>

<style lang="scss" scoped>
    .support_view {
        position: relative;
        z-index: 0;
        min-height: 100vh;
        background-color: $c-dark-blue;
    }

    .support {
        width: 100%;
        margin: 0 auto;
        padding-bottom: 50px;

        .wrapper {
            padding: 5px 0 0;
            @include flexCenter();
            flex-direction: column;

            @media #{$r-max-laptop-m} {
                width: 100%;
                padding: 0 15px;
            }
        }

        &-form {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            padding: 30px;
            background-color: rgba($c-3, .75);
            width: 470px;
            border-radius: 5px;

            @media #{$r-max-mobile-l} {
                width: 100%;
            }

            @media #{$r-max-mobile-s} {
                padding: 15px;
            }
            
            &-msg {
                width: 100%;
                color: $c-white;
                border-radius: 3px;
                padding: 8px;
                font-size: 15px;

                @media #{$r-max-mobile-s} {
                    font-size: 12px;
                }

                &.error {
                    background-color: $c-error;
                }

                &.success {
                    background-color: $c-success;
                }
            }

            &-input {
                height: 40px;
                font-family: $c-main-font;
                font-size: 16px;
                background-color: $c-e;
                color: $c-3;
                padding: 5px 15px;
                border-radius: 3px;
                outline: none;
                border: none;
                width: 100%;
                margin: 8px 0;

                &::placeholder {
                    color: $c-6;
                }

                @media #{$r-max-tablet} {
                    height: 34px;
                    font-size: 16px;
                }

                @media #{$r-max-mobile-s} {
                    font-size: 12px;
                }
            }

            &-textarea {
                width: 100%;
                height: 200px;
                margin: 10px 0;
                font-size: 16px;
                outline: none;
                border: none;
                padding: 5px 15px;
                border-radius: 3px;
                font-family: $c-main-font;
                color: $c-3;

                @media #{$r-max-mobile-s} {
                    font-size: 12px;
                }
            }

            &-characters {
                color: $c-white;
                font-size: 14px;
                font-family: $c-main-font;
            }

            &_btn {
                width: auto;
                padding: 12px 25px;
                font-size: 18px;
                font-weight: 700;
                color: $c-white;
                background-color: $c-blue;
                border: none;
                font-family: $c-main-font;
                border-radius: 3px;
                margin: 15px 0 10px;
                cursor: pointer;
                transition: .3s;

                &:hover {
                    background-color: $c-middleblue;
                }

                @media #{$r-max-tablet} {
                    padding: 10px;
                    font-size: 16px;
                    margin: 10px 0 5px;
                }
            }
        }
    }
</style>