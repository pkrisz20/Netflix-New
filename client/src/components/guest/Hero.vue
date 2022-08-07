<template>
    <div class="hero">
        <carousel
            :paginationEnabled="true"
            :navigationEnabled="true"
            :navigationPrevLabel="arrowLeft"
            :navigationNextLabel="arrowRight"
            :navigationClickTargetSize="20"
            :perPage='1'
            :loop="true"
            :autoplay="true" >

            <slide v-for="item in images" :key="item.id" class="slide">
                <div class="box" data-aos="zoom-in" data-aos-delay="600">
                    <h3 class="box-title">{{ item.movieName }}</h3>
                    <button class="box-btn" @click="routeDetails(item.id)">Details</button>
                </div>
                <img alt="heroimage" :src="getPath(item.image)">
            </slide>
        </carousel>
    </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

    export default {
        name: "Hero",
        components: {
            Carousel,
            Slide
        },
        data() {
            return {
                arrowRight: '<i class="fas fa-chevron-right"></i>',
                arrowLeft: '<i class="fas fa-chevron-left"></i>',
            }
        },
        props: {
            images: Array
        },
        methods: {
            getPath (image) {
                return require('../../../../server/uploads/movies/' + image);
            },
            routeDetails(movieId) {
                this.$router.push({ path: `/detailsguest/${movieId}` });
            },
        }
    }
</script>

<style lang="scss">
.hero {
    .VueCarousel {
        width: 100%;
        height: 100vh;
        position: relative;

        .VueCarousel-wrapper {

            .VueCarousel-inner {
                height: 100vh;

                .VueCarousel-slide {
                    width: 100%;
                    height: 100vh;
                    position: relative;

                    &::after {
                        position: absolute;
                        top: 0;
                        left: 0;
                        content: '';
                        width: 100%;
                        height: 100%;
                        background-color: rgba($c-black, 0.7);
                    }

                    .box {
                        position: absolute;
                        top: 50%;
                        left: 15%;
                        z-index: 2;
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;

                        &-title {
                            font-size: 40px;
                            color: $c-white;
                            pointer-events: none;
                        }

                        &-btn {
                            cursor: pointer;
                            text-decoration: none;
                            padding: 12px 30px;
                            background: $c-green-theme;
                            color: $c-white;
                            font-size: 24px;
                            font-weight: 600;
                            text-transform: uppercase;
                            transition: .5s;
                            border: none;

                            &:hover {
                                box-shadow: 0 0 10px $c-green-theme, 0 0 20px $c-green-theme, 0 0 40px $c-green-theme, 0 0 80px $c-green-theme, 0 0 160px $c-green-theme;
                            }
                        }
                    }

                    img {
                        @include object-fit();
                        width: 100%;
                        height: 100%;
                    }
                }
            }
        }

        .VueCarousel-navigation {
            &-button {
                background-color: transparent;
                border: none;
                color: transparent;
                cursor: pointer;
                outline: none;
                position: absolute;
                top: 50%;
                transform: translateY(-50%);
                width: 40px;
                height: 40px;
                border-radius: 5px;
                padding: 5px;
                @include flexCenter();

                @media #{$r-max-mobile-l} {
                    display: none;
                }

                i {
                    font-size: 35px;
                    color: $c-white;
                }
                
                &.VueCarousel-navigation-next {
                    right: 20px;

                    @media #{$r-max-tablet} {
                        right: 0;
                    }
                }

                &.VueCarousel-navigation-prev {
                    left: 20px;

                    @media #{$r-max-tablet} {
                        left: 0;
                    }
                }

                &.VueCarousel-navigation--disabled {
                    opacity: 0 !important;
                }
            }
        }

        .VueCarousel-pagination {
            position: absolute;
            bottom: 20px;
            left: 50%;
            transform: translateX(-50%);

            .VueCarousel-dot-container {
                .VueCarousel-dot {
                    outline: none;
                    border-radius: 3px;
                    width: 30px !important;
                    height: 4px !important;
                    background-color: $c-white;
                    padding: 0 10px !important;
                    margin-top: 0 !important;

                    &--active {
                        background-color: $c-green-theme !important;
                    }
                }
            }
        }
    }
}
</style>