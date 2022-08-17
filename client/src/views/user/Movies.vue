<template>
    <div class="movies">
        <LoadingScreen v-if="this.requestStatus != 200" />
        <HeaderUser />
        <BackButton />
        <BlockTitle :title=category />
        <div class="emptylist" v-if="this.notFound">Not found any movie like this in the database.</div>
        <MovieList :movies=this.moviesByCategory />
    </div>
</template>

<script>
import LoadingScreen from "@/components/global/LoadingScreen.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import HeaderUser from "@/components/user/HeaderUser.vue";
import MovieList from "@/components/global/MovieList.vue";
import BackButton from "@/components/global/BackButton.vue";
import Axios from "axios";

export default {
    name: "MoviesUser",
    data() {
        return {
            requestStatus: 0,
            moviesByCategory: [],
            notFound: false,
            categoryParam: this.$route.params.category,
        }
    },
    props: { category: String },
    components: {
        HeaderUser,
        LoadingScreen,
        MovieList,
        BackButton,
        BlockTitle
    },
    methods: {
        async getMoviesByCategory() {
            await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getbycategory/${this.categoryParam}`)
            .then((response) => {
                if (!response.data.status) {
                    this.notFound = true;
                }

                else if (response.data.status) {
                    this.moviesByCategory = response.data.result;
                }
                setTimeout(() => {
                    this.requestStatus = 200;
                }, 500);
            })
            .catch(error => {
                if (error.response.status >= 500 && error.response.status <= 599) {
                    this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
                }
            });
        }
    },
    mounted() {
        this.getMoviesByCategory();
        this.$store.dispatch('getAllMovies');
        this.$store.dispatch("getEachComment");
        this.$store.dispatch('getLikes');
        this.$store.dispatch('getFavourites');
        this.$store.dispatch("getMyList");
    }
}
</script>

<style lang="scss">
.emptylist {
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

.movies {
    background-color: $c-3;
    min-height: 100vh;

    .movies_section {
        background-color: $c-3;
    }
}
</style>