<template>
    <div class="search-box">
        <input
            v-if="searchTpye == 'movies'"
            class="search-box_input"
            type="text"
            name="search"
            v-model="searchText"
            placeholder="Type here to search..." />

        <input
            v-if="searchTpye == 'users'"
            class="search-box_input"
            type="text"
            name="search"
            v-model="$store.state.adminUsersFilter"
            placeholder="Type here to search..." />

        <input
            v-if="searchTpye == 'categories'"
            class="search-box_input"
            type="text"
            name="search"
            v-model="$store.state.adminCategoriesFilter"
            placeholder="Type here to search..." />

        <div class="search-box_results" v-if="this.searchText.length > 0 && searchTpye == 'movies'">
            <span class="header-span"></span>
            <div class="header">
                <h4 class="header-text">{{ filterMovies(this.searchText).length > 1 ? 'Results:' : 'Result:' }} {{ filterMovies(this.searchText).length }}</h4>
            </div>
            <div class="container" v-for="(item, index) in filterMovies(this.searchText)" :key="index">
                <router-link class="container_box" :to="{ path: '/detailsadmin/' + item.id }">
                    <div class="container_box--image">
                        <img class="img" alt="filter picture" :src="require('../../../../server/uploads/movies/' + item.image)" />
                    </div>
                    <div class="container_box--title">{{ item.movieName }}</div>
                    <div class="container_box--date">{{ item.releaseDate }}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

    export default {
        name: "AdminSearchBar",
        data() {
            return {
                searchText: ""
            }
        },
        props: {
            searchTpye: String
        },
        computed: {
            ...mapGetters({
                filterMovies: 'filterMovies'
            }),
        }
    }
</script>

<style lang="scss" scoped>
.search-box {
    background-color: transparent;
    padding: 20px 0;
    position: relative;

    &_input {
        width: 50%;
        margin: 0 auto;
        border: none;
        background-color: $c-white;
        border-radius: 5px;
        padding: 10px 20px;
        font-size: 18px;
        font-family: $c-main-font;
        color: $c-3;

        &:focus {
            outline: 3px solid $c-green-theme;
        }
    }

    &_results {
        position: absolute;
        z-index: 5;
        top: 65px;
        left: 0;
        background-color: $c-c;
        width: 400px;
        max-height: 300px;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        overflow-y: scroll;

        @media #{$r-max-laptop-s} {
            top: 30px;
            left: -380px;
            transform: translateX(0);
        }

        @media #{$r-max-mobile-l} {
            width: 300px;
            left: -265px;
        }

        .header {
            position: relative;

            &::before {
                width: 0; 
                height: 0; 
                border-left: 20px solid transparent;
                border-right: 20px solid transparent;
                border-bottom: 20px solid $c-c;
                position: fixed;
                z-index: 5;
                content: "";
                top: -40px;
                left: 50%;
                transform: translateX(-50%);
            }

            &-text {
                color: $c-3;
                text-align: center;
            }
        }

        .container {
            position: relative;

            &_box {
                display: flex;
                align-items: center;
                justify-content: space-between;
                height: 70px;
                padding: 5px;
                margin: 5px 10px;
                border-bottom: 1px solid $c-3;
                cursor: pointer;
                text-decoration: none;

                @media #{$r-max-mobile-l} {
                    flex-direction: column;
                    height: auto;
                }

                &--image {
                    height: 100%;
                    width: 120px;

                    @media #{$r-max-mobile-l} {
                        height: 150px;
                        width: 250px;
                    }

                    .img {
                        width: 100%;
                        height: 100%;
                        object-fit: cover;
                        object-position: center;
                    }
                }

                &--title, &--date {
                    color: $c-dark-theme;
                    font-size: 16px;
                    font-weight: 700;

                    @media #{$r-max-mobile-l} {
                        margin: 5px 0;
                    }
                }

                &:hover {
                    background-color: $c-dark-theme;

                    .container_box--title, .container_box--date {
                        color: $c-white;
                    }
                }
            }
        }
    }
}
</style>