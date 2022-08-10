<template>
    <div class="serverError">
        <div class="wrapper">
            <section class="serverError-section">
                <h1 class="serverError-section_number">500</h1>
                <h3 class="serverError-section_text">Server Error</h3>
                <p class="serverError-section_desc">Oops... Something went wrong. Don't worry, it's not you - it's us. Sorry about that! We're working on the problem.</p>
                <div class="serverError-section_image">
                    <img class="img" src="../../assets/images/serverError.png">
                </div>
                <a class="serverError-section_link" href="/"><i class="icon far fa-arrow-left"></i>Back to Home page</a>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "ServerError",
        mounted() {
            this.$store.state.httpStatus = 200; //just to not get the loading page
            document.body.style.overflowY = "hidden";

            //only the button can navigate the user back to home page
            this.$router.beforeEach(async (to, from) => {
                if (from.path === "/500" && to.path !== "/") {
                    this.$router.push({ name: "ServerError" }).catch(() => { return; });
                }
            });
        }
    }
</script>

<style lang="scss">
.serverError {
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