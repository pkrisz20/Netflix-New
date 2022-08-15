<template>
    <div class="support_view">
        <Header v-if="!this.activeUser" />
        <HeaderUser v-else-if="this.activeUser" />
        <section class="support">
            <div class="wrapper">
                <BlockTitle :title="'Contact Us'" />

                <form class="support-form" @submit.prevent="sendEmail">
                    <div class="support-form-msg" v-if="errorMessage" :class="{ error : this.errorMessage }">
                        {{ errorMessage }}
                    </div>
                    <div class="support-form-msg" v-if="successMessage" :class="{ success : this.successMessage }">
                        {{ successMessage }}
                    </div>

                    <input v-model="email" class="support-form-input" name="email" type="email" placeholder="Your email..." />
                    <input v-model="fullName" class="support-form-input" name="fullname" type="text" placeholder="Your full name..." />
                    <input v-model="username" class="support-form-input" name="username" type="text" placeholder="Your username..." />
                    <input v-model="subject" class="support-form-input" name="subject" type="text" placeholder="Subject" />
                    <textarea class="support-form-textarea" maxlength="500" placeholder="Message..." v-model="userMessage" />

                    <input type="submit" class="support-form_btn" value="SEND" />
                </form>
            </div>
        </section>
    </div>
</template>

<script>
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
            })
        },
        data() {
            return {
                successMessage: "",
                errorMessage: "",
                email: "",
                username: "",
                subject: "",
                fullName: "",
                userMessage: ""
            }
        },
        mounted() {
            this.$store.state.httpStatus = 200;
        }
    }
</script>

<style lang="scss" scoped>
    .support_view {
        position: relative;
        z-index: 0;
        min-height: 100vh;
        background-image: linear-gradient(to top, $c-success, $c-middleblue);
    }

    .support {
        width: 100%;
        margin: 0 auto;

        .wrapper {
            padding: 5px 0 0;
            @include flexCenter();
            flex-direction: column;
        }

        &-form {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            padding: 30px;
            background-color: $c-3;
            width: 470px;
            border-radius: 5px;
            
            &-msg {
                width: calc(100% - 10px);
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
                    height: 26px;
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
            }

            &_btn {
                width: auto;
                padding: 12px 25px;
                font-size: 18px;
                font-weight: 700;
                color: $c-white;
                background-color: $c-blue;
                border: none;
                border-radius: 3px;
                margin: 15px 0 10px;
                cursor: pointer;
                transition: .3s;

                &:hover {
                    background-color: $c-middleblue;
                }

                @media #{$r-max-tablet} {
                    padding: 10px 0;
                    font-size: 16px;
                    margin: 10px 0 5px;
                }
            }
        }
    }
</style>