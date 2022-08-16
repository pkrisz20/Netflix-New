<template>
<div class="nav-admin" :class="{ sticky: scrollPosition > 0 }">
    <div class="wrapper-user">

        <div class="left-side">
            <div class="nav-links" :class="{ open_sidebar: openSidebar }">
                <ul class="nav-links-list">
                    <router-link class="link" to="/adminpanel">Movies</router-link>
                    <router-link class="link" to="/adminuserslist">Users</router-link>
                    <router-link class="link" to="/admincategories">Categories</router-link>
                                        <router-link class="link" to="/adminemails">Messages</router-link>
                </ul>
            </div>
        </div>

        <div class="user-box">
            <div @click="openMenu" class="hamburgermenu" :class="{ open_menu: openSidebar }">
                <div class="bar bar1"></div>
                <div class="bar bar2"></div>
                <div class="bar bar3"></div>
            </div>

            <div class="user-box-pic">
                <i class="fas fa-user-cog"></i>
                <h5 class="username" @click="openUserOptions">{{ returnUsername }}</h5>
                <div class="user-options" v-show="isOpenOptions">
                    <div class="user-options-list">
                        <ul class="list">
                            <li class="list-item" @click="logOut">Log Out</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <transition name="fade" appear>
        <div v-if="scrollPosition > 300" class="scrollup-button" @click="scrollTop">
            <i class="fas fa-chevron-up"></i>
        </div>
    </transition>
</div>
</template>

<script>
import { mapState, mapGetters } from "vuex";
import Axios from "axios";
Axios.defaults.withCredentials = true;

    export default {
        name: "AdminPanel",
        data() {
            return {
                isOpenOptions: false,
                openSidebar: false,
                scrollPosition: null
            }
        },
        computed: {
            ...mapState({
                returnUsername: state => state.actualUserData.username,
                returnCategories: state => state.categories,
            }),
            ...mapGetters({
                filterMovies: 'filterMovies',
            }),
        },
        methods: {
            updateScroll() {
                this.scrollPosition = window.scrollY;
            },

            scrollTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },

            openMenu() {
                this.openSidebar = !this.openSidebar;

                if (this.openSidebar) {
                    document.body.style.overflowY = 'hidden';
                }

                else if (!this.openSidebar) {
                    document.body.style.overflowY = 'scroll';
                }
            },

            openUserOptions() {
                this.isOpenOptions = !this.isOpenOptions;
                this.IsOpenNotification = false;
            },

            logOut() {
                this.$store.dispatch("logOutAdmin");
                this.$router.push({ name: 'AdminLogin'});
            }
        },
        mounted() {
            //return the actual scrollposition number
            window.addEventListener('scroll', this.updateScroll);

            //close panels on click outside of the elements
            document.addEventListener('click', (event) => {
                if (event.target.closest('.username')) return;
                if (event.target.closest('.user-options')) return;
                this.isOpenOptions = false;
            });

            //close the sidebar if clicks outside
            document.addEventListener("click", (event) => {
                if (event.target.closest('.hamburgermenu')) return;
                if (event.target.closest('.nav-links')) return;
                if (this.openSidebar === true) {
                    this.openSidebar = false;
                    document.body.style.overflowY = 'scroll';
                }
            });

            this.$store.dispatch('getAdminStatus');
            this.$store.dispatch('getCategories');
            this.$store.dispatch('getAdminData');
        }
    }
</script>

<style lang="scss">
.nav-admin {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100vw;
    height: 60px;
    transition: .4s;
    background-color: rgba($c-dark-theme, 0.3);

    .wrapper-user {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;

        .left-side {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;

            .logo {
                width: auto;
                height: 65%;

                @media #{$r-max-laptop-s} {
                    position: absolute;
                    left: 8px;
                    top: 6px;
                    height: 35px;
                }
                
                &-img {
                    transition: .4s;
                    width: 100%;
                    height: 100%;
                    @include object-fit();
                }
            }

            .nav-links {

                @media #{$r-max-laptop-s} {
                    position: absolute;
                    right: -320px;
                    top: 60px;
                    width: 320px;
                    height: calc(100vh - 60px);
                    background-color: $c-dark-theme;
                    z-index: 5;
                    display: flex;
                    justify-content: center;
                    align-items: flex-start;
                    overflow: auto;
                    transition: right .3s ease-in-out;
                }

                @media #{$r-max-mobile-s} {
                    width: 100vw;
                    right: -100vw;
                }

                &-list {
                    display: flex;
                    padding: 0;
                    margin: 10px 0;
                    list-style-type: none;

                    @media #{$r-max-laptop-s} {
                        flex-direction: column;
                        align-items: center;
                    }

                    .link {
                        margin: 0 15px;
                        font-weight: bold;
                        color: $c-d;
                        text-decoration: none;
                        transition: .3s;
                        font-size: 14px;
                        cursor: pointer;

                        &-sticker {
                            position: relative;

                            span {
                                position: absolute;
                                right: -22px;
                                bottom: -5px;
                                background-color: $c-red;
                                color: $c-white;
                                font-size: 12px;
                                padding: 5px;
                                width: 10px;
                                height: 10px;
                                border-radius: 50%;
                                @include flexCenter();
                            }
                        }

                        @media #{$r-max-laptop-s} {
                            margin: 15px 0;
                        }

                        &:hover {
                            color: $c-green-theme;
                        }

                        &.router-link-exact-active {
                            color: $c-green-theme;
                        }

                        &.logout {
                            display: none;
                            
                            @media #{$r-max-laptop-s} {
                                display: block;
                            }
                        }

                        &.submenu_user {
                            position: relative;
                            display: flex;
                            justify-content: center;

                            @media #{$r-max-laptop-s} {
                                flex-direction: column;
                                align-items: center;
                            }

                            i {
                                padding-left: 5px;

                                @media #{$r-max-laptop-s} {
                                    display: none;
                                }
                            }

                            .sub-items {
                                background-color: rgba($c-dark-theme, 0.5);
                                position: absolute;
                                top: calc(100% + 21px);
                                max-height: 200px;
                                overflow-y: auto;

                                @media #{$r-max-laptop-m} {
                                    top: calc(100% + 21px);
                                    align-items: flex-start;
                                }

                                @media #{$r-max-laptop-s} {
                                    position: relative;
                                    background-color: transparent;
                                    align-items: center;
                                    max-height: 100%;
                                    overflow-y: visible;
                                }
                            }
                        }
                    }
                }
            }

            .open_sidebar {
                right: 0;
            }
        }

        .user-box {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;

            @media #{$r-max-laptop-s} {
                width: 100%;
                justify-content: center;
            }

            .open_menu {
                .bar1 {
                    transform: translateY(8px) rotate(45deg);
                }

                .bar2 {
                    transform: translateX(-15px);
                    opacity: 0;
                }

                .bar3 {
                    transform: translateY(-8px) rotate(-45deg);
                }
            }

            .hamburgermenu {
                width: 25px;
                height: 30px;
                margin: 0 10px;
                display: none;
                flex-direction: column;
                justify-content: space-evenly;

                @media #{$r-max-laptop-s} {
                    display: flex;
                }

                .bar {
                    background-color: $c-white;
                    width: 100%;
                    height: 2px;
                    transition: all .3s ease-in-out;
                }
            }

            &-pic {
                width: auto;
                height: 45px;
                position: relative;
                @include flexCenter();

                i {
                    font-size: 26px;
                    color: $c-white;
                }

                .username {
                    margin: 0 5px;
                    font-weight: bold;
                    color: $c-d;
                    transition: .3s;
                    font-size: 14px;
                    cursor: pointer;

                    &:hover {
                        color: $c-green-theme;
                    }
                }

                .user-options {
                    position: absolute;
                    top: 68px;
                    left: -40px;
                    width: 120px;
                    height: auto;
                    background-color: $c-c;
                    border-radius: 3px;

                    &-list {
                        position: relative;

                        &::before {
                            content: '';
                            border-style: solid;
                            border-bottom: 15px solid $c-c;
                            border-top: 20px solid transparent;
                            border-left: 14px solid transparent;
                            border-right: 14px solid transparent;
                            position: absolute;
                            top: -45px;
                            right: 20px;
                        }

                        .list {
                            margin: 0;
                            padding: 0;
                            list-style-type: none;
                            color: $c-3;
                            font-weight: 600;

                            .list-item {
                                margin: 10px;
                                border-radius: 5px;
                                padding: 8px;
                                cursor: pointer;
                                transition: .3s;

                                &:hover {
                                    background-color: $c-3;
                                    color: $c-green-theme;
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}

.sticky {
    background-color: rgba($c-dark-theme, 1);
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.scrollup-button {
    position: fixed;
    bottom: 150px;
    right: 15px;
    @include flexCenter();
    border-radius: 50%;
    background-color: $c-red;
    z-index: 10;
    cursor: pointer;
    box-shadow: 2px 6px 12px $c-6;
    transition: all .3s ease-in-out;

    @media #{$r-max-tablet} {
        display: none;
    }

    &:hover {
        transform: translateY(-6px);
    }

    i {
        font-size: 25px;
        color: $c-white;
        margin: 15px;
    }
}
</style>