<template>
    <div class="details">
        <HeaderUser />
        <BackButton />
        <div class="bg-linear">
            <div class="container" v-for="item in getMovieDetails" :key="item.id">
                <img v-if="item.image != null" class="cover-image" alt="background" :src="getImagePath(item.image)">
                <img v-else-if="item.image == null" class="cover-image" alt="background" src="../../assets/images/black_bg.jpg">

                <div v-if="item.video != null" class="container_video">
                    <div v-show="isWatching" class="container_video-player">
                        <i @click="closePlayer()" id="close-icon" class="fas fa-arrow-left close"></i>
                        <vue-core-video-player
                            ref="movie"
                            @error="errorHandle"
                            :src="getMoviePath(item.video)"
                            :cover="getImagePath(item.image)"
                            :autoplay="false"
                            :loop="false">
                        </vue-core-video-player>
                    </div>
                </div>

                <div class="movie-details">
                    <h1 class="movie-title">{{ item.movieName }}</h1>
                    <div class="movie-info-box">

                        <!-- <div class="info"><i class="far fa-hourglass-half"></i> Duration: {{ movieDuration }}</div> -->

                        <div class="info"><i class="far fa-calendar-star"></i> Release: {{ item.releaseDate }}</div>

                        <div class="info"><i class="fas fa-film-alt"></i> Category:
                            <span v-for="category in getCategories" :key="category">{{ category }}</span>
                        </div>
                    </div>

                    <p class="movie-desc">{{ item.movieDescription }}</p>

                    <div class="btns">
                        <button @click="playMovie()" class="btn watch"><i class="fas fa-play"></i> WATCH</button>
                        <button v-if="!isOnMyList(item.id)" @click="addToList()" class="btn add"><i class="fas fa-plus"></i> WATCH LATER</button>
                        <button v-else-if="isOnMyList(item.id)" @click="removeMyList()" class="btn add"><i class="fas fa-times"></i> REMOVE FROM LIST</button>

                        <button @click="addFavourite(item.id)" class="btns-favourite"><i class="fas fa-heart"></i></button>

                        <button @click="addLike()" class="btns_likes like" :class="{ active_like: isLiked(item.id) }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.543 489.543" xml:space="preserve"><path d="M270.024 0c-22.6 0-15 48.3-15 48.3s-48.3 133.2-94.5 168.7c-9.9 10.4-16.1 21.9-20 31.3-.9 2.3-1.7 4.5-2.4 6.5-3.1 6.3-9.7 16-23.8 24.5l46.2 200.9s71.5 9.3 143.2 7.8c28.7 2.3 59.1 2.5 83.3-2.7 82.2-17.5 61.6-74.8 61.6-74.8 44.3-33.3 19.1-74.9 19.1-74.9 39.4-41.1.7-75.6.7-75.6s21.3-33.2-6.2-58.3c-34.3-31.4-127.4-10.5-127.4-10.5-6.5 1.1-13.4 2.5-20.8 4.3 0 0-32.2 15 0-82.7 32.3-97.7-21.4-112.8-44-112.8zM127.324 465.7l-35-166.3c-2-9.5-11.6-17.3-21.3-17.3h-66.8l-.1 200.8h109.1c9.8.1 16.1-7.7 14.1-17.2z"/></svg>
                            Like
                        </button>
                        <button @click="addDislike()" class="btns_likes dislike" :class="{ active_dislike: isDisliked(item.id) }">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" xml:space="preserve"><path d="M117.333 10.667h-64C23.936 10.667 0 34.603 0 64v170.667C0 264.064 23.936 288 53.333 288H160c5.888 0 10.667-4.779 10.667-10.667V64c0-29.397-23.936-53.333-53.334-53.333zM512 208c0-18.496-10.603-34.731-26.347-42.667 3.285-6.549 5.013-13.781 5.013-21.333 0-18.496-10.603-34.752-26.368-42.688 4.864-9.728 6.293-20.928 3.84-32.043C463.36 47.68 443.051 32 419.819 32H224c-7.232 0-16.405 1.173-25.771 3.285-5.739 1.301-9.344 6.976-8.064 12.693C191.403 53.632 192 58.859 192 64v213.333c0 5.739-1.6 11.264-4.736 16.448a10.623 10.623 0 0 0-.555 9.984l47.957 103.893v72.32a10.75 10.75 0 0 0 3.989 8.341c.683.555 16.512 13.013 38.677 13.013 24.683 0 64-39.061 64-85.333 0-29.184-10.453-65.515-16.96-85.333h131.755c28.715 0 53.141-21.248 55.637-48.341 1.387-15.189-3.669-29.824-13.632-40.725C506.901 232.768 512 220.821 512 208z"/></svg>
                            Dislike
                        </button>
                    </div>
                </div>
            </div>
            <Comments :movieID=this.movieId />
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import Vue from "vue";
import BackButton from "@/components/global/BackButton.vue";
import VueCoreVideoPlayer from "vue-core-video-player";
import HeaderUser from "@/components/user/HeaderUser.vue";
import Comments from "@/components/user/Comments.vue";
import { mapState, mapGetters } from "vuex";

Vue.use(VueCoreVideoPlayer);

    export default {
        name: "Moviedetails",
        components: {
            Comments,
            HeaderUser,
            BackButton
        },
        data() {
            return {
                movieId: this.$route.params.movieId,
                isWatching: false,
            }
        },
        methods: {
            scrollToTop() {
                window.scrollTo(0, 0);
            },
            errorHandle(e) {
                console.log(e);
            },
            getImagePath (image) {
                return require('../../../../server/uploads/movies/' + image);
            },
            getMoviePath (video) {
                return require('../../../../server/uploads/videos/' + video);
            },
            addLike() {
                if (this.isLiked(this.movieId)) {
                    // unlike if the movie is already liked
                    this.$store.dispatch("updateFeedback", [this.movieId, 'like', false]);
                }
                else if (!this.isLiked(this.movieId)) {
                    //like the movie without delete dislike
                    if (!this.isDisliked(this.movieId)) {
                        this.$store.dispatch("addFeedback", [this.movieId, true]);
                    }
                    //like the movie and delete dislike
                    else if (this.isDisliked(this.movieId)) {
                        this.$store.dispatch("updateFeedback", [this.movieId, 'like', true]);
                    }
                }
            },
            addDislike() {
                if (this.isDisliked(this.movieId)) {
                    // disable dislike if the movie is already disliked
                    this.$store.dispatch("updateFeedback", [this.movieId, 'dislike', false]);
                }
                else if (!this.isDisliked(this.movieId)) {
                    //dislike the movie without delete like
                    if (!this.isLiked(this.movieId)) {
                        this.$store.dispatch("addFeedback", [this.movieId, false]);
                    }
                    //dislike the movie and delete like
                    else if (this.isLiked(this.movieId)) {
                        this.$store.dispatch("updateFeedback", [this.movieId, 'dislike', true]);
                    }
                }
            },
            addToList() {
                this.$store.dispatch("addToMyList", this.movieId);
            },
            removeMyList() {
                this.$store.dispatch("deleteFromMyList", this.movieId);
            },
            async addFavourite(movie) {
                await Axios.post(`${process.env.VUE_APP_API_URL}/movies/addfavourite/${movie}`)
                .then((response) => {
                    this.$store.commit("SET_MESSAGE", response.data);
                    this.$store.dispatch("getFavourites");
                })
                .catch(error => {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            },
            playMovie() {
                if (this.hasVideo(this.movieId)) {
                    this.isWatching = true;
                    document.body.style.overflowY = 'hidden';
                }
                else {
                    this.$store.commit("SINGLE_ERROR", "There is no uploaded video yet for this movie :/");
                }
            },
            closePlayer() {
                this.isWatching = false;
                document.body.style.overflowY = 'scroll';
                this.$refs.movie[0].pause();
            }
        },
        computed: {
            ...mapState({
                getMovieDetails: state => state.movieDetails,
                getCategories: state => state.categoriesDetails,
            }),
            ...mapGetters({
                isLiked: 'isLikedMovie',
                isDisliked: 'isDislikedMovie',
                isOnMyList: 'isOnMyList',
                hasVideo: 'hasVideo'
            })
        },
        created() {
            this.$store.dispatch("getMovieDetails", this.movieId);
            this.$store.dispatch("getLikes");
            this.$store.dispatch("getFavourites");
            this.$store.dispatch("getMyList");
            this.$store.dispatch("getAllMovies");
            setTimeout(() => {
                this.scrollToTop();
            }, 150);
        }
    }
</script>

<style lang="scss" scoped>
.bg-linear {
    position: relative;
    width: 100%;
    height: auto;
    background-color: $c-dark-theme;

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

    .container {
        width: 100%;
        height: 100vh;
        position: relative;

        @media #{$r-max-tablet} {
            min-height: 100%;
        }

        &_video {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 15;

            &-player {
                position: relative;
                width: 100vw;
                height: 100vh;
                overflow: hidden;

                .close {
                    position: absolute;
                    z-index: 15;
                    top: 30px;
                    left: 30px;
                    font-size: 35px;
                    color: $c-white;
                    cursor: pointer;
                }

                video {
                    position: absolute;
                    z-index: 20;
                    width: auto;
                    height: auto;
                    min-width: 100%;
                    min-height: 100%;
                }
            }
        }

        .fav-success {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 8;
            padding: 14px 20px;
            border-radius: 5px;
            font-size: 18px;
            color: $c-white;
            background: $c-green-theme;
            text-align: center;
            display: flex;

            i {
                cursor: pointer;
                font-size: 25px;
                margin-left: 8px;
            }

            @media #{$r-max-tablet} {
                width: 100%;
            }
        }

        .cover-image {
            width: 100%;
            height: 100vh;
            @include object-fit();
            mask-image: linear-gradient(to bottom, rgba(0,0,0,1) 60%, rgba(0,0,0,0) 100%);
        }

        .movie-details {
            width: 1170px;
            padding: 0 15px;
            margin: 0 auto;
            @include absoluteCenter();
            z-index: 6;

            @media #{$r-max-laptop-m} {
                width: calc(100% - 30px);
                padding-top: 50px;
            }

            @media #{$r-max-tablet} {
                padding-top: 70px;
            }

            @media #{$r-max-mobile-s} {
                padding-top: 160px;
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
                    font-size: 18px;
                    color: $c-white;
                    display: flex;
                    align-items: center;

                    @media #{$r-max-tablet} {
                        flex-direction: column;
                        align-items: flex-start;
                    }

                    .info {
                        margin: 0 30px;
                        font-weight: 700;
                        font-size: 24px;

                        span {
                            margin: 0 8px;
                        }

                        @media #{$r-max-laptop-s} {
                            margin: 0 25px;
                        }

                        @media #{$r-max-tablet} {
                            margin: 10px 0;
                        }

                        @media #{$r-max-mobile-l} {
                            font-size: 20px;
                        }

                        @media #{$r-max-mobile-s} {
                            font-size: 18px;
                            margin: 5px 0;
                        }

                        svg {
                            width: 40px;
                            height: 40px;
                            margin-bottom: -8px;
                            margin-right: 5px;
                            fill: $c-white;
                        }
                    }
                }

                &-desc {
                    color: $c-white;
                    font-size: 18px;
                    text-align: justify;

                    @media #{$r-max-tablet} {
                        margin: 5px 0;
                    }

                    @media #{$r-max-mobile-l} {
                        font-size: 15px;
                    }
                }
            }

            .btns {
                margin-left: 40px;
                display: flex;
                align-items: center;

                @media #{$r-max-laptop-s} {
                    margin-left: 0;
                }

                @media #{$r-max-tablet} {
                    display: grid;
                    grid-template-columns: repeat(3, auto);
                    row-gap: 10px;
                }

                @media #{$r-max-mobile-l} {
                    display: flex;
                    flex-direction: column;
                    max-width: 200px;
                    margin: 0 auto;
                }

                .btn {
                    padding: 16px 24px;
                    color: $c-dark-theme;
                    margin: 0 20px;
                    font-size: 18px;
                    border-radius: 3px;
                    border: none;
                    cursor: pointer;
                    transition: .3s;

                    @media #{$r-max-laptop-s} {
                        margin: 0 10px;
                        font-size: 15px;
                    }

                    @media #{$r-max-mobile-l} {
                        width: 100%;
                    }

                    &.watch {
                        background-color: $c-green-theme;

                        &:hover {
                            background-color: $c-success;
                            color: $c-white;
                        }
                    }

                    &.add {
                        background-color: $c-white;

                        &:hover {
                            background-color: $c-b;
                        }
                    }
                }

                &-favourite {
                    border: none;
                    cursor: pointer;
                    transition: all .3s;
                    margin: 0 20px;
                    font-size: 35px;
                    background-color: transparent;
                    color: $c-white;

                    @media #{$r-max-laptop-s} {
                        margin: 0 10px;
                        font-size: 28px;
                    }

                    &:hover {
                        color: $c-red;
                        transform: scale(1.2);
                    }
                }

                &_likes {
                    @include flexCenter();
                    color: $c-white;
                    font-size: 24px;
                    font-family: $c-main-font;
                    border: none;
                    background-color: transparent;
                    margin: 0 15px;
                    cursor: pointer;
                    padding: 10px 20px;
                    border-radius: 3px;
                    transition: all .3s ease-in-out;

                    @media #{$r-max-laptop-s} {
                        margin: 0 10px;
                        font-size: 18px;
                    }

                    @media #{$r-max-mobile-l} {
                        width: 100%;
                    }

                    svg {
                        width: 26px;
                        height: 26px;
                        fill: $c-white;
                        margin-right: 5px;

                        @media #{$r-max-laptop-s} {
                            width: 22px;
                            height: 22px;
                        }
                    }

                    &:hover {
                        transform: scale(1.1);

                        @media #{$r-max-tablet} {
                            transform: scale(1);
                        }

                        &.like {
                            background-color: $c-blue;
                        }

                        &.dislike {
                            background-color: $c-error;
                        }
                    }

                    &.active_like {
                        transform: scale(1.1);
                        background-color: $c-blue;

                        @media #{$r-max-tablet} {
                            transform: scale(1);
                        }
                    }

                    &.active_dislike {
                        transform: scale(1.1);
                        background-color: $c-error;

                        @media #{$r-max-tablet} {
                            transform: scale(1);
                        }
                    }
                }
            }
        }
    }
}
</style>