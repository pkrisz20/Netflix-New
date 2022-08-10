<template>
    <div class="notfound">
        <div class="wrapper">
            <section class="notfound-section">
                <h1 class="notfound-section_number">404</h1>
                <h3 class="notfound-section_text">Page Not found</h3>
                <p class="notfound-section_desc">This page, which you want to access, doesn't exist</p>
                <div class="notfound-section_image">
                    <img class="img" src="../../assets/images/notfound.png">
                </div>
                <a v-if="isActiveUser" class="notfound-section_link" href="/userinterface"><i class="icon far fa-arrow-left"></i>Back to Home page</a>
                <a v-else-if="!isActiveUser || isActiveUser == null" class="notfound-section_link" href="/"><i class="icon far fa-arrow-left"></i>Back to Home Page</a>
            </section>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";

    export default {
        name: "NotFound",
        computed: {
            ...mapState({
                isActiveUser: state => state.isLoggedIn
            })
        },
        mounted() {
            this.$store.dispatch("getLoginStatus");
            this.$store.state.httpStatus = 200;
            document.body.style.overflowY = "hidden";
        }
    }
</script>

<style lang="scss">
.notfound {
    min-height: 100vh;
    background-color: $c-8;
    @include flexCenter();

    .wrapper {
        @media #{$r-max-laptop-m} {
            width: 100%;
        }
    }
    
    &-section {
        width: 100%;
        height: 100%;
        @include flexCenter();
        flex-direction: column;
        font-family: $c-main-font;
        text-transform: uppercase;

        &_number {
            margin: 20px 0;
            font-size: 100px;

            @media #{$r-max-tablet} {
                font-size: 35px;
                margin: 10px 0;
            }
        }

        &_text {
            text-align: center;
            margin: 30px 0;
            font-size: 75px;
            
            @media #{$r-max-tablet} {
                font-size: 25px;
                margin: 20px 0;
            }
        }

        &_desc {
            font-size: 18px;
            text-transform: none;
            text-align: center;
            line-height: 30px;
            max-width: 600px;
        }

        &_image {
            margin-bottom: 20px;
            width: auto;
            height: 100%;
            
            img {
                width: 100%;
                height: 100%;
                @include object-fit();
            }
        }

        &_link {
            padding: 12px 20px;
            border-radius: 5px;
            background-color: $c-dark-theme;
            color: $c-d;
            font-family: $c-main-font;
            font-size: 24px;
            cursor: pointer;
            transition: .3s ease-in-out;
            display: flex;
            align-items: center;
            text-align: center;
            text-decoration: none;

            @media #{$r-max-tablet} {
                font-size: 20px;
            }

            i {
                margin-right: 10px;
                transition: transform .3s ease-in-out;
            }

            &:hover {
                background-color: $c-blue;

                i {
                    transform: translateX(-8px);
                }
            }
        }
    }
}
</style>