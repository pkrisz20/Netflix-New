<template>
    <footer class="footer">
        <div class="footer_top">
            <div class="wrapper top">
                <div class="footer_top-socials">
                    <div class="icon"><i class="fab fa-facebook-f"></i></div>
                    <div class="icon"><i class="fab fa-twitter"></i></div>
                    <div class="icon"><i class="fab fa-reddit-alien"></i></div>
                    <div class="icon"><i class="fab fa-instagram"></i></div>
                    <div class="icon"><i class="fab fa-github"></i></div>
                </div>

                <div v-if="!this.isActiveUser || this.isActiveUser == null" class="footer_top-sites">
                    <a href="/" class="site">Home</a>
                    <a href="/author" class="site">About author</a>
                    <a href="/register" class="site">Sign Up</a>
                    <a href="login" class="site">Sign In</a>
                </div>

                <div v-else-if="this.isActiveUser" class="footer_top-sites">
                    <a href="/userinterface" class="site">Home</a>
                    <a href="/favourites" class="site">Favourites</a>
                    <a href="/mylist" class="site">List</a>
                    <a href="/profile" class="site">Profile</a>
                </div>

                <div class="footer_top-policy">
                    <a href="#" class="info">Privacy policy</a>
                    <span>|</span>
                    <a href="#" class="info">FAQ</a>
                    <span>|</span>
                    <a href="/support" class="info">Support</a>
                </div>
            </div>
        </div>

        <div class="footer_bottom">
            <div class="wrapper">
                <div class="footer_bottom-row">
                    <h4 class="left">Green Netflix &copy; {{ new Date().getFullYear() }}. All rights reserved.</h4>
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
            width: calc(100% - 30px);
        }

        &.top {
            @media #{$r-max-mobile-s} {
                display: grid;
                grid-template-columns: repeat(3, auto);
                justify-content: center;
            }
        }
    }
    
    &_top {
        background-color: $c-black;
        width: 100%;
        padding: 20px 0;

        &-socials, &-sites, &-policy {
            @include flexCenter();
            margin: 15px 0;

            @media #{$r-max-mobile-s} {
                flex-direction: column;
                margin: 0 12px;
            }

            .icon {
                margin: 0 15px;
                border: 1px solid $c-white;
                width: 35px;
                height: 35px;
                border-radius: 50%;
                @include flexCenter();
                cursor: pointer;
                transition: .3s ease;

                @media #{$r-max-mobile-s} {
                    flex-direction: column;
                    margin: 5px 0;
                    width: 25px;
                    height: 25px;
                }

                i {
                    font-size: 18px;
                    color: $c-white;
                    transition: .3s ease;

                    @media #{$r-max-mobile-s} {
                        font-size: 15px;
                    }
                }

                &:hover {
                    background-color: $c-white;

                    i {
                        color: $c-black;
                    }
                }
            }

            .site, .info {
                margin: 0 15px;
                text-decoration: none;
                color: $c-white;
                transition: .3s ease;
                
                @media #{$r-max-mobile-l} {
                    font-size: 15px;
                }

                @media #{$r-max-mobile-s} {
                    flex-direction: column;
                    margin: 10px 0;
                    font-size: 13px;
                }

                &:hover {
                    color: $c-yellow;
                }
            }

            span {
                color: $c-white;
                pointer-events: none;

                @media #{$r-max-mobile-s} {
                    display: none;
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