<template>
    <div class="carousels">
        <carousel
            v-if="this.$props.movies"
            :paginationEnabled="false"
            :navigationEnabled="true"
            :navigationPrevLabel="arrowLeft"
            :navigationNextLabel="arrowRight"
            :perPageCustom="[[320, 1], [540, 2], [768, 3], [1200, 5]]"
            :navigationClickTargetSize="20"
            :loop="true">

            <slide v-for="item in this.$props.movies" :key="item.id">
                <span class="title">{{ item.movieName }}</span>
                <img @click="routeToDetails(item.id)" alt="thumbnail" :src="getImagePath(item.image)">
            </slide>
        </carousel>

        <carousel
            v-else-if="this.$props.categories"
            :paginationEnabled="false"
            :navigationEnabled="true"
            :navigationPrevLabel="arrowLeft"
            :navigationNextLabel="arrowRight"
            :perPageCustom="[[320, 1], [540, 2], [768, 3], [1200, 5]]"
            :navigationClickTargetSize="20"
            :loop="true">

            <slide v-for="item in this.localMovies" :key="item.id">
                <span class="title">{{ item.movieName }}</span>
                <img @click="routeToDetails(item.id)" alt="thumbnail" :src="getImagePath(item.image)">
            </slide>
        </carousel>
    </div>
</template>

<script>
import Axios from "axios";
import { Carousel, Slide } from "vue-carousel";

    export default {
        name: "MoviesCarousel",
        data() {
            return {
                arrowRight: '<i class="fas fa-chevron-right"></i>',
                arrowLeft: '<i class="fas fa-chevron-left"></i>',
                localMovies: [],
            }
        },
        components: {
            Carousel,
            Slide
        },
        props: {
            categories: Array,
            movies: Array
        },
        methods: {
            getImagePath(image) {
                return require('../../../../server/uploads/movies/' + image);
            },
            routeToDetails(movieId) {
                this.$router.push({ path: `/detailsuser/${movieId}` });
            },
        },
        mounted() {
            if (this.$props.categories) {
                Axios.post(`${process.env.VUE_APP_API_URL}/movies/getcarouselmovies`, { categories: this.$props.categories })
                .then(response => {
                    if (response.data.status) {
                        this.localMovies = response.data.result;
                    }
                    else if (!response.data.status) {
                        console.log(response.data.message);
                    }
                });
            }
        }
    }
</script>

<style lang="scss">
.carousels {
    .VueCarousel {
        width: 100%;
        height: 100%;

        .VueCarousel-wrapper {
            margin: 0 auto;
            max-width: 90%;
            height: 100%;
            
            @media #{$r-max-tablet} {
                max-width: 80%;
            }

            .VueCarousel-inner {
                height: 100%;
                display: flex;
                align-items: stretch;

                .VueCarousel-slide {
                    width: 100%;
                    padding: 0 5px;
                    cursor: pointer;
                    position: relative;

                    &::before {
                        position: absolute;
                        content: "";
                        top: 0;
                        right: 5px;
                        left: 5px;
                        width: calc(100% - 10px);
                        height: 100%;
                        background-color: $c-black;
                        opacity: 0;
                        transition: opacity .3s ease-in-out;
                        pointer-events: none;
                    }

                    span {
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                        text-align: center;
                        color: $c-white;
                        font-size: 20px;
                        opacity: 0;
                        transition: opacity .3s ease-in-out;
                        pointer-events: none;
                    }

                    img {
                        @include object-fit();
                        width: 100%;
                        height: 100%;
                        border-radius: 3px;
                    }

                    &:hover::before {
                        opacity: 0.9;
                    }

                    &:hover {
                        span {
                            opacity: 1;
                        }
                    }
                }
            }
        }

        .VueCarousel-navigation{
            .VueCarousel-navigation-button {
                border-radius: 5px;
                padding: 10px !important;

                &:focus {
                    outline: none;
                }
                
                &.VueCarousel-navigation-next {
                    margin-left: 0 !important;
                    transform: translateY(-50%) translateX(-50%);

                    @media #{$r-max-laptop-m} {
                        transform: translateY(-50%) translateX(-25%);
                    }

                    @media #{$r-max-laptop-s} {
                        transform: translateY(-50%) translateX(0);
                    }
                }

                &.VueCarousel-navigation-prev {
                    margin-right: 0 !important;
                    transform: translateY(-50%) translateX(50%);

                    @media #{$r-max-laptop-m} {
                        transform: translateY(-50%) translateX(25%);
                    }

                    @media #{$r-max-laptop-s} {
                        transform: translateY(-50%) translateX(0);
                    }
                }

                &.VueCarousel-navigation--disabled {
                    opacity: 0 !important;
                }

                i {
                    font-size: 35px;
                    color: $c-e;
                    
                    @media #{$r-max-mobile-s} {
                        font-size: 25px;
                    }
                }
            }
        }
    }
}

</style>