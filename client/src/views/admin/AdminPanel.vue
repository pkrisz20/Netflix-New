<template>
    <div class="admin_view">
        <HeaderAdmin />
        <AddMovieForm ref="insertForm" :action="'insert'" />
        <AddMovieForm ref="updateForm" :action="'update'" />
        <div class="wrapper">
            <AdminSearchBar :searchTpye="'movies'" />
            <button @click="openInsertForm()" class="upload"><i class="fas fa-plus"></i> Add new movie</button>
            <Filters :insideOf="'All'" @clearFiltering="clearFilter()" :clearButton=filteredMovies.length />
            <div class="emptylist" v-if="notFound">Not found any movie like this</div>
            <h4 class="count">Movies count: {{ $store.getters.getMoivesCount }}</h4>
        </div>

        <AdminMovieList
            v-if="list != 0 && filteredMovies == 0"
            :movies=list
            @openUpdateForm="openUpdateForm()" />

        <AdminMovieList
            v-if="filteredMovies != 0"
            :movies=filteredMovies
            @openUpdateForm="openUpdateForm()" />
    </div>
</template>

<script>
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import AdminMovieList from "@/components/admin/AdminMovieList.vue";
import AddMovieForm from "@/components/admin/AddMovieForm.vue";
import Filters from "@/components/user/Filters.vue";
import AdminSearchBar from "@/components/admin/AdminSearchBar.vue";
import { mapState } from "vuex";

    export default {
        name: "AdminPanel",
        components: {
            HeaderAdmin,
            AdminMovieList,
            Filters,
            AddMovieForm,
            AdminSearchBar
        },
        methods: {
            openInsertForm() {
                this.$refs.insertForm.openModal();
            },
            openUpdateForm() {
                this.$refs.updateForm.openModal();
            },
            clearFilter() {
                this.$store.state.filteredMovies = [];
            }
        },
        computed: {
            ...mapState({
                list: state => state.list,
                filteredMovies: state => state.filteredMovies,
                notFound: state => state.notFound
            }),
        },
        mounted() {
            this.$store.dispatch('getAllMovies');
            this.$store.dispatch("getEachComment");
            this.$store.dispatch("getLikes");
        },
    }
</script>

<style lang="scss" scoped>
.admin_view {
    background-color: $c-6;
    min-height: 100vh;

    .wrapper {
        padding-top: 80px;

        .count {
            color: $c-white;
            margin: 10px auto;
            letter-spacing: 2px;
        }

        .upload {
            cursor: pointer;
            padding: 12px 18px;
            border: none;
            border-radius: 3px;
            font-size: 12px;
            letter-spacing: 2px;
            text-transform: uppercase;
            margin: 0 0 20px;
            color: $c-white;
            font-weight: 900;
            background-color: $c-green-theme;

            i {
                font-size: 16px;
                color: $c-white;
            }
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