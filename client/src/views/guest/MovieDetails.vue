<template>
<div>
    <Header />
    <BackButton />
    <div class="bg-linear">
        <div class="container" v-for="item in getMovieDetails" :key="item.id">
            <img v-if="item.image != null" class="cover-image" alt="background" :src="getImagePath(item.image)">
            <img v-else-if="item.image == null" class="cover-image" alt="background" src="../../assets/images/black_bg.jpg">

            <div class="movie-details">
                <h1 class="movie-title">{{ item.movieName }}</h1>
                <div class="movie-info-box">
                    <div class="info"><i class="far fa-calendar-star"></i> Release: {{ item.releaseDate }}</div>

                    <div class="info category"><i class="fas fa-layer-group"></i> Category:
                        <span v-for="category in getCategories" :key="category">{{ category }}</span>
                    </div>
                </div>

                <p class="movie-desc">{{ item.movieDescription }}</p>
            </div>
        </div>
        <Comments :movieID=this.movieId />
    </div>
</div>
</template>

<script>
import Header from "@/components/guest/Header.vue";
import BackButton from "@/components/global/BackButton.vue";
import Comments from "@/components/user/Comments.vue";
import { mapState } from "vuex";

    export default {
        name: "Moviedetails",
        components: {
            Comments,
            Header,
            BackButton
        },
        data() {
            return {
                movieId: this.$route.params.movieId,
            }
        },
        methods: {
            scrollToTop() {
                window.scrollTo(0, 0);
            },
            getImagePath (image) {
                return require('../../../../server/uploads/movies/' + image);
            },
        },
        computed: {
            ...mapState({
                getMovieDetails: state => state.movieDetails,
                getCategories: state => state.categoriesDetails,
            })
        },
        created() {
            this.$store.dispatch("getMovieDetails", this.movieId);
            setTimeout(() => {
                this.scrollToTop();
            }, 150);
        },
    }
</script>

<style lang="scss" scoped>
.bg-linear {
    position: relative;
    width: 100%;
    height: auto;
    background-color: $c-dark-theme;

    .container {
        width: 100%;
        height: 100vh;
        position: relative;
        mask-image: linear-gradient(to bottom, rgba($c-dark-theme, 1) 60%, rgba($c-black, 0) 100%);

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            background-color: $c-black;
            opacity: 0.7;
        }

        .cover-image {
            width: 100%;
            height: 100vh;
            @include object-fit();
            
        }

        .movie-details {
            width: 1170px;
            padding: 0 15px;
            margin: 0 auto;
            @include absoluteCenter();
            z-index: 4;

            @media #{$r-max-laptop-m} {
                width: calc(100% - 30px);
            }

            .movie {
                &-title {
                    color: $c-white;
                    font-size: 40px;
                    letter-spacing: 4px;

                    @media #{$r-max-laptop-s} {
                        text-align: center;
                    }

                    @media #{$r-max-mobile-l} {
                        font-size: 32px;
                    }

                    @media #{$r-max-mobile-s} {
                        letter-spacing: 2px;
                        font-size: 26px;
                        margin: 5px 0;
                    }
                }

                &-info-box {
                    display: flex;
                    align-items: center;

                    @media #{$r-max-laptop-s} {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .info {
                        color: $c-white;
                        margin: 0 30px;
                        font-weight: 700;
                        font-size: 24px;

                        &.category {
                            display: flex;
                            flex-wrap: wrap;
                        }

                        i {
                            margin-right: 8px;
                        }

                        span {
                            margin: 0 8px;
                        }
                        
                        @media #{$r-max-laptop-s} {
                            margin: 10px 0;
                        }

                        @media #{$r-max-mobile-l} {
                            font-size: 20px;
                        }

                        @media #{$r-max-mobile-s} {
                            font-size: 18px;
                            margin: 5px 0;
                        }
                    }
                }

                &-desc {
                    color: $c-white;
                    font-size: 18px;
                    text-align: justify;

                    @media #{$r-max-mobile-l} {
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
</style>