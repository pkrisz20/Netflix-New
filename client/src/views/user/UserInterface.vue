<template>
    <div class="userinterface">
        <HeaderUser />
        <HeroUser />
        
        <div class="main_sliders">
            <BlockTitle class="first" :title="'Top Movies nowdays'" />
            <MovieCarousel :movies=topMovies />

            <BlockTitle class="left-side" :title="'Sci-Fi and Fantasy'" />
            <MovieCarousel :categories="['Sci-Fi', 'Fantasy']" />

            <BlockTitle class="left-side" :title="'Erotic movies'" />
            <MovieCarousel :categories="['Erotic']" />

            <BlockTitle class="left-side" :title="'Based on True Events'" />
            <MovieCarousel :categories="['True Story']" />

            <BlockTitle class="left-side" :title="'Horrors and Thrillers'" />
            <MovieCarousel :categories="['Horror', 'Thriller']" />

            <BlockTitle class="left-side" :title="'War and Military'" />
            <MovieCarousel :categories="['Military']" />

            <BlockTitle class="left-side" :title="'Disaster movies'" />
            <MovieCarousel :categories="['Disaster']" />

            <BlockTitle class="left-side" :title="'Western movies'" />
            <MovieCarousel :categories="['Western']" />

            <BlockTitle class="left-side" :title="'Animated'" />
            <MovieCarousel :categories="['Animated']" />

            <div class="wrapper">
                <BlockTitle :title="'All categories'" />
                <Filters :insideOf="'All'" @clearFiltering="clearFilter" :clearButton=filteredMovies.length />
                <div class="emptylist" v-if="notFound">Not found any movie like this</div>
            </div>
        </div>

        <MovieList :movies=list v-if="list != 0 && filteredMovies == 0" />
        <MovieList :movies=filteredMovies v-if="filteredMovies != 0" />
        <Footer v-if="scrollPosition > 500"/>
    </div>
</template>

<script>
import Axios from "axios";
import Footer from "@/components/global/Footer.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import HeaderUser from "@/components/user/HeaderUser.vue";
import HeroUser from "@/components/user/HeroUser.vue";
import MovieCarousel from "@/components/user/MoviesCarousel.vue";
import MovieList from "@/components/global/MovieList.vue";
import Filters from "@/components/user/Filters.vue";
import { mapState } from "vuex";

    export default {
        name: "Userinterface",
        components: {
            HeaderUser,
            HeroUser,
            MovieCarousel,
            BlockTitle,
            MovieList,
            Filters,
            Footer
        },
        data() {
            return {
                topMovies: [],
                scrollPosition: 0,
            }
        },
        computed: {
            ...mapState({
                list: state => state.list,
                filteredMovies: state => state.filteredMovies,
                notFound: state => state.notFound,
            }),
        },
        methods: {
            clearFilter() {
                this.$store.state.filteredMovies = [];
            },
            updateScroll() {
                this.scrollPosition = window.scrollY;
            },
            async getTopMovies() {
                await Axios.get(`${process.env.VUE_APP_API_URL}/movies/topmovies`)
                .then(response => {
                    if (response.data.status) {
                        this.topMovies = response.data.result;
                    }
                    else if (!response.data.status) {
                        console.log("Error movie carousels with top movies request");
                    }
                })
                .catch(function (error) {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            }
        },
        created() {
            console.log('belepes');
            window.addEventListener('scroll', this.updateScroll);
            this.$store.dispatch('getAllMovies');
            this.$store.dispatch("getEachComment");
            this.$store.dispatch('getLikes');
            this.$store.dispatch('getFavourites');
            this.$store.dispatch("getMyList");
            this.getTopMovies();
        }
    }
</script>

<style lang="scss" scoped>
.userinterface {
    background-color: $c-dark-theme;
    position: relative;
    z-index: 0;

    .main_sliders {
        background-color: $c-dark-theme;    //because of the footer
    }

    .first {
        justify-content: flex-start;
        padding: 0 15px 0;
        margin: -160px 0 40px;

        @media #{$r-max-tablet} {
            justify-content: center;
        }
    }

    .left-side {
        padding: 50px 15px 0;
        justify-content: flex-start;

        @media #{$r-max-tablet} {
            justify-content: center;
        }
    }

    .wrapper {
        @media #{$r-max-laptop-m} {
            width: calc(100% - 30px);
        }

        .searchDetailes {
            margin-top: 60px;
        }

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
    }
}
</style>