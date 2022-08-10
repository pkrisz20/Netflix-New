<template>
    <div class="movies">
        <BackButton />
        <LoadingScreen v-if="this.requestStatus != 200" />
        <Header />
        <BlockTitle :title=category />
        <div class="emptylist" v-if="this.notFound">Not found any movie like this in the database.</div>
        <MovieList :movies=this.moviesByCategory />
    </div>
</template>

<script>
import LoadingScreen from "@/components/global/LoadingScreen.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import Header from "@/components/guest/Header.vue";
import MovieList from "@/components/global/MovieList.vue";
import BackButton from "@/components/global/BackButton.vue";
import Axios from "axios";

    export default {
        name: "MoviesGuest",
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
            Header,
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
                });
            }
        },
        mounted() {
            this.getMoviesByCategory();
            this.$store.dispatch('getAllMovies');
            this.$store.dispatch("getLikes");
            this.$store.dispatch("getEachComment");
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

    .block_title {
        padding: 110px 15px 0;
    }

    .movies_list {
        .movies_section {
            background-color: $c-3;
        }
    }
}
</style>