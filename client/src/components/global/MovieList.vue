<template>
<div class="movies_list">
    <div class="movies_section">
        <div class="wrapper">
            <div class="listCards">

                <div class="card" @click="routeToDetails(item.id)" v-for="item in movies" :key="item.id" data-aos="fade-up">
                    <div class="card_stickers">
                        <div class="favourite" @click.stop="addToFavourites(item.id)" v-if="!isFavourite(item.id) && loginStatus">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="cancel" @click.stop="removeFavourite(item.id)" v-if="isFavourite(item.id) && loginStatus">
                            <i class="fas fa-heart-broken"></i>
                        </div>
                        <div class="addmylist" @click.stop="addMyList(item.id)" v-if="!isOnMyList(item.id) && loginStatus">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="cancel" @click.stop="removeMyList(item.id)" v-if="isOnMyList(item.id) && loginStatus">
                            <i class="fas fa-minus"></i>
                        </div>
                    </div>

                    <div class="card_image" v-if="item.image == null">
                        <img class="thumbnail" alt="moviepicture" src="../../assets/images/video_default.png">
                    </div>
                    <div class="card_image" v-else-if="item.image != null">
                        <img class="thumbnail" alt="moviepicture" :src="getImagePath(item.image)">
                    </div>
                    <h2 class="card_title">{{ item.movieName }}</h2>
                    <h4 class="card_realease">{{ item.releaseDate }}</h4>

                    <div class="card_bottom">
                        <div class="card_bottom-comments"><i class="fas fa-comment-alt-dots"></i>{{ comments(item.id) }}</div>
                        <div class="card_bottom-likes"><i class="fas fa-thumbs-up"></i> {{ likes(item.id) }}</div>
                        <div class="card_bottom-dislikes"><i class="fas fa-thumbs-down"></i> {{ dislikes(item.id) }}</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Axios from "axios";
import { mapGetters, mapState } from "vuex";

export default {
    name: "MovieList",
    props: {
        movies: Array
    },
    computed: {
        ...mapState({
            loginStatus: state => state.isLoggedIn,
        }),
        ...mapGetters({
            comments: 'getCommentsForList',
            dislikes: 'getDislikesCount',
            likes: 'getLikesCount',
            isFavourite: 'checkIsFavourite',
            isOnMyList: 'isOnMyList'
        })
    },
    methods: {
        getImagePath (image) {
            return require('../../../../server/uploads/movies/' + image);
        },
        routeToDetails(movieId) {
            if (this.loginStatus) {
                this.$router.push({ path: `/detailsuser/${movieId}` });
            }

            if (!this.loginStatus) {
                this.$router.push({ path: `/detailsguest/${movieId}` });
            }
        },
        async addToFavourites(movie) {
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
        async removeFavourite(movie) {
            await Axios.delete(`${process.env.VUE_APP_API_URL}/movies/removefavourite/${movie}`)
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
        addMyList (movieID) {
            this.$store.dispatch("addToMyList", movieID);
        },
        removeMyList (movieID) {
            this.$store.dispatch("deleteFromMyList", movieID);
        }
    }
}
</script>

<style lang="scss" scoped>
.movies_section {
    padding: 10px 0 50px;
    background-color: $c-dark-theme;

    .wrapper {
        @media #{$r-max-laptop-m} {
            //width: calc(100% - 30px);
            width: 100%;
        }

        @media #{$r-max-mobile-l} {
            @include flexCenter();
        }

        @media #{$r-max-mobile-s} {
            padding: 0 30px;
            //width: calc(100% - 60px);
        }
    }
}

.listCards {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    row-gap: 55px;
    column-gap: 15px;
    margin-top: 30px;

    @media #{$r-max-laptop-s} {
        grid-template-columns: repeat(2, 1fr);
        max-width: 750px;
        margin: 0 auto;
    }

    @media #{$r-max-mobile-l} {
        @include flexCenter();
        flex-direction: column;
        width: 75%;
        row-gap: 30px;
    }

    @media #{$r-max-mobile-s} {
        width: 100%;
    }

    .card {
        border: none;
        border-radius: 3px;
        background: $c-c;
        @include flexCenter();
        flex-direction: column;
        cursor: pointer;
        transition: .3s;
        position: relative;
        z-index: 1;

        &_stickers {
            display: flex;
            z-index: 0;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: 0;
            visibility: hidden;
            opacity: 0;
            background-color: $c-green-theme;
            transition: all .3s ease-in-out;

            .favourite, .cancel, .addmylist {
                padding: 10px;
                transition: all .3s ease-in-out;
                @include flexCenter();

                i {
                    font-size: 20px;
                    color: $c-white;
                    transition: .3s ease-in-out;
                }

                &:hover {
                    background-color: $c-white;

                    i {
                        color: $c-green-theme;
                    }
                }
            }
        }

        &_image {
            width: 100%;
            height: 100%;
            overflow: hidden;

            img {
                transition: .3s;
                @include object-fit();
                width: 100%;
                height: 100%;
            }
        }

        &_title {
            transition: .3s;
            font-size: 22px;
            color: $c-3;
            text-align: center;
            margin: 20px 0 0;

            @media #{$r-max-tablet} {
                font-size: 20px;
            }
        }

        &_realease {
            transition: .3s;
            color: $c-3;
            text-align: center;
            margin: 5px 0;
            font-weight: 600;
            font-size: 18px;

            @media #{$r-max-tablet} {
                font-size: 16px;
            }
        }

        &_bottom {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-evenly;
            margin: 10px 0;
            color: $c-3;
            transition: .3s;

            &-comments, &-likes, &-dislikes {
                font-weight: 600;
                font-size: 14px;
                margin: 0 10px;
                display: flex;
                align-items: center;

                @media #{$r-max-tablet} {
                    font-size: 13px;
                }

                i {
                    margin-right: 3px;
                    font-size: 14px;
                }
            }
        }

        &:hover {
            background-color: $c-green-theme;

            .card_image img {
                transform: scale(1.1);
            }

            .card_stickers {
                top: -40px;
                visibility: visible;
                opacity: 1;
            }

            .card_title, .card_realease, .card_bottom {
                color: $c-white;
            }
        }

        .icons {
            width: 100%;
            display: flex;
            justify-content: center;

            .update-btn {
                background: transparent;
                border: none;
                font-size: 30px;
                cursor: pointer;
                transition: .4s;
                color: $c-3;

                &:hover {
                    transform: scale(1.2);
                }
            }

            .delete-btn {
                background: transparent;
                border: none;
                font-size: 30px;
                cursor: pointer;
                transition: .4s;
                color: $c-error;

                &:hover {
                    transform: scale(1.2);
                }
            }
        }
    }
}
</style>