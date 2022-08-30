<template>
    <div class="nav" :class="{ sticky: scrollPosition > 0 }">
        <div class="wrapper">
            <a href="/" class="logo">
                <img alt="logo" class="logo-img" src="../../assets/images/logo.png">
            </a>

            <div class="nav-links" :class="{ open_sidebar: openSidebar }">
                <ul class="nav-links-list">
                    <router-link class="link" to="/">Home</router-link>
                    <router-link class="link" to="/author">Author</router-link>
                    <Dropdown
                        class="link submenu"
                        :title="'Categories'"
                        :links="$store.state.categories"
                        @getSelected="categoriesRoute($event)"
                    />
                    <router-link class="link" to="/register">Register</router-link>
                    <router-link class="link" to="/login">Login</router-link>
                </ul>
            </div>

            <div class="search-box">
                
                <div class="search-box_results" v-if="this.searchText.length > 0">
                    <h4 class="header">{{ filterMovies(this.searchText).length > 1 ? 'Results:' : 'Result:' }} {{ filterMovies(this.searchText).length }}</h4>
                    <div class="container" v-for="(item, index) in filterMovies(this.searchText)" :key="index">
                        <router-link class="container_box" :to="{ path: '/detailsguest/' + item.id }">
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
                        class="search-field"
                        v-model="searchText"
                        :class="{ open_search : openSearchBar }"
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

        <div @click="openMenu" class="hamburgermenu" :class="{ open_menu: openSidebar }">
            <div class="bar bar1"></div>
            <div class="bar bar2"></div>
            <div class="bar bar3"></div>
        </div>
        <transition name="fade" appear>
            <div v-if="scrollPosition > 300" class="scrollup-button" @click="scrollTop">
                <i class="fas fa-chevron-up"></i>
            </div>
        </transition>
    </div>
</template>

<script>
import Dropdown from "@/components/global/Dropdown.vue";
import { mapGetters } from "vuex";

    export default {
        name: "Header",
        components: {
            Dropdown
        },
        data() {
            return {
                scrollPosition: null,
                selectedType: null,
                openSearchBar: false,
                searchText: "",
                openSidebar: false
            }
        },
        computed: {
            ...mapGetters({
                filterMovies: "filterMovies"
            })
        },
        
        methods: {
            categoriesRoute(link) {
                this.$router.push({ path: `/movies/${link}` });
            },

            openMenu() {
                this.openSidebar = !this.openSidebar;

                if (this.openSidebar) {
                    document.body.style.overflowY = "hidden";
                }

                else if (!this.openSidebar) {
                    document.body.style.overflowY = "scroll";
                }
            },

            scrollTop() {
                window.scrollTo({ top: 0, behavior: "smooth" });
            },

            updateScroll() {
                this.scrollPosition = window.scrollY;
            },
            searchBarMethod(value) {
                if (value) {
                    this.openSearchBar = true;
                    this.$refs.searchBox.focus();
                }

                else if (!value) {
                    this.searchText = "";
                    this.openSearchBar = false;
                }
            }
        },
        mounted() {
            window.addEventListener('scroll', this.updateScroll);

            //close the sidebar if clicks outside
            document.addEventListener('click', (event) => {
                if (event.target.closest('.hamburgermenu')) return;
                if (event.target.closest('.nav-links')) return;
                this.openSidebar = false;
                document.body.style.overflowY = 'scroll';
            });

            this.$store.dispatch('getCategories');
        },
    }
</script>

<style lang="scss">
.nav {
    position: fixed;
    z-index: 10;
    width: 100%;
    height: 90px;
    transition: .4s !important;
    background-color: rgba($c-darker, 0.4);

    @media #{$r-max-laptop-m} {
        height: 60px;
        width: 100vw;
    }

    .open_menu {
        .bar1 {
            transform: translateY(11px) rotate(45deg);

            @media #{$r-max-mobile-l} {
                transform: translateY(9px) rotate(45deg);
            }
        }

        .bar2 {
            transform: translateX(-20px);
            opacity: 0;
        }

        .bar3 {
            transform: translateY(-11px) rotate(-45deg);

            @media #{$r-max-mobile-l} {
                transform: translateY(-9px) rotate(-45deg);
            }
        }
    }

    .hamburgermenu {
        position: absolute;
        z-index: 6;
        top: 10px;
        right: 15px;
        width: 40px;
        height: 40px;
        display: none;
        flex-direction: column;
        justify-content: space-evenly;

        @media #{$r-max-laptop-m} {
            display: flex;
        }

        @media #{$r-max-mobile-l} {
            width: 30px;
            height: 30px;
            top: 15px;
            right: 10px;
        }

        .bar {
            background-color: $c-white;
            width: 100%;
            height: 3px;
            transition: all .3s ease-in-out;
        }
    }

    .wrapper {
        position: relative;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media #{$r-max-laptop-m} {
            //width: calc(100% - 30px);
            width: 100%;
            margin: 0;
        }

        .logo {
            width: auto;
            height: 90%;

            @media #{$r-max-mobile-l} {
                height: 40%;
            }

            &-img {
                transition: .3s;
                width: 100%;
                height: 100%;
                @include object-fit();
            }
        }

        .nav-links {

            @media #{$r-max-laptop-m} {
                transition: right .3s ease-in-out;
                position: absolute;
                top: 0;
                right: -320px;
                height: 100vh;
                width: 320px;
                background-color: $c-darker;
                z-index: 5;
                display: flex;
                justify-content: center;
                overflow: auto;
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

                @media #{$r-max-laptop-m} {
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    margin: auto 0;
                }

                .link {
                    margin: 0 20px;
                    font-weight: bold;
                    color: $c-d;
                    text-decoration: none;
                    transition: .3s;
                    cursor: pointer;
                    font-size: 16px;
                    position: relative;

                    @media #{$r-max-laptop-m} {
                        margin: 20px 0;
                    }

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

                    &:hover {
                        color: $c-green-theme;
                    }

                    &.router-link-exact-active {
                        color: $c-green-theme;

                        &::before {
                            transform: scaleX(1);
                        }
                    }

                    &.submenu {
                        position: relative;
                        display: flex;
                        justify-content: center;

                        @media #{$r-max-laptop-m} {
                            flex-direction: column;
                            align-items: center;
                        }

                        i {
                            padding-left: 5px;

                            @media #{$r-max-laptop-m} {
                                display: none;
                            }
                        }

                        .sub-items {
                            max-height: 200px;
                            overflow-y: auto;
                            background-color: rgba($c-darker, 0.4);
                            top: 53px;

                            @media #{$r-max-laptop-m} {
                                max-height: 100%;
                                overflow-y: visible;
                                top: 10px;
                            }

                            @media #{$r-max-laptop-m} {
                                .sub-row {
                                    padding: 10px;
                                    width: 100%;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        }

        .open_sidebar {
            right: 0;
        }

        .search-box {
            position: relative;
            width: auto;
            height: 100%;
            display: flex;
            align-items: center;

            @media #{$r-max-laptop-m} {
                margin-right: 60px;
            }

            @media #{$r-max-mobile-l} {
                margin-right: 24px;
            }

            &_results {
                position: absolute;
                z-index: 4;
                transition: .3s ease-in-out;
                top: 90px;
                right: 0;
                background-color: $c-c;
                width: 400px;
                max-height: 300px;
                border-bottom-left-radius: 5px;
                border-bottom-right-radius: 5px;
                overflow-y: scroll;

                @media #{$r-max-laptop-m} {
                    top: 60px;
                }

                @media #{$r-max-mobile-l} {
                    width: 300px;
                    right: -20px;
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
                            color: $c-darker;
                            font-size: 16px;
                            font-weight: 700;
                            text-align: center;

                            @media #{$r-max-mobile-l} {
                                margin: 5px 0;
                            }
                        }

                        &:hover {
                            background-color: $c-darker;

                            .container_box--title, .container_box--date {
                                color: $c-white;
                            }
                        }
                    }
                }
            }

            .search-form {
                position: absolute;
                top: 30px;
                right: 40px;
                transition: .3s;

                @media #{$r-max-laptop-m} {
                    top: 12px;
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

                    @media #{$r-max-mobile-l} {
                        font-size: 12px;
                        height: 26px;
                    }
                }

                .open_search {
                    width: 160px;

                    @media #{$r-max-mobile-l} {
                        width: 130px;
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
    background: $c-darker;
    height: 60px;

    @media #{$r-laptop-m} {

        .wrapper {

            .logo {
                height: 80%;
            }

            .nav-links {

                &-list {
                    .link {
                        font-size: 14px;

                        &.submenu {
                            
                            .sub-items {
                                background-color: $c-darker;
                                top: 38px;

                                .sub-row {
                                    .sub-link {
                                        font-size: 14px;
                                    }
                                }
                            }
                        }
                    }
                }   
            }

            .search-box {

                &_results {
                    top: 60px;
                }

                .search-form {
                    top: 15px;

                    .search-field {
                        height: 22px;
                    }
                }

                .search-icon, .close-icon {
                    width: 16px;
                    height: 16px;
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
    bottom: 60px;
    right: 15px;
    @include flexCenter();
    border-radius: 50%;
    background-color: $c-error2;
    z-index: 10;
    cursor: pointer;
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