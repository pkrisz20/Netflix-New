<template>
<div class="nav-user" :class="{ sticky: scrollPosition > 0 }">
    <div class="wrapper-user">

        <div class="left-side">
            <router-link to="/userinterface" class="logo">
                <img alt="logo" class="logo-img" src="../../assets/images/netflix.png">
            </router-link>

            <div class="nav-links" :class="{ open_sidebar: openSidebar }">
                <ul class="nav-links-list">
                    <router-link class="link" to="/userinterface">Home</router-link>
                    <Dropdown
                        class="link submenu_user"
                        :title="'Categories'"
                        :links="returnCategories"
                        @getSelected="categoriesRoute($event)"
                    />
                    <router-link class="link link-sticker" to="/favourites">My Favorites <span>{{ countFavourites }}</span></router-link>
                    <router-link class="link link-sticker" to="/mylist">My List <span>{{ countMyList }}</span></router-link>
                    <router-link class="link" to="/support">Support</router-link>
                    <li class="link logout" @click="logOut">Log Out</li>
                </ul>
            </div>
        </div>

        <!-- SEARCH BOX ON MOBILE VIEW -->
        <div class="search_container_mobile">
            <div class="search-box desktop-hide">

                <div class="search-box_results" v-if="this.searchText.length > 0">
                    <h4 class="header">{{ filterMovies(this.searchText).length > 1 ? 'Results:' : 'Result:' }} {{ filterMovies(this.searchText).length }}</h4>
                    <div class="container" v-for="(item, index) in filterMovies(this.searchText)" :key="index">
                        <router-link class="container_box" :to="{ path: '/detailsuser/' + item.id }">
                            <div class="container_box--image">
                                <img class="img" alt="filter picture" :src="require('../../../../server/uploads/movies/' + item.image)" />
                            </div>
                            <div class="container_box--title">{{ item.movieName }}</div>
                            <div class="container_box--date">{{ item.releaseDate }}</div>
                        </router-link>
                    </div>
                </div>

                <form class="search-form">
                    <input ref="searchBoxMobile"
                        :class="{ open_search : openSearchBar }"
                        v-model="searchText"
                        class="search-field"
                        placeholder="Type here to search..." type="text" name="search"
                    />
                </form>

                <!-- SEARCH ICON -->
                <svg v-show="!openSearchBar" @click="searchBarMethod(true)" class="search-icon"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95" 
                    xml:space="preserve"><path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"/></svg>

                <!-- CLOSE ICON -->
                <svg v-show="openSearchBar" @click="searchBarMethod(false)" class="close-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.971 47.971" xml:space="preserve">
                    <path d="M28.228 23.986 47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z"/></svg>
            </div>
        </div>

        <div class="user-box">
            <!-- SEARCH BOX ON DESKTOP VIEW -->
            <div class="search-box mobile-hide">

                <div class="search-box_results" v-if="this.searchText.length > 0">
                    <h4 class="header">Results: {{ filterMovies(this.searchText).length }}</h4>
                    <div class="container" v-for="(item, index) in filterMovies(this.searchText)" :key="index">
                        <router-link class="container_box" :to="{ path: '/detailsuser/' + item.id }">
                            <div class="container_box--image">
                                <img class="img" alt="filter picture" :src="require('../../../../server/uploads/movies/' + item.image)" />
                            </div>
                            <div class="container_box--title">{{ item.movieName }}</div>
                            <div class="container_box--date">{{ item.releaseDate }}</div>
                        </router-link>
                    </div>
                </div>

                <form class="search-form">
                    <input ref="searchBox"
                        :class="{ open_search : openSearchBar }"
                        v-model="searchText"
                        class="search-field"
                        placeholder="Type here to search..." type="text" name="search"
                    />
                </form>

                <svg v-show="!openSearchBar" @click="searchBarMethod(true)" class="search-icon"
                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 487.95 487.95" style="enable-background:new 0 0 487.95 487.95" 
                    xml:space="preserve"><path d="m481.8 453-140-140.1c27.6-33.1 44.2-75.4 44.2-121.6C386 85.9 299.5.2 193.1.2S0 86 0 191.4s86.5 191.1 192.9 191.1c45.2 0 86.8-15.5 119.8-41.4l140.5 140.5c8.2 8.2 20.4 8.2 28.6 0 8.2-8.2 8.2-20.4 0-28.6zM41 191.4c0-82.8 68.2-150.1 151.9-150.1s151.9 67.3 151.9 150.1-68.2 150.1-151.9 150.1S41 274.1 41 191.4z"/></svg>

                <svg v-show="openSearchBar" @click="searchBarMethod(false)" class="close-icon" xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 47.971 47.971" xml:space="preserve">
                    <path d="M28.228 23.986 47.092 5.122a2.998 2.998 0 0 0 0-4.242 2.998 2.998 0 0 0-4.242 0L23.986 19.744 5.121.88a2.998 2.998 0 0 0-4.242 0 2.998 2.998 0 0 0 0 4.242l18.865 18.864L.879 42.85a2.998 2.998 0 1 0 4.242 4.241l18.865-18.864L42.85 47.091c.586.586 1.354.879 2.121.879s1.535-.293 2.121-.879a2.998 2.998 0 0 0 0-4.242L28.228 23.986z"/></svg>
            </div>

            <div class="profile_mobile">
                <i @click="goProfilePage" class="fal fa-user-circle"></i>
            </div>

            <div @click="openMenu" class="hamburgermenu" :class="{ open_menu: openSidebar }">
                <div class="bar bar1"></div>
                <div class="bar bar2"></div>
                <div class="bar bar3"></div>
            </div>

            <div class="user-box-pic">
                <img
                    v-if="returnUserProfile == null"
                    class="user-img"
                    alt="user profile picture"
                    src="../../assets/images/default_profile.jpg"
                />

                <img
                    v-else-if="returnUserProfile != null"
                    class="user-img"
                    alt="user-profile-picture"
                    :src="getImagePath"
                />

                <div class="user-options" v-show="isOpenOptions">
                    <div class="user-options-list">
                        <ul class="list">
                            <router-link class="list-item" to="/profile">Profile</router-link>
                            <router-link class="list-item" to="/support">Support</router-link>
                            <li class="list-item" @click="logOut">Log Out</li>
                        </ul>
                    </div>
                </div>
            </div>

            <h5 class="username" @click="openUserOptions">{{ returnUsername }}</h5>
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
import Dropdown from '../global/Dropdown.vue';
import Axios from 'axios';
Axios.defaults.withCredentials = true;

    export default {
        name: "HeaderUser",
        components: {
            Dropdown,
        },
        data() {
            return {
                openSearchBar: false,
                isOpenOptions: false,
                searchText: "",
                openSidebar: false,
                scrollPosition: null
            }
        },
        computed: {
            ...mapState({
                returnUsername: state => state.actualUserData.username,
                returnUserProfile: state => state.actualUserData.image,
                returnCategories: state => state.categories,
                isLoggedInUser: state => state.isLoggedIn
            }),
            ...mapGetters({
                filterMovies: 'filterMovies',
                countFavourites: 'favouritesCount',
                countMyList: 'myListCount'
            }),
            getImagePath () {
                return require('../../../../server/uploads/profiles/' + this.returnUserProfile);
            },
        },
        // return the actual width of the window
        created() {
            window.addEventListener("resize", this.onResize);
        },
        destroyed() {
            window.removeEventListener("resize", this.onResize);
        },
        methods: {
            updateScroll() {
                this.scrollPosition = window.scrollY;
            },

            scrollTop() {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            },

            categoriesRoute(link) {
                this.$router.push({ path: `/moviesuser/${link}` });
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

            searchBarMethod(value) {
                if (value) {
                    this.openSearchBar = true;
                    this.$refs.searchBox.focus();
                    this.$refs.searchBoxMobile.focus();
                }

                else if (!value) {
                    this.searchText = '';
                    this.openSearchBar = false;
                }
            },

            openUserOptions() {
                this.isOpenOptions = !this.isOpenOptions;
            },

            logOut() {
                this.$store.dispatch("logOut");
            },

            goProfilePage() {
                this.$router.push({ name: 'Profile'});
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

            this.$store.dispatch('getLoginStatus');
            this.$store.dispatch('getCategories');
            this.$store.dispatch('getActualUserData');
        }
    }
</script>

<style lang="scss">
.nav-user {
    position: fixed;
    top: 0;
    z-index: 10;
    width: 100vw;
    height: 60px;
    transition: .4s;
    background-color: $c-dark-theme;

    @media #{$r-laptop-s} {
        background-color: rgba($c-dark-theme, 0.5);
    }

    @media #{$r-max-laptop-s} {
        height: 85px;
    }

    .wrapper-user {
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 15px;

        @media #{$r-max-laptop-s} {
            justify-content: flex-start;
        }

        .left-side {
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;

            @media #{$r-max-laptop-s} {
                width: 100%;
            }

            .logo {
                width: auto;
                height: 65%;

                @media #{$r-max-laptop-s} {
                    height: 35%;
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
                    top: 85px;
                    width: 320px;
                    height: calc(100vh - 85px);
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
                        position: relative;

                        &::before {
                            transition: transform .3s;
                            position: absolute;
                            bottom: -10px;
                            left: 0;
                            width: 100%;
                            content: '';
                            height: 3px;
                            background-color: $c-green-theme;
                            transform: scaleX(0);
                            transform-origin: right;
                        }

                        &:hover::before {
                            transform: scaleX(1);
                            transform-origin: left;
                        }

                        &-sticker {
                            position: relative;

                            span {
                                position: absolute;
                                right: -18px;
                                top: -12px;
                                background-color: $c-red;
                                color: $c-white;
                                font-size: 12px;
                                padding: 10px;
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

                            &::before {
                                transform: scaleX(1);
                            }
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
                justify-content: space-evenly;
            }

            .svg-chats {
                fill: $c-white;
                cursor: pointer;
                margin: 0 10px;
                width: 20px;
                height: 20px;
                transition: .3s;

                &:hover {
                    fill: $c-green-theme;
                }
            }

            .profile_mobile {
                display: none;
                margin: 0 10px;

                @media #{$r-max-laptop-s} {
                    display: block;
                    position: absolute;
                    top: 11px;
                    right: 50px;
                }

                i {
                    font-size: 24px;
                    color: $c-white;
                }
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
                position: absolute;
                top: 8px;
                right: 6px;
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
                width: 45px;
                height: 45px;
                position: relative;

                @media #{$r-max-laptop-s} {
                    display: none;
                }

                .user-img {
                    width: 100%;
                    height: 100%;
                    @include object-fit();
                    border-radius: 100%;
                }

                .user-options {
                    position: absolute;
                    top: 68px;
                    left: -35px;
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
                            top: -35px;
                            right: 20px;
                        }

                        .list {
                            margin: 0;
                            padding: 0;
                            list-style-type: none;
                            font-weight: 600;
                            overflow: hidden;
                            @include flexCenter();
                            flex-direction: column;

                            .list-item {
                                width: 100%;
                                padding: 12px;
                                cursor: pointer;
                                transition: .3s;
                                text-decoration: none;
                                color: $c-3;

                                &:hover {
                                    background-color: $c-3;
                                    color: $c-green-theme;
                                }
                            }
                        }
                    }
                }
            }
            
            .username {
                margin: 0 15px;
                font-weight: bold;
                color: $c-d;
                transition: .3s;
                font-size: 14px;
                cursor: pointer;

                &:hover {
                    color: $c-green-theme;
                }

                @media #{$r-max-laptop-s} {
                    display: none;
                }
            }
        }

        .search_container_mobile {
            position: absolute;
            top: 52px;
            right: 6px;
        }

        .search-box {
            position: relative;
            height: 100%;
            width: auto;
            display: flex;
            align-items: center;

            //HIDE DESKTOP SEARCH UNDER 1024PX
            &.mobile-hide {
                @media #{$r-max-laptop-s} {
                    display: none;
                }
            }

            //DISPLAY DESKTOP SEARCH ABOVE 1024PX
            &.desktop-hide {
                @media #{$r-laptop-s} {
                    display: none;
                }
            }

            &_results {
                position: absolute;
                z-index: 5;
                top: 60px;
                left: 25%;
                transform: translateX(-75%);
                background-color: $c-c;
                width: 400px;
                max-height: 300px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                overflow-y: scroll;

                @media #{$r-max-laptop-s} {
                    top: 30px;
                    left: -380px;
                    transform: translateX(0);
                }

                @media #{$r-max-mobile-l} {
                    width: 300px;
                    left: -265px;
                }

                .header {
                    color: $c-3;
                    text-align: center;
                }

                .container {
                    position: relative;

                    &_box {
                        display: flex;
                        align-items: center;
                        justify-content: space-between;
                        height: 70px;
                        padding: 5px;
                        margin: 5px 10px;
                        border-bottom: 1px solid $c-3;
                        cursor: pointer;
                        text-decoration: none;

                        @media #{$r-max-mobile-l} {
                            flex-direction: column;
                            height: auto;
                        }

                        &--image {
                            height: 100%;
                            width: 120px;

                            @media #{$r-max-mobile-l} {
                                height: 150px;
                                width: 250px;
                            }

                            .img {
                                width: 100%;
                                height: 100%;
                                object-fit: cover;
                                object-position: center;
                            }
                        }

                        &--title, &--date {
                            color: $c-dark-theme;
                            font-size: 16px;
                            font-weight: 700;
                            text-align: center;

                            @media #{$r-max-mobile-l} {
                                margin: 5px 0;
                            }
                        }

                        &:hover {
                            background-color: $c-dark-theme;

                            .container_box--title, .container_box--date {
                                color: $c-white;
                            }
                        }
                    }
                }
            }
            
            .search-form {
                position: absolute;
                top: 12px;
                right: 100%;

                @media #{$r-max-laptop-s} {
                    top: -5px;
                }

                .search-field {
                    transition: .3s;
                    width: 0;
                    height: 30px;
                    padding: 0;
                    font-size: 14px;
                    background: transparent;
                    font-family: $c-main-font;
                    outline: none;
                    border: none;
                    border-bottom: solid 1px $c-white;
                    color: $c-white;

                    &::placeholder {
                        color: $c-white;
                    }

                    @media #{$r-max-laptop-s} {
                        height: 24px;
                        font-size: 13px;
                    }
                }

                .open_search {
                    width: 160px;

                    @media #{$r-max-laptop-s} {
                        width: 140px;
                    }
                }
            }

            .search-icon, .close-icon {
                width: 20px;
                height: 20px;
                fill: $c-white;
                cursor: pointer;
                margin: 0 10px;
                transition: .3s;
                background-color: none;
            }
        }
    }
}

.sticky {
    &.nav-user {
        height: 85px;

        @media #{$r-laptop-s} {
            background-color: rgba($c-dark-theme, 1);
            height: 60px;

            .wrapper-user {
                .nav-links {
                    &-list {
                        .link {
                            &.submenu_user {
                                .sub-items {
                                    background-color: rgba($c-dark-theme, 1) !important;
                                }
                            }
                        }
                    }   
                }
            }
        }
    }
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

.scrollup-button {
    position: fixed;
    bottom: 30px;
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