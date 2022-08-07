<template>
    <div class="favourites">
        <HeaderUser />
        <BackButton />
        <BlockTitle :title="`My Favourites (${this.$store.getters.favouritesCount})`" />
        
        <div class="favourites-container">
            <div class="wrapper">
                <Filters :insideOf="'Favs'" @clearFiltering="clearFilter" :clearButton=filteredFavs.length />
            </div>
            <div class="emptylist" v-if="favourites == 0">You haven't added any movie to your favourites list yet.</div>
            <MovieList :movies=favourites v-if="favourites != 0 && filteredFavs == 0" />
            <MovieList :movies=filteredFavs v-if="filteredFavs != 0" />
            <div class="emptylist" v-if="notFound">Not found any movie like this in your favourites list</div>
        </div>
    </div>
</template>

<script>
import BlockTitle from "@/components/global/BlockTitle.vue";
import HeaderUser from "@/components/user/HeaderUser.vue";
import MovieList from "@/components/global/MovieList.vue";
import Filters from "@/components/user/Filters.vue";
import BackButton from "@/components/global/BackButton.vue";
import { mapState } from "vuex";

export default {
    name: "Favourites",
    components: {
        HeaderUser,
        MovieList,
        Filters,
        BackButton,
        BlockTitle
    },
    computed: {
        ...mapState({
            favourites: state => state.favourites,
            filteredFavs: state => state.filteredFavs,
            notFound: state => state.notFound
        })
    },
    methods: {
        clearFilter() {
            this.$store.state.filteredFavs = [];
        }
    },
    mounted() {
        this.$store.dispatch("getAllMovies");
        this.$store.dispatch("getLikes");
        this.$store.dispatch("getEachComment");
        this.$store.dispatch("getFavourites");
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

.favourites {
    background-color: $c-3;
    min-height: 100vh;

    &-container {
        padding-top: 20px;
        text-align: center;

        .wrapper {
            @media #{$r-max-laptop-m} {
                width: calc(100% - 30px);
            }
        }
    }

    &-title {
        color: $c-white;
        margin: 30px 0 60px;
        font-size: 30px;
        text-decoration: underline;
        text-underline-offset: 5px;
    }

    .movies_section {
        background-color: $c-3;
    }
}
</style>