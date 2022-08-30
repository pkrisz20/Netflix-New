<template>
    <footer class="footer">
        <div class="footer_top">
            <div class="wrapper">
                <div class="cols">
                    <div class="cols-overall">
                        <a class="cols-overall-link" href="/">
                            <img alt="logo" class="cols-overall-link-img" src="../../assets/images/logo.png">
                        </a>
                        <p class="cols-overall-desc">Here are the heart and community of movies. Getting started as soon as possible. Don't miss the newest movies, sign up!</p>

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
                        <a href="/mylist" class="cols-quick-site">List</a>
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
                        <h2 class="cols-title">Most popular</h2>
                        <div class="cols-news-grid">
                            <div class="cols-news-grid-item">
                                <img alt="popular movie" class="pic" src="../../assets/images/narcos.jpg">
                            </div>
                            <div class="cols-news-grid-item">
                                <img alt="popular movie" class="pic" src="../../assets/images/narcos.jpg">
                            </div>
                            <div class="cols-news-grid-item">
                                <img alt="popular movie" class="pic" src="../../assets/images/narcos.jpg">
                            </div>
                            <div class="cols-news-grid-item">
                                <img alt="popular movie" class="pic" src="../../assets/images/narcos.jpg">
                            </div>
                            <div class="cols-news-grid-item">
                                <img alt="popular movie" class="pic" src="../../assets/images/narcos.jpg">
                            </div>
                            <div class="cols-news-grid-item">
                                <img alt="popular movie" class="pic" src="../../assets/images/narcos.jpg">
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

    export default {
        name: "Footer",
        computed: {
            ...mapState({
                isActiveUser: state => state.isLoggedIn
            })
        },
    }
</script>

<style lang="scss" scoped>
.footer {
    width: 100%;
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: -1;

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
        padding: 80px 0;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, .5);
        }

        .cols {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(4, calc(25% - 11.25px));
            gap: 15px;
            justify-content: center;
            margin: 0 auto;

            &-title {
                font-size: 26px;
                color: $c-d;
                margin: 0 0 40px;
                font-family: $c-main-font;
            }

            &-overall {
                width: 100%;

                &-link {
                    width: 100%;
                    height: 100%;

                    &-img {
                        width: 80%;
                        height: auto;
                        @include object-fit();
                    }
                }

                &-desc {
                    font-size: 16px;
                    color: $c-c;
                    margin: 40px 0;
                }

                &-socials {
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: flex-start;

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
                    width: 100%;

                    &-item {
                        width: 100%;
                        height: 80px;
                        cursor: pointer;

                        .pic {
                            @include object-fit();
                            width: 100%;
                            height: 100%;
                        }
                    }
                }
            }
        }
    }

    &_bottom {
        padding: 25px 0;
        box-shadow: 0px -1px 12px rgba($c-white, 1);
        background-color: $c-black;

        &-row {
            display: flex;
            justify-content: space-between;
            align-items: center;

            @media #{$r-max-tablet} {
                flex-direction: column;
            }

            @media #{$r-max-mobile-l} {
                text-align: center;
            }

            .left {
                color: $c-8;
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
                color: $c-8;
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
                        color: $c-yellow;
                    }
                }
            }
        }
    }
}
</style>