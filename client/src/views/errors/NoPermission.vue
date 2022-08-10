<template>
    <div class="nopermission">
        <div class="wrapper">
            <section class="nopermission-section">
                <h1 class="nopermission-section_number">403</h1>
                <h3 class="nopermission-section_text">Forbidden</h3>
                <p class="nopermission-section_desc">You don't have permission for this page or resource</p>
                <div class="nopermission-section_image">
                    <img class="img" src="../../assets/images/nopermission.png">
                </div>
                <a class="nopermission-section_link" href="/login"><i class="icon far fa-arrow-left"></i>Back to Login page</a>
            </section>
        </div>
    </div>
</template>

<script>
    export default {
        name: "NoPermission",
        mounted() {
            this.$store.state.httpStatus = 200;
            document.body.style.overflowY = "hidden";
        }
    }
</script>

<style lang="scss">
.nopermission {
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