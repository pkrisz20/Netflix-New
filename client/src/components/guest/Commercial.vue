<template>
    <div class="commercial">
        <div class="commercial_img">
            <div class="text" data-aos="fade-up">
                <h2 class="text-main">Unlimited Movies</h2>
                <h3 class="text-sub">Watch anytime, anywhere you just want</h3>
                <p class="text-desc">We bring comfort to your home. Without any advertisment or whatever else which could disturb you as well. You can choose from over 15 categories. Join to us, enjoy your free movies and be part of our friendly community.</p>
                <a class="text-btn" href="/register">Join us</a>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Commercial",
    }
</script>

<style lang="scss" scoped>
.commercial {
    width: 100%;
    height: auto;
    position: relative;
    background-color: $c-dark-theme;
    padding-top: 80px;

    &_img {
        width: 100%;
        min-height: 500px;
        background-image: url("../../assets/images/avengers.jpg");
        background-position: center top;
        background-size: cover;
        background-attachment: fixed;
        position: relative;
        @include flexCenter();

        &::before {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, .75);
        }

        .text {
            width: 1170px;
            height: 100%;
            text-align: center;
            color: $c-white;
            position: relative;
            z-index: 2;

            @media #{$r-max-laptop-m} {
                max-width: 90%;
            }

            &-main {
                font-size: 45px;
                margin: 10px 0;

                @media #{$r-max-tablet} {
                    font-size: 30px;
                }

                @media #{$r-max-mobile-l} {
                    font-size: 24px;
                }
            }

            &-sub {
                margin: 10px 0;
                font-size: 30px;

                @media #{$r-max-tablet} {
                    font-size: 22px;
                }

                @media #{$r-max-mobile-l} {
                    font-size: 18px;
                }
            }

            &-desc {
                margin: 10px 0 50px;
                font-size: 18px;
                line-height: 26px;

                @media #{$r-max-tablet} {
                    font-size: 16px;
                }

                @media #{$r-max-mobile-l} {
                    font-size: 14px;
                    line-height: 20px;
                }
            }

            &-btn{
                cursor: pointer;
                text-decoration: none;
                padding: 12px 30px;
                background: $c-green-theme;
                color: $c-white;
                font-size: 24px;
                font-weight: 600;
                text-transform: uppercase;
                transition: .5s;

                &:hover {
                    box-shadow: 0 0 10px $c-green-theme,
                    0 0 20px $c-green-theme,
                    0 0 40px $c-green-theme,
                    0 0 80px $c-green-theme,
                    0 0 160px $c-green-theme;
                }
            }
        }
    }
}
</style>