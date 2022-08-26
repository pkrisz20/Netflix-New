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

                    <div class="support-form-item">
                        <input v-model="email" :disabled="this.email" class="support-form-item-input" name="email" type="text" placeholder="Your email address..." id="email" />
                        <label for="email">Email</label>
                    </div>
                    <div v-if="this.activeUser" class="support-form-item">
                        <input id="username" v-model="username" :disabled="this.username != null" class="support-form-item-input" name="username" type="text" placeholder="Your username..." />
                        <label for="username">Username</label>
                    </div>
                    <div class="support-form-item">
                        <input v-model="fullName" id="fullname" class="support-form-item-input" name="fullname" type="text" placeholder="Your full name..." />
                        <label for="fullname">Full name</label>
                    </div>
                    <div class="support-form-item">
                        <input v-model="subject" id="subject" class="support-form-item-input" name="subject" type="text" placeholder="Subject..." />
                        <label for="subject">Subject</label>
                    </div>
                    <div class="support-form-item">
                        <textarea class="support-form-item-textarea" maxlength="500" placeholder="Write your message here..." v-model="userMessage" id="message" />
                        <label class="textarea-label" for="message">Message</label>
                        <span class="support-form-item-characters">You have {{ charactersCount }} characters.</span>
                    </div>

                    <input type="submit" class="support-form_btn" value="SEND" />
                </form>
            </div>
        </section>
    </div>
</template>

<script>
import Axios from "axios";
import BlockTitle from "@/components/global/BlockTitle.vue";
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
                activeUser: state => state.isLoggedIn,
                activeUsername: state => state.actualUserData.username,
                activeEmailAddress: state => state.actualUserData.email,
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
            setTimeout(() => {
                if (this.activeUser) {
                    this.$store.dispatch('getFavourites');
                    this.$store.dispatch("getMyList");
                    this.username = this.activeUsername;
                    this.email = this.activeEmailAddress;
                }
            }, 250);
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
            background-color: $c-4;
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
                margin-bottom: 12px;

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

            &-item {
                width: 100%;
                position: relative;
                margin: 6px 0;

                label {
                    position: absolute;
                    z-index: 2;
                    left: 15px;
                    top: 50%;
                    transform: translateY(-50%);
                    font-size: 16px;
                    transition: all .2s ease-in-out;
                    color: $c-3;
                    pointer-events: none;

                    &.textarea-label {
                        top: 20px;
                        left: 14px;
                        transform: translateY(0);
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

                    @media #{$r-max-tablet} {
                        height: 34px;
                    }

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }

                    &:focus + label, &:not(:placeholder-shown) + label, &:active + label, &:-webkit-autofill + label {
                        top: -5px;
                        left: 5px;
                        color: $c-white;
                        font-size: 12px;
                    }
                }

                &-textarea {
                    resize: none;
                    width: 100%;
                    height: 200px;
                    margin: 10px 0;
                    font-size: 16px;
                    outline: none;
                    border: none;
                    padding: 10px 15px;
                    border-radius: 3px;
                    font-family: $c-main-font;
                    color: $c-3;

                    &:focus + .textarea-label, &:not(:placeholder-shown) + .textarea-label, &:active + .textarea-label, &:-webkit-autofill + .textarea-label {
                        top: -10px;
                        left: 5px;
                        color: $c-white;
                        font-size: 12px;
                    }

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
                }

                &-input, &-textarea {
                    &::placeholder {
                        opacity: 0;
                        color: $c-3;
                        transition: all .3s;
                        font-family: $c-main-font;
                    }

                    &:focus::placeholder {
                        opacity: 1;
                    }
                }

                &-characters {
                    color: $c-white;
                    font-size: 14px;
                    font-family: $c-main-font;
                }
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