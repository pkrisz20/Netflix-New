<template>
    <div class="searchDetailes">

        <div class="searchDetailes__buttons">
            <button class="searchDetailes__buttons-togglebutton"
                @click="toggleSearchBox"
                :class="{ opened : openSearchBox }">
                {{ openSearchBox ? 'Close' : 'Detailed search' }}
                <i class="fas fa-angle-down"></i>
            </button>

            <button class="searchDetailes__buttons-clear" @click="clearFiltering" v-if="clearButton > 0">Clear</button>
        </div>

        <transition name="slide">
            <div class="search_box" v-if="openSearchBox">

                <div class="search_box--container">
                    <div class="category" v-for="(item, index) in $store.state.categories" :key="index">
                        <input type="checkbox" :id="item.category_name" :value="item.category_name" v-model="selectedCategories" />
                        <label :for="item.category_name">{{ item.category_name }}</label>
                    </div>
                </div>

                <div class="release">
                    <div class="release_toggle">
                        <input id="toggle" class="release_toggle-btn" type="checkbox" @change="toggleDateFilter" />
                        <label for="toggle">Release date</label>
                    </div>

                    <div class="release_params">
                        <label for="from" :class="{ enable : !dateDisabled }">From:</label>
                        <input
                            :disabled="dateDisabled"
                            id="from"
                            type="number"
                            class="release_params-input"
                            v-model="filterFromYear"
                        />

                        <label for="to" :class="{ enable : !dateDisabled }">To:</label>
                        <input
                            :disabled="dateDisabled"
                            id="to"
                            type="number"
                            class="release_params-input"
                            v-model="filterToYear"
                        />
                    </div>
                </div>

                <button class="search_box--submit" @click="executeFiltering">SEARCH</button>
                <div class="search_box--message" v-if="filterError">{{ filterError }}</div>
            </div>
        </transition>
    </div>
</template>

<script>
import { mapState } from "vuex";

export default {
    name: "Filters",
    data() {
        return {
            openSearchBox: false,
            dateDisabled: true,
            selectedCategories: [],
            filterFromYear: null,
            filterToYear: null,
            filterError: ""
        }
    },
    props: { insideOf: String, clearButton: Number },
    computed: {
        ...mapState({
            filteredMovies: state => state.filteredMovies,
            filteredFavs: state => state.filteredFavs,
            filteredMyList: state => state.filteredMyList
        })
    },
    methods: {
        checkFilters() {
            if (this.selectedCategories == 0) {
                this.filterError = "Select at least a category";
                return false;
            }
            if (!this.dateDisabled) {
                
                if (!this.filterFromYear && !this.filterToYear) {
                    console.log("both empty");
                    this.filterError = "Fill at least one field, if you want to search by date";
                    return false;
                }
                if (this.filterToYear > new Date().getFullYear()) {
                    this.filterError = `Nowdays it's ${new Date().getFullYear()}, and not ${this.filterToYear}`;
                    return false;
                }
                else {
                    this.filterError = "";
                    return true;
                }
            }
            else {
                this.filterError = "";
                return true;
            }
        },
        executeFiltering() {
            if (this.checkFilters()) {
                if (this.selectedCategories != 0 && !this.filterError) {    //check again
                    //filtering favourites
                    if (this.$props.insideOf == "Favs") {
                        this.$store.dispatch("filterFavourites", [this.selectedCategories, this.filterFromYear, this.filterToYear]);
                    }
                    //filtering each movie
                    else if (this.$props.insideOf == "All") {
                        this.$store.dispatch("searchMovies", [this.selectedCategories, this.filterFromYear, this.filterToYear]);
                    }
                    // filtering my list
                    else if (this.$props.insideOf == "MyList") {
                        this.$store.dispatch("filterMyList", [this.selectedCategories, this.filterFromYear, this.filterToYear]);
                    }
                    this.toggleSearchBox();
                    this.scrollTo('.movies_section');
                }
            }
        },
        toggleSearchBox() {
            this.openSearchBox = !this.openSearchBox;
            this.dateDisabled = true;
            this.filterToYear = null;
            this.filterFromYear = null;
            this.selectedCategories = [];
            this.filterError = "";
        },

        toggleDateFilter() {
            this.dateDisabled = !this.dateDisabled;
            this.filterToYear = null;
            this.filterFromYear = null;
        },

        clearFiltering() {
            this.$emit("clearFiltering");
            this.openSearchBox = false;
            this.dateDisabled = true;
            this.filterToYear = null;
            this.filterFromYear = null;
            this.selectedCategories = [];
            this.filterError = "";
        },

        scrollTo(element) {
            window.scrollTo({
                behavior: 'smooth',
                top: document.querySelector(element).getBoundingClientRect().top - document.body.getBoundingClientRect().top - 100
            });
        }
    }
}
</script>

<style lang="scss" scoped>
.searchDetailes {

    @media #{$r-max-laptop-s} {
        @include flexCenter();
        flex-direction: column;
    }

    &__buttons {
        display: flex;
        
        &-clear {
            @include flexCenter();
            background-color: $c-d;
            border: none;
            width: 100px;
            margin-left: 15px;
            height: 48px;
            border-radius: 3px;
            cursor: pointer;
            color: $c-black;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 12px;
            font-weight: 900;
            transition: all .3s ease-in-out;
        }

        &-togglebutton {
            @include flexCenter();
            background-color: $c-green-theme;
            border: none;
            width: 230px;
            height: 48px;
            border-radius: 3px;
            cursor: pointer;
            color: $c-white;
            text-transform: uppercase;
            letter-spacing: 2px;
            font-size: 12px;
            font-weight: 900;
            transition: all .3s ease-in-out;
            position: relative;

            i {
                position: absolute;
                top: 14px;
                right: 15px;
                transition: transform .3s ease;
                font-size: 20px;
            }
        }

        .opened {
            background-color: $c-error;

            i {
                transform: rotate(180deg);
            }
        }
    }

    .search_box {
        background-color: $c-dark-theme;
        border-radius: 5px;
        width: 350px;
        padding: 15px;
        height: auto;

        @media #{$r-max-mobile-s} {
            width: 250px;
            text-align: center;
        }
        
        &--container {
            width: 100%;
            display: grid;
            grid-template-columns: repeat(2, auto);
            row-gap: 10px;
            column-gap: 10px;

            @media #{$r-max-mobile-s} {
                display: flex;
                flex-direction: column;
                column-gap: 0;
            }

            .category {
                width: 100%;
                display: flex;
                align-items: center;

                label {
                    color: $c-d;
                    margin-left: 5px;
                    cursor: pointer;
                }

                input[type="checkbox"] {
                    cursor: pointer;
                    position: relative;
                    width: 30px;
                    height: 15px;
                    background: $c-a;
                    outline: none;
                    -webkit-appearance: none;
                    border-radius: 15px;
                    box-shadow: inset 0 0 5px rgba($c-black, 0.2);
                    transition: .3s;

                    &:checked {
                        background: $c-green-theme;
                    }

                    &::before {
                        position: absolute;
                        content: '';
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        top: 0;
                        left: 0;
                        background: $c-white;
                        transform: scale(1.1);
                        box-shadow: 0 2px 5px rgba($c-black, 0.2);
                        transition: .3s;
                    }

                    &:checked::before {
                        left: 15px;
                    }
                }
            }
        }

        .release {
            margin: 25px 0 15px;
            display: flex;
            flex-direction: column;
            align-items: center;

            &_toggle {
                @include flexCenter();
                width: 100%;
                margin-bottom: 10px;

                label {
                    color: $c-d;
                    margin-left: 5px;
                    cursor: pointer;
                }

                &-btn {
                    cursor: pointer;
                    position: relative;
                    width: 30px;
                    height: 15px;
                    background: $c-a;
                    outline: none;
                    -webkit-appearance: none;
                    border-radius: 15px;
                    box-shadow: inset 0 0 5px rgba($c-black, 0.2);
                    transition: .3s;

                    &:checked {
                        background: $c-green-theme;
                    }

                    &::before {
                        position: absolute;
                        content: '';
                        width: 15px;
                        height: 15px;
                        border-radius: 50%;
                        top: 0;
                        left: 0;
                        background: $c-white;
                        transform: scale(1.1);
                        box-shadow: 0 2px 5px rgba($c-black, 0.2);
                        transition: .3s;
                    }

                    &:checked::before {
                        left: 15px;
                    }
                }
            }

            &_params {
                @include flexCenter();
                width: 100%;

                label {
                    color: $c-d;
                    margin: 0 6px;
                    opacity: 0.3;
                }

                .enable {
                    opacity: 1;
                }

                &-input {
                    width: 75px;
                    height: 25px;
                    border-radius: 3px;
                    outline: none;
                    border: none;
                    color: $c-black;
                    font-weight: 600;
                }
            }
        }

        &--submit {
            margin-top: 20px;
            background-color: $c-green-theme;
            border: none;
            border-radius: 3px;
            cursor: pointer;
            color: $c-white;
            font-size: 14px;
            font-weight: 600;
            padding: 10px 30px;
            transition: all .3s ease-in-out;

            &:hover {
                background-color: $c-success;
            }
        }

        &--message {
            width: 270px;
            padding: 10px;
            font-size: 16px;
            color: $c-white;
            background: $c-error;
            border-radius: 6px;
            margin: 8px auto 0;
            pointer-events: none;
        }
    }
}

.slide-enter-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: ease-in;
    -webkit-transition-timing-function: ease-in;
    -o-transition-timing-function: ease-in;
    transition-timing-function: ease-in;
}

.slide-leave-active {
    -moz-transition-duration: 0.3s;
    -webkit-transition-duration: 0.3s;
    -o-transition-duration: 0.3s;
    transition-duration: 0.3s;
    -moz-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -webkit-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    -o-transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
    max-height: 340px;
    overflow: hidden;
}

.slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
}
</style>