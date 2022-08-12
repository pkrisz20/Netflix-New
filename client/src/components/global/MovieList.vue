<template>
<div class="movies_list">
    <div class="modal-vue" v-if="this.showModal">
        <div class="overlay" @click="openModal()"></div>
        <div class="modal">
            <button class="close" @click="openModal()"><i class="fas fa-times"></i></button>
            <h3 class="">Share with</h3>
            <div class="icons">
                <a @click="generateURLs('facebook')" :href="this.generatedURL" target="blank" class="icons-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 408.788 408.788" style="enable-background:new 0 0 408.788 408.788" xml:space="preserve"><path style="fill:#475993" d="M353.701 0H55.087C24.665 0 .002 24.662.002 55.085v298.616c0 30.423 24.662 55.085 55.085 55.085h147.275l.251-146.078h-37.951a8.954 8.954 0 0 1-8.954-8.92l-.182-47.087a8.955 8.955 0 0 1 8.955-8.989h37.882v-45.498c0-52.8 32.247-81.55 79.348-81.55h38.65a8.955 8.955 0 0 1 8.955 8.955v39.704a8.955 8.955 0 0 1-8.95 8.955l-23.719.011c-25.615 0-30.575 12.172-30.575 30.035v39.389h56.285c5.363 0 9.524 4.683 8.892 10.009l-5.581 47.087a8.955 8.955 0 0 1-8.892 7.901h-50.453l-.251 146.078h87.631c30.422 0 55.084-24.662 55.084-55.084V55.085C408.786 24.662 384.124 0 353.701 0z"/></svg>
                </a>
                <a @click="generateURLs('telegram')" :href="this.generatedURL" target="blank" class="icons-link">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Telegram" viewBox="0 0 512 512"><rect width="512" height="512" rx="15%" fill="#37aee2"/><path fill="#c8daea" d="M199 404c-11 0-10-4-13-14l-32-105 245-144"/><path fill="#a9c9dd" d="M199 404c7 0 11-4 16-8l45-43-56-34"/><path fill="#f6fbfe" d="m204 319 135 99c14 9 26 4 30-14l55-258c5-22-9-32-24-25L79 245c-21 8-21 21-4 26l83 26 190-121c9-5 17-3 11 4"/></svg>
                </a>
                <a @click="generateURLs('gmail')" :href="this.generatedURL" target="blank" class="icons-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><path style="fill:#e6f3ff" d="M512 105.739v300.522c0 27.715-22.372 50.087-50.087 50.087H50.087C22.372 456.348 0 433.976 0 406.261V105.739c0-.89 0-1.781.111-2.671 1.336-25.6 21.704-45.969 47.304-47.304.89-.111 1.781-.111 2.671-.111h411.826c.89 0 1.892 0 2.783.111 25.489 1.336 45.857 21.704 47.193 47.193.112.89.112 1.892.112 2.782z"/><path style="fill:#cfdbe6" d="M464.696 55.763c-.892-.111-1.891-.111-2.783-.111H256v400.696h205.913c27.715 0 50.087-22.372 50.087-50.087V105.739c0-.89 0-1.892-.111-2.783-1.336-25.488-21.705-45.857-47.193-47.193z"/><path style="fill:#ff4b26" d="M511.889 102.957c-1.336-25.489-21.704-45.857-47.193-47.193L256 264.459C225.291 233.732 77.61 85.958 47.416 55.763 21.816 57.099 1.447 77.467.112 103.067 0 103.958 0 104.849 0 105.739v300.522c0 27.715 22.372 50.087 50.087 50.087h16.696V169.739l165.621 165.51c6.456 6.567 15.026 9.795 23.597 9.795 8.57 0 17.141-3.228 23.597-9.795l165.621-165.621v286.72h16.696c27.715 0 50.087-22.372 50.087-50.087V105.739c-.002-.89-.002-1.892-.113-2.782z"/><path style="fill:#d93f21" d="m279.596 335.249 165.621-165.621v286.72h16.696c27.715 0 50.087-22.372 50.087-50.087V105.739c0-.89 0-1.892-.111-2.783-1.336-25.489-21.704-45.857-47.193-47.193L256 264.459v80.584c8.57 0 17.141-3.227 23.596-9.794z"/></svg>
                </a>
                <a @click="generateURLs('linkedin')" :href="this.generatedURL" target="blank" class="icons-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 382 382" style="enable-background:new 0 0 382 382" xml:space="preserve"><path style="fill:#0077b7" d="M347.445 0H34.555C15.471 0 0 15.471 0 34.555v312.889C0 366.529 15.471 382 34.555 382h312.889C366.529 382 382 366.529 382 347.444V34.555C382 15.471 366.529 0 347.445 0zM118.207 329.844c0 5.554-4.502 10.056-10.056 10.056H65.345c-5.554 0-10.056-4.502-10.056-10.056V150.403c0-5.554 4.502-10.056 10.056-10.056h42.806c5.554 0 10.056 4.502 10.056 10.056v179.441zM86.748 123.432c-22.459 0-40.666-18.207-40.666-40.666S64.289 42.1 86.748 42.1s40.666 18.207 40.666 40.666-18.206 40.666-40.666 40.666zM341.91 330.654a9.247 9.247 0 0 1-9.246 9.246H286.73a9.247 9.247 0 0 1-9.246-9.246v-84.168c0-12.556 3.683-55.021-32.813-55.021-28.309 0-34.051 29.066-35.204 42.11v97.079a9.246 9.246 0 0 1-9.246 9.246h-44.426a9.247 9.247 0 0 1-9.246-9.246V149.593a9.247 9.247 0 0 1 9.246-9.246h44.426a9.247 9.247 0 0 1 9.246 9.246v15.655c10.497-15.753 26.097-27.912 59.312-27.912 73.552 0 73.131 68.716 73.131 106.472v86.846z"/></svg>
                </a>
                <a @click="generateURLs('reddit')" :href="this.generatedURL" target="blank" class="icons-link">
                    <svg xmlns="http://www.w3.org/2000/svg" aria-label="Reddit" viewBox="0 0 512 512"><rect width="512" height="512" rx="15%" fill="#f40"/><g fill="#fff"><ellipse cx="256" cy="307" rx="166" ry="117"/><circle cx="106" cy="256" r="42"/><circle cx="407" cy="256" r="42"/><circle cx="375" cy="114" r="32"/></g><g stroke-linecap="round" stroke-linejoin="round" fill="none"><path d="m256 196 23-101 73 15" stroke="#fff" stroke-width="16"/><path d="M191 359c33 25 97 26 130 0" stroke="#f40" stroke-width="13"/></g><g fill="#f40"><circle cx="191" cy="287" r="31"/><circle cx="321" cy="287" r="31"/></g></svg>
                </a>
                <a @click="generateURLs('twitter')" :href="this.generatedURL" target="blank" class="icons-link">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512.002 512.002" style="enable-background:new 0 0 512.002 512.002" xml:space="preserve"><path style="fill:#73a1fb" d="M500.398 94.784a194.219 194.219 0 0 1-24.763 9.023 109.468 109.468 0 0 0 22.287-39.193 8.258 8.258 0 0 0-12.078-9.619c-17.945 10.643-37.305 18.292-57.605 22.764-20.449-19.981-48.222-31.353-76.934-31.353-60.606 0-109.913 49.306-109.913 109.91 0 4.773.302 9.52.9 14.201-75.206-6.603-145.124-43.568-193.136-102.463a8.259 8.259 0 0 0-13.537 1.061c-9.738 16.709-14.886 35.82-14.886 55.265 0 26.484 9.455 51.611 26.158 71.246a93.118 93.118 0 0 1-14.711-6.568 8.26 8.26 0 0 0-12.267 7.03c-.012.487-.012.974-.012 1.468 0 39.531 21.276 75.122 53.805 94.52a94.762 94.762 0 0 1-8.362-1.214 8.254 8.254 0 0 0-7.731 2.638 8.25 8.25 0 0 0-1.681 7.994c12.04 37.591 43.039 65.24 80.514 73.67-31.082 19.468-66.626 29.665-103.939 29.665-7.786 0-15.616-.457-23.279-1.364A8.258 8.258 0 0 0 3.8 418.617c47.935 30.735 103.361 46.98 160.284 46.98 111.903 0 181.907-52.769 220.926-97.037 48.657-55.199 76.562-128.261 76.562-200.451 0-3.016-.046-6.061-.139-9.097 19.197-14.463 35.724-31.967 49.173-52.085a8.256 8.256 0 0 0-.545-9.906 8.245 8.245 0 0 0-9.663-2.237z"/></svg>
                </a>
            </div>
        </div>
    </div>

    <div class="movies_section">
        <div class="error" v-if="message">{{ message }}</div>
        <div class="error" v-if="messageFromList">{{ messageFromList }}</div>

        <div class="wrapper">
            <div class="listCards">

                <div class="card" v-for="item in movies" :key="item.id" data-aos="fade-up">
                    <div class="card_stickers">
                        <div class="info" @click="routeToDetails(item.id)">
                            <i class="fas fa-info-circle"></i>
                        </div>
                        <div class="share" @click="openModal(item.id)">
                            <i class="fas fa-share"></i>
                        </div>
                        <div class="favourite" @click="addToFavourites(item.id)" v-if="!isFavourite(item.id) && loginStatus">
                            <i class="fas fa-heart"></i>
                        </div>
                        <div class="cancel" @click="removeFavourite(item.id)" v-if="isFavourite(item.id) && loginStatus">
                            <i class="fas fa-ban"></i>
                        </div>
                        <div class="addmylist" @click="addMyList(item.id)" v-if="!isOnMyList(item.id) && loginStatus">
                            <i class="fas fa-plus"></i>
                        </div>
                        <div class="cancel" @click="removeMyList(item.id)" v-if="isOnMyList(item.id) && loginStatus">
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
    data() {
        return {
            message: "",
            showModal: false,
            userIdShare: null,
            endpoint: "/detailsguest/",
            generatedURL: ""
        }
    },
    computed: {
        ...mapState({
            loginStatus: state => state.isLoggedIn,
            messageFromList: state => state.messageFromList
        }),
        ...mapGetters({
            comments: 'getCommentsForList',
            dislikes: 'getDislikesCount',
            likes: 'getLikesCount',
            isFavourite: 'checkIsFavourite',
            isOnMyList: 'isOnMyList'
        }),
        // encodedURL() {
        //     return encodeURIComponent(this.generatedURL);
        // }
    },
    methods: {
        openModal(movieId) {
            this.showModal = !this.showModal;

            if (this.showModal) {
                this.userIdShare = movieId;
            }
            else if (!this.showModal) {
                this.userIdShare = null;
            }
        },
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
        generateURLs(item) {
            if (item == 'facebook') {
                this.generatedURL =  'http://www.facebook.com/sharer/sharer.php?u=' + window.location.hostname + this.endpoint + this.userIdShare;
            }
            else if (item == 'twitter') {
                this.generatedURL =  'https://twitter.com/intent/tweet?&url=' + window.location.hostname + this.endpoint + this.userIdShare;
            }
            else if (item == 'linkedin') {
                this.generatedURL = 'http://www.linkedin.com/shareArticle?mini=true&url=' + window.location.hostname + this.endpoint + this.userIdShare;
            }
            else if (item == 'telegram') {
                this.generatedURL = 'https://t.me/share/url?url=' + window.location.hostname + this.endpoint + this.userIdShare;
            }
            else if (item == 'reddit') {
                this.generatedURL = 'https://www.reddit.com/submit?url=' + window.location.hostname + this.endpoint + this.userIdShare;
            }
            else if (item == 'gmail') {
                this.generatedURL = 'https://mail.google.com/mail/u/0/?body=' + window.location.hostname + this.endpoint + this.userIdShare;
            }
            console.log(this.generatedURL);
        },
        async addToFavourites(movie) {
            await Axios.post(`${process.env.VUE_APP_API_URL}/movies/addfavourite/${movie}`)
            .then((response) => {
                this.$store.commit("SET_MESSAGE", response.data);
                this.$store.dispatch("getFavourites");
            })
            .catch(function (error) {
                if (error.response.status >= 500 && error.response.status <= 599) {
                    commit('SET_SERVER_ERROR_STATUS', error.response);
                }
            });
        },
        async removeFavourite(movie) {
            await Axios.delete(`${process.env.VUE_APP_API_URL}/movies/removefavourite/${movie}`)
            .then((response) => {
                this.$store.commit("SET_MESSAGE", response.data);
                this.$store.dispatch("getFavourites");
            })
            .catch(function (error) {
                if (error.response.status >= 500 && error.response.status <= 599) {
                    commit('SET_SERVER_ERROR_STATUS', error.response);
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
.error {
    width: auto;
    padding: 20px;
    font-size: 20px;
    color: $c-white;
    background: $c-error;
    border-radius: 10px;
    border: 6px solid #b10101;
    z-index: 10;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    @include flexCenter();
    pointer-events: none;
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
        background-color: #fff;

        .close {
            position: absolute;
            top: 10px;
            right: 10px;
            padding: 6px;
            background-color: $c-red;
            border: none;
            cursor: pointer;
            border-radius: 5px;

            i {
                font-size: 18px;
                color: $c-white;
                transform: translateY(2px);
            }
        }

        .icons {
            display: grid;
            grid-template-columns: repeat(2, auto);
            justify-content: center;
            column-gap: 60px;
            row-gap: 40px;

            &-link {
                text-decoration: none;
                cursor: pointer;

                svg {
                    width: 40px;
                    height: 40px;
                }
            }
        }
    }
}

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
    row-gap: 15px;
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
        overflow: hidden;
        transition: .3s;
        position: relative;

        &_stickers {
            z-index: 4;
            position: absolute;
            right: -40px;
            top: 10px;
            background-color: $c-green-theme;
            transition: right .3s ease;

            .info, .share, .favourite, .cancel, .addmylist {
                padding: 10px;
                transition: all .3s ease-in-out;
                @include flexCenter();

                i {
                    font-size: 20px;
                    color: $c-white;
                }

                &:hover {
                    background-color: $c-dark-theme;
                }
            }
        }

        &_image {
            transition: .3s;
            width: 100%;
            height: 100%;

            img {
                @include object-fit();
                width: 100%;
                height: 100%;
            }
        }

        &_title {
            transition: .3s;
            font-size: 28px;
            color: $c-3;
            text-align: center;
            margin: 15px 0 10px;

            @media #{$r-max-tablet} {
                font-size: 22px;
            }
        }

        &_realease {
            transition: .3s;
            color: $c-3;
            text-align: center;
            margin: 5px 0;
            font-weight: 600;
            font-size: 20px;

            @media #{$r-max-tablet} {
                font-size: 18px;
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
                font-size: 18px;
                margin: 0 10px;
                display: flex;
                align-items: center;

                @media #{$r-max-tablet} {
                    font-size: 14px;
                }

                i {
                    margin-right: 3px;
                    font-size: 16px;

                    @media #{$r-max-tablet} {
                        font-size: 12px;
                    }
                }
            }
        }

        &:hover {
            background-color: $c-green-theme;

            .card_image {
                transform: scale(1.1);
            }

            .card_stickers {
                right: 0;
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

    .fade-enter-active, .fade-leave-active {
        transition: all .5s;
    }
    .fade-enter, .fade-leave-to {
        opacity: 0;
        transform: translateY(30px);
    }
}
</style>