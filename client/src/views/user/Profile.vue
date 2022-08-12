<template>
    <div class="profile">
        <HeaderUser />
        <BackButton />
        <div class="wrapper">
            <div class="profile_page">
                <BlockTitle :title="'Your Profile'" />
                <div class="profile_page-picture">
                    <img
                        v-if="returnUserProfile == null"
                        alt="profile-picture"
                        class="profile_page-picture-img"
                        src='../../assets/images/default_profile.jpg'
                    />
                    <img
                        v-else-if="returnUserProfile != null"
                        class="profile_page-picture-img"
                        alt="user-profile-picture"
                        :src="getImagePath"
                    />

                    <form class="changepicture" enctype="multipart/form-data" method="POST">
                        <input
                            type="file"
                            class="file-input"
                            name="image"
                            @change="handleUploadProfile"
                            accept="image/*"
                            id="profilePicture"
                        />
                        <label class="file-label" for="profilePicture"><i class="fas fa-upload upload-icon"></i> Change image</label>
                    </form>
                </div>

                <!-- EMAIL ROW -->
                <div class="profile_page-datas" v-show="!emailForm">
                    <div class="data">
                        <div class="data-param">Your email:</div>
                        <span class="data-value">{{ returnUserEmail }}</span>
                        <i @click="openForm('email')" class="fas fa-edit edit"></i>
                    </div>
                </div>

                <div class="profile_page-form" v-show="emailForm">

                    <form class="data" @submit.prevent="submitEmail">
                        <label for="email">Your email:</label>
                        <input ref="email" id="email" type="text" v-model="newEmail" placeholder="New email..."/>
                        <input class="data-submit" type="submit" value="save"/>
                        <i @click="closeForm('email')" class="far fa-times-circle close"></i>
                    </form>
                </div>

                <!-- USERNAME ROW -->
                <div class="profile_page-datas" v-show="!usernameForm">
                    <div class="data">
                        <div class="data-param">Your username:</div>
                        <span class="data-value">{{ returnUsername }}</span>
                        <i @click="openForm('username')" class="fas fa-edit edit"></i>
                    </div>
                </div>

                <div class="profile_page-form" v-show="usernameForm">

                    <form class="data" @submit.prevent="submitUsername">
                        <label for="username">Your username:</label>
                        <input ref="username" id="username" type="text" v-model="newUsername" placeholder="New username..."/>
                        <input class="data-submit" type="submit" value="save"/>
                        <i @click="closeForm('username')" class="far fa-times-circle close"></i>
                    </form>
                </div>

                <!-- PASSWORD ROW -->
                <div class="profile_page-datas" v-show="!passwordForm">
                    <div class="data">
                    <div class="data-param">Your password:</div>

                    <div class="dots">
                        <i v-for="(dot, i) in 10" :key="i" class="fas fa-circle"></i>
                    </div>

                    <i @click="openForm('password')" class="fas fa-edit edit"></i></div>
                </div>

                <div class="profile_page-form pass" v-show="passwordForm">
                    <i @click="closeForm('password')" class="far fa-times-circle close"></i>
                    
                    <form class="data" @submit.prevent="submitPassword">
                        <label for="oldpassword">Your old password:</label>
                        <input ref="password" id="oldpassword" type="password" v-model="oldPassword" placeholder="Old password..."/>

                        <label for="newpassword">Your new password:</label>
                        <input id="newpassword" type="password" v-model="newPassword" placeholder="New password..."/>

                        <label for="repeat">Repeat password:</label>
                        <input id="repeat" type="password" v-model="repeatPassword" placeholder="New password again..."/>

                        <input class="data-submit" type="submit" value="save"/>
                    </form>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BlockTitle from "@/components/global/BlockTitle.vue";
import HeaderUser from '@/components/user/HeaderUser.vue';
import BackButton from "@/components/global/BackButton.vue";
import Axios from "axios";
import { mapState } from "vuex";

export default {
    name: "Profile",
    components: {
        HeaderUser,
        BackButton,
        BlockTitle
    },
    data() {
        return {
            emailForm: false,
            usernameForm: false,
            passwordForm: false,
            newEmail: '',
            newUsername: '',
            oldPassword: '',
            newPassword: '',
            repeatPassword: '',
        }
    },
    mounted() {
        this.$store.dispatch("getFavourites");
        this.$store.dispatch("getMyList");
    },
    computed: {
        ...mapState({
            returnUsername: state => state.actualUserData.username,
            returnUserEmail: state => state.actualUserData.email,
            returnUserProfile: state => state.actualUserData.image,
        }),
        getImagePath () {
            return require('../../../../server/uploads/profiles/' + this.returnUserProfile);
        }
    },
    methods: {
        handleUploadProfile (e) {
            this.$store.dispatch("updateProfilePicture", e.target.files[0]);
        },
        openForm(value) {
            if (value == 'email') {
                this.emailForm = true;
                this.$nextTick(() => this.$refs.email.focus());
            }

            else if (value == 'username') {
                this.usernameForm = true;
                this.$nextTick(() => this.$refs.username.focus());
            }

            else if (value == 'password') {
                this.passwordForm = true;
                this.$nextTick(() => this.$refs.password.focus());
            }
        },

        closeForm(value) {
            if (value == 'email') {
                this.emailForm = false;
                this.newEmail = '';
                this.errorEmail = '';
                this.successEmail = '';
            }

            else if (value == 'username') {
                this.usernameForm = false;
                this.newUsername = '';
                this.errorUsername = '';
                this.successUsername = '';
            }

            else if (value == 'password') {
                this.passwordForm = false;
                this.newPassword = '';
                this.errorPassword = '';
                this.successPassword = '';
            }
        },

        validEmail(emailData) {
            var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(emailData);
        },

        async submitEmail() {
            if (!this.newEmail) {
                this.errorEmail = "Fill out the field!";
                return;
            }
            else if (!this.validEmail(this.newEmail)) {
                this.errorEmail = "Invalid email!";
                return;
            }

            else {
                await Axios.put(`${process.env.VUE_APP_API_URL}/users/changemail`, { newEmail: this.newEmail })
                .then((res) => {
                    this.$store.commit("SET_MESSAGE", res.data);
                })
                .catch(function (error) {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            }
        },

        async submitUsername() {
            if (!this.newUsername) {
                this.errorUsername = "Fill out the field!";
                return;
            }
            else if (this.newUsername.length < 2) {
                this.errorUsername = 'The username has to be at least 2 characters!';
                return;
            }

            else if (this.newUsername.length > 14) {
                this.errorUsername = 'Username max 14 characters!';
                return;
            }

            else {
                await Axios.put(`${process.env.VUE_APP_API_URL}/users/changeusername`, { newUsername: this.newUsername })
                .then((res) => {
                    this.$store.commit("SET_MESSAGE", res.data);
                })
                .catch(function (error) {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            }
        },

        async submitPassword() {
            if (!this.oldPassword || !this.newPassword || !this.repeatPassword) {
                this.errorPassword = "Fill out each field!";
                return;
            }

            else if (this.newPassword != this.repeatPassword) {
                this.errorPassword = "Passwords don't match!";
                return;
            }

            else if (this.newPassword.length < 6) {
                this.errorPassword = 'Too weak password!';
                return;
            }

            else {
                await Axios.put(`${process.env.VUE_APP_API_URL}/users/changepassword`,
                {
                    oldPassword: this.oldPassword,
                    newPassword: this.newPassword,
                    repeatPassword: this.repeatPassword
                })
                .then((res) => {
                    this.$store.commit("SET_MESSAGE", res.data);
                })
                .catch(function (error) {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            }
        },
    }
}
</script>

<style lang="scss">
.profile {
    background-color: $c-dark-blue;
    min-height: 100vh;

    .wrapper {

        @media #{$r-max-laptop-m} {
            width: 100%;
        }

        .profile_page {
            width: 100%;
            height: auto;
            @include flexCenter();
            flex-direction: column;
            position: relative;

            .movies_section {
                background-color: $c-dark-blue;
            }

            &-title {
                color: $c-white;
                margin: 30px 0;
                font-size: 30px;
                text-decoration: underline;
                text-underline-offset: 5px;
            }

            &-picture {
                width: 200px;
                height: 200px;
                position: relative;
                margin-bottom: 50px;

                &-img {
                    @include object-fit();
                    width: 100%;
                    height: 100%;
                    border-radius: 100%;
                }

                .changepicture {
                    position: absolute;
                    bottom: -45px;
                    left: 50%;
                    transform: translateX(-50%);

                    .file-input {
                        display: none;
                    }

                    .file-label {
                        background-color: $c-b;
                        border-radius: 5px;
                        color: $c-dark-blue;
                        width: 120px;
                        height: 40px;
                        margin: 10px auto;
                        font-size: 14px;
                        padding: 5px 0;
                        cursor: pointer;
                        @include flexCenter();
                        flex-direction: column;
                        transition: .4s;

                        &:hover {
                            background-color: $c-green-theme;
                            color: $c-white;
                        }
                    }
                }
            }

            &-datas {
                margin: 6px 0;
                display: flex;
                background-color: $c-d;
                padding: 15px;
                width: 500px;
                height: auto;

                @media #{$r-max-tablet} {
                    width: 100%;
                }

                .data {
                    font-size: 16px;
                    width: 100%;
                    color: $c-3;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    @media #{$r-max-mobile-l} {
                        flex-direction: column;
                    }

                    &-param, &-value {
                        @media #{$r-max-tablet} {
                            margin: 8px 0;
                        }
                    }

                    .edit {
                        cursor: pointer;
                        font-size: 24px;
                    }

                    @media #{$r-max-mobile-l} {
                        margin: 15px 0;
                    }
                    
                    .dots {
                        font-size: 6px;

                        @media #{$r-max-tablet} {
                            margin: 8px 0;
                        }

                        i {
                            margin: 0 2px;
                        }
                    }
                }
            }

            &-form {
                margin: 6px 0;
                display: flex;
                flex-direction: column;
                background-color: $c-d;
                padding: 15px;
                width: 500px;
                height: auto;
                position: relative;

                @media #{$r-max-tablet} {
                    width: 100%;
                }

                &.pass {
                    position: relative;

                    .error, .success {
                        margin-top: 20px;
                    }

                    .close {
                        position: absolute;
                        top: 10px;
                        right: 15px;
                        font-size: 26px;
                        color: $c-dark-blue;
                        cursor: pointer;
                    }

                    .data {
                        flex-direction: column;

                        &-param, &-value {
                            @media #{$r-max-tablet} {
                                margin: 8px 0;
                            }
                        }

                        label {
                            margin-bottom: 10px;
                        }

                        input[type=password] {
                            border: none;
                            border-bottom: 1px solid $c-dark-blue;
                            background: transparent;
                            outline: none;
                            padding: 5px;
                            font-size: 14px;
                            color: $c-3;
                            margin-bottom: 15px;

                            &:focus {
                                outline: none;
                            }
                        }
                    }
                }

                .success {
                    text-align: center;
                    width: calc(100% - 16px);
                    padding: 8px;
                    border-radius: 3px;
                    font-size: 15px;
                    color: $c-white;
                    background: $c-success;
                    margin-bottom: 10px;

                    i {
                        font-size: 26px;
                        cursor: pointer;
                        transition: .3s;
                        margin-left: 20px;
                    }
                }
                .error {
                    text-align: center;
                    width: calc(100% - 16px);
                    background-color: $c-red;
                    color: $c-white;
                    border-radius: 3px;
                    padding: 8px;
                    font-size: 15px;
                    margin-bottom: 10px;

                    @media #{$r-max-mobile-s} {
                        font-size: 12px;
                    }
                }

                .data {
                    font-size: 20px;
                    width: 100%;
                    color: $c-3;
                    font-weight: 600;
                    display: flex;
                    align-items: center;
                    justify-content: space-between;

                    @media #{$r-max-mobile-l} {
                        flex-direction: column;
                    }

                    label {
                        font-size: 16px;
                        color: $c-3;
                        font-weight: 600;

                        @media #{$r-max-mobile-l} {
                            margin: 8px 0;
                        }
                    }

                    input[type=text] {
                        border: none;
                        border-bottom: 1px solid $c-dark-blue;
                        background: transparent;
                        outline: none;
                        padding: 5px;
                        font-size: 14px;
                        color: $c-3;

                        @media #{$r-max-mobile-l} {
                            margin: 8px 0;
                        }

                        &:focus {
                            outline: none;
                        }
                    }

                    i {
                        font-size: 26px;
                        color: $c-dark-blue;
                        cursor: pointer;

                        @media #{$r-max-mobile-l} {
                            position: absolute;
                            top: 10px;
                            right: 15px;
                            z-index: 2;
                        }
                    }

                    &-submit {
                        padding: 8px 16px;
                        font-size: 14px;
                        outline: none;
                        background-color: $c-b;
                        border: 1px solid $c-dark-blue;
                        color: $c-dark-blue;
                        border-radius: 4px;
                        font-weight: 600;
                        cursor: pointer;
                        text-transform: uppercase;
                        transition: .3s;

                        &:hover {
                            background-color: $c-green-theme;
                            color: $c-white;
                        }
                    }
                }
            }
        }
    }
}
</style>