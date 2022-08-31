<template>
    <footer class="footer">
        <div class="footer_top">
            <div class="wrapper">
                <div class="cols">
                    <div class="cols-overall">
                        <a class="cols-overall-link" href="/">
                            <img alt="logo" class="cols-overall-link-img" src="../../assets/images/logo.png">
                        </a>

                        <p v-if="this.isActiveUser" class="cols-overall-desc">If you have any question or problem about the application, you can tell us at <a class="bold" href="/support">our support</a>!</p>
                        <p v-else-if="!this.isActiveUser || this.isActiveUser == null" class="cols-overall-desc">Here is the heart of movies. Getting started as soon as possible. Don't miss the newest movies, <a class="bold" href="/register">sign up</a>!</p>

                        <div class="cols-overall-socials">
                            <a class="icon"><i class="fab fa-facebook-f"></i></a>
                            <a class="icon"><i class="fab fa-twitter"></i></a>
                            <a class="icon"><i class="fab fa-reddit-alien"></i></a>
                            <a class="icon"><i class="fab fa-instagram"></i></a>
                            <a class="icon"><i class="fab fa-github"></i></a>
                        </div>
                    </div>

                    <div v-if="!this.isActiveUser || this.isActiveUser == null" class="cols-quick">
                        <h2 class="cols-title">Quick Links</h2>
                        <a href="/" class="cols-quick-site">Home</a>
                        <a href="/author" class="cols-quick-site">About author</a>
                        <a href="/register" class="cols-quick-site">Sign Up</a>
                        <a href="login" class="cols-quick-site">Sign In</a>
                    </div>

                    <div v-else-if="this.isActiveUser" class="cols-quick">
                        <h2 class="cols-title">Quick Links</h2>
                        <a href="/userinterface" class="cols-quick-site">Home</a>
                        <a href="/favourites" class="cols-quick-site">Favourites</a>
                        <a href="/mylist" class="cols-quick-site">My List</a>
                        <a href="/profile" class="cols-quick-site">Profile</a>
                    </div>

                    <div class="cols-policy">
                        <h2 class="cols-title">Rights & Help</h2>
                        <a href="#" class="cols-policy-site">Privacy policy</a>
                        <a href="#" class="cols-policy-site">Terms of use</a>
                        <a href="#" class="cols-policy-site">FAQ</a>
                        <a href="/support" class="cols-policy-site">Support</a>
                    </div>

                    <div class="cols-news">
                        <h2 class="cols-title">Most Popular</h2>
                        <div class="cols-news-grid">
                            <div class="cols-news-grid-item" @click="routeToDetails(movie.id)" v-for="(movie, index) in this.popularMovies" :key="index">
                                <img alt="popular movie" class="pic" :src="getImagePath(movie.image)">
                                <i class="fas fa-eye"></i>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer_bottom">
            <div class="wrapper">
                <div class="footer_bottom-row">
                    <h4 class="left">Christian's MoviePlatform &copy; {{ new Date().getFullYear() }}. All rights reserved.</h4>
                    <h4 class="right">Designed & coded by <a class="right_link" href="/author">the Author <i class="fas fa-crown"></i></a></h4>
                </div>
            </div>
        </div>
    </footer>
</template>

<script>
import { mapState } from "vuex";
import Axios from "axios";

    export default {
        name: "Footer",
        computed: {
            ...mapState({
                isActiveUser: state => state.isLoggedIn
            })
        },
        data() {
            return {
                popularMovies: []
            }
        },
        methods: {
            async getTopMovies() {
                await Axios.get(`${process.env.VUE_APP_API_URL}/movies/footermovies`)
                .then(response => {
                    if (response.data.status) {
                        this.popularMovies = response.data.result;
                    }
                    else if (!response.data.status) {
                        console.log("Error movie carousels with top movies request");
                    }
                })
                .catch(error => {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            },
            getImagePath (image) {
                return require('../../../../server/uploads/movies/' + image);
            },
            routeToDetails(movieId) {
                this.isActiveUser ? this.$router.push({ path: `/detailsuser/${movieId}` }) : this.$router.push({ path: `/detailsguest/${movieId}` });
            }
        },
        mounted() {
            this.getTopMovies();
        }
    }
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: -1;

    @media #{$r-max-laptop-s} {
        position: relative;
        z-index: 0;
    }

    .wrapper {
        @media #{$r-max-laptop-m} {
            width: 100%;
        }
    }
    
    &_top {
        background-image: url("../../assets/images/footer.jpg");
        background-position: center;
        background-size: cover;
        width: 100%;
        position: relative;
        padding: 100px 0;

        @media #{$r-max-laptop-s} {
            padding: 30px 0; 
        }

        &::after {
            position: absolute;
            content: "";
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($c-darker, .8);
            z-index: 0;
        }

        .cols {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, calc(25% - 11.25px));
            gap: 15px;
            justify-content: center;
            margin: 0 auto;
            position: relative;
            z-index: 1;

            @media #{$r-max-laptop-s} {
                grid-template-columns: repeat(2, 50%);
                gap: 0;
                row-gap: 40px;
            }

            @media #{$r-max-tablet} {
                display: flex;
                flex-direction: column;
                align-items: center;
            }

            &-title {
                font-size: 26px;
                color: $c-d;
                margin: 0 0 40px;
                font-family: $c-main-font;
                position: relative;

                @media #{$r-max-laptop-s} {
                    font-size: 22px;
                    text-align: center;
                    margin: 0 0 25px;
                }

                &::before {
                    position: absolute;
                    content: "";
                    bottom: -10px;
                    left: 0;
                    width: 40px;
                    height: 2px;
                    background-color: $c-green-theme;

                    @media #{$r-max-laptop-s} {
                        left: 50%;
                        transform: translateX(-50%);
                    }
                }
            }

            &-overall {
                width: 100%;

                @media #{$r-max-laptop-s} {
                    text-align: center;
                }

                &-link {
                    width: 100%;
                    height: 100%;

                    &-img {
                        width: 80%;
                        height: auto;
                        @include object-fit();

                        @media #{$r-max-laptop-s} {
                            width: 60%;
                        }

                        @media #{$r-max-tablet} {
                            width: 50%;
                        }
                    }
                }

                &-desc {
                    font-size: 16px;
                    color: $c-c;
                    margin: 40px 0;
                    line-height: 30px;

                    .bold {
                        transition: .2s ease-in-out;
                        text-decoration: none;
                        color: $c-green-theme;
                        font-weight: 700;

                        &:hover {
                            color: $c-orange;
                        }
                    }

                    @media #{$r-max-laptop-s} {
                        margin: 20px 0;
                    }
                }

                &-socials {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

                    @media #{$r-max-laptop-s} {
                        justify-content: center;
                    }

                    .icon {
                        @include flexCenter();
                        width: 35px;
                        height: 35px;
                        border-radius: 50%;
                        margin: 0 7px;
                        background-color: transparent;
                        outline: 1px solid $c-d;
                        cursor: pointer;
                        transition: .2s ease-in-out;

                        i {
                            font-size: 16px;
                            color: $c-d;
                            transition: .2s ease-in-out;
                        }

                        &:hover {
                            background-color: $c-d;

                            i {
                                color: $c-black;
                            }
                        }
                    }
                }
            }

            &-quick, &-policy {
                width: 100%;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                @media #{$r-max-laptop-s} {
                    align-items: center;
                }

                &-site {
                    margin: 5px 0;
                    text-decoration: none;
                    color: $c-c;
                    transition: .3s ease-in-out;

                    &:hover {
                        color: $c-orange;
                    }
                }
            }

            &-news {
                width: 100%;

                &-grid {
                    display: grid;
                    grid-template-columns: repeat(2, calc(50% - 10px));
                    gap: 10px;
                    justify-content: center;
                    width: 100%;

                    @media #{$r-max-laptop-s} {
                        grid-template-columns: repeat(2, auto);
                    }

                    &-item {
                        @include flexCenter();
                        width: 100%;
                        height: 80px;
                        cursor: pointer;
                        position: relative;

                        &::after {
                            position: absolute;
                            content: "";
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            background-color: rgba($c-black, 0);
                            transition: background-color .2s ease-in-out;
                        }

                        .pic {
                            @include object-fit();
                            width: 100%;
                            height: 100%;
                        }

                        i {
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            font-size: 30px;
                            color: $c-e;
                            opacity: 0;
                            pointer-events: none;
                            transition: opacity .2s ease-in-out;
                            z-index: 1;
                        }

                        &:hover::after {
                            background-color: rgba($c-success, .8);
                        }

                        &:hover {
                            i {
                                opacity: 1;
                            }
                        }
                    }
                }
            }
        }
    }

    &_bottom {
        padding: 25px 0;
        background-color: $c-black;

        &-row {
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media (max-width: 800px) {
                flex-direction: column;
            }

            @media #{$r-max-mobile-l} {
                text-align: center;
            }

            .left {
                color: $c-b;
                margin: 0;

                @media #{$r-max-tablet} {
                    margin: 5px 0;
                }

                @media #{$r-max-mobile-l} {
                    font-size: 15px;
                }

                @media #{$r-max-mobile-s} {
                    font-size: 13px;
                }
            }

            .right {
                color: $c-b;
                margin: 0;

                @media #{$r-max-tablet} {
                    margin: 5px 0;
                }

                @media #{$r-max-mobile-l} {
                    font-size: 15px;
                }

                @media #{$r-max-mobile-s} {
                    font-size: 13px;
                }

                &_link {
                    color: $c-white;
                    text-decoration: none;
                    transition: .3s ease;

                    &:hover {
                        color: $c-orange;
                    }
                }
            }
        }
    }
}
</style>