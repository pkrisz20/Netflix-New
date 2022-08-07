<template>
<div>
    <HeaderAdmin />
    <div class="bg-linear">
        <div class="modal-vue" v-if="this.showModal">
            <div class="overlay" @click="openModal()"></div>
            <div class="modal">
                <h3 class="">Are you sure you want to delete this movie?</h3>
                <div class="operations">
                    <button @click="deleteMovie()" class="operations_btn delete">DELETE</button>
                    <button @click="openModal()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <AddMovieForm ref="updateForm" :action="'update'" />

        <div class="container" v-for="item in getMovieDetails" :key="item.id">
            <img v-if="item.image == null" class="cover-image" alt="background" src="../../assets/images/black_bg.jpg">
            <img v-else-if="item.image != null" class="cover-image" alt="background" :src="getImagePath(item.image)">

            <!-- <div class="success" v-if="favouriteSuccess">{{ favouriteSuccess }} <i @click="closeMessage" class="fas fa-times"></i></div> -->

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
                    <button @click="openModal(item.id)" class="btn delete"><i class="fas fa-trash"></i> DELETE MOVIE</button>
                    <button @click="openUpdateForm()" class="btn update"><i class="fas fa-edit"></i> UPDATE MOVIE</button>
                </div>
            </div>
        </div>
        <Comments :movieID=this.movieId />
    </div>
</div>
</template>

<script>
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import Comments from "@/components/user/Comments.vue";
import AddMovieForm from "@/components/admin/AddMovieForm.vue";
import { mapState, mapGetters } from "vuex";

    export default {
        name: "AdminMoviedetails",
        components: {
            Comments,
            HeaderAdmin,
            AddMovieForm
        },
        data() {
            return {
                movieId: this.$route.params.movieId,
                success: "",
                showModal: false
            }
        },
        methods: {
            scrollToTop() {
                window.scrollTo(0, 0);
            },
            closeMessage() {
                this.success = '';
            },
            getImagePath (image) {
                return require('../../../../server/uploads/movies/' + image);
            },
            openModal() {
                this.showModal = !this.showModal;
            },
            deleteMovie() {
                this.$store.dispatch("deleteMovie", this.movieId);
                this.$router.push({ name: 'AdminPanel'});
            },
            openUpdateForm() {
                this.$refs.updateForm.openModal();
            }
        },
        computed: {
            ...mapState({
                getMovieDetails: state => state.movieDetails,
                getCategories: state => state.categoriesDetails,
                successMyList: state => state.messageFromList
            }),
            ...mapGetters({
                isLiked: 'isLikedMovie',
                isDisliked: 'isDislikedMovie',
                isOnMyList: 'isOnMyList'
            })
        },
        created() {
            this.$store.dispatch("getMovieDetails", this.movieId);
            this.$store.dispatch("getLikes");
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

    .modal-vue {
        position: fixed;
        z-index: 999;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        @include flexCenter();

        .overlay {
            position: fixed;
            top: 0;
            left: 0;
            z-index: 998;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.7);
        }

        .modal {
            position: relative;
            width: 300px;
            z-index: 1000;
            padding: 20px 30px;
            background-color: $c-white;
            text-align: center;

            .operations {
                display: flex;
                justify-content: center;

                &_btn {
                    cursor: pointer;
                    padding: 12px 18px;
                    border: none;
                    border-radius: 5px;
                    margin: 0 10px;
                    color: $c-white;
                    font-weight: 700;
                    font-family: $c-main-font;

                    &.delete {
                        background-color: $c-red;
                    }

                    &.cancel {
                        background-color: $c-blue;
                    }
                }
            }
        }
    }

    .container {
        width: 100%;
        height: 100vh;
        position: relative;

        @media #{$r-max-tablet} {
            min-height: 100%;
        }

        .success {
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

                @media #{$r-max-mobile-s} {
                    display: flex;
                    flex-direction: column;
                }

                .btn {
                    padding: 16px 24px;
                    color: $c-white;
                    margin: 0 20px;
                    font-size: 18px;
                    border-radius: 3px;
                    border: none;
                    cursor: pointer;
                    transition: .3s;
                    font-family: $c-main-font;

                    @media #{$r-max-laptop-s} {
                        margin: 0 10px;
                        font-size: 15px;
                    }

                    &.delete {
                        background-color: $c-red;

                        &:hover {
                            background-color: $c-youtube;
                        }
                    }

                    &.update {
                        background-color: $c-blue;

                        &:hover {
                            background-color: $c-middleblue;
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
                    display: flex;
                    align-items: center;
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

                        &.like {
                            background-color: $c-blue;
                        }

                        &.dislike {
                            background-color: $c-error;
                        }
                    }
                }

                .movieliked {
                    transform: scale(1.1);
                    background-color: $c-blue;
                }

                .moviedisliked {
                    transform: scale(1.1);
                    background-color: $c-error;
                }
            }
        }
    }
}
</style>