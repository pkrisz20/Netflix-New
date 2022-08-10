<template>
<div>
    <div class="modalUpload" v-if="showForm">
        <div class="modal_bg">
            <div class="container">
                <i @click="openModal()" class="fas fa-times close-icon"></i>
                <i v-if="action == 'update'" class="fas fa-exclamation-triangle warning"></i>
                <h3 v-if="action == 'update'">You have to fill each input with the new values!</h3>
                <span v-if="action == 'update'">(Whenever the new value is even the same)</span>
                
                <form @submit.prevent="submitForm()" enctype="multipart/form-data">
                    <div class="left">
                        <div class="left-inner">
                            <label>Movie Title:</label>
                            <input type="text" v-model="movieName" name="movieName">

                            <label>Description:</label>
                            <textarea cols="40" rows="10" maxlength="300" v-model="movieReview" name="movieReview"></textarea>
                            <div class="text-length">{{ textLength }} / 300</div>

                            <label>Release Date:</label>
                            <input type="text" v-model="releaseDate" name="releaseDate">
                        </div>
                    </div>

                    <div class="right">
                        <div class="category" v-for="(item, index) in $store.state.categories" :key="index">
                            <input type="checkbox" :id="item.category_name" :value="item.category_id" v-model="selectedCategories" />
                            <label :for="item.category_name">{{ item.category_name }}</label>
                        </div>
                        <button type="submit" class="submit-btn">{{ action }}</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
    <div class="message success" v-if="success">{{ success }}</div>
    <div class="message error" v-if="error">{{ error }}</div>
</div>
</template>

<script>
import Axios from "axios";
import { mapState } from "vuex";

    export default {
        name: "Form",
        data() {
            return {
                movieName: "",
                movieReview: "",
                releaseDate: "",
                selectedCategories: [],
                showForm: false
            }
        },
        props: ['action'],
        computed: {
            textLength() {
                return this.movieReview.length;
            },
            ...mapState({
                updateMovieID: state => state.movieToUpdate,
                error: state => state.errorMessage,
                success: state => state.successMessage
            }),
        },
        methods: {
            openModal() {
                this.showForm = !this.showForm;

                if (this.showForm) {
                    document.body.style.overflowY = 'hidden';
                }

                if (!this.showForm) {
                    document.body.style.overflowY = 'scroll';
                    this.movieName = "";
                    this.movieReview = "";
                    this.releaseDate = "";
                    this.selectedCategories = [];
                }
            },

            checkForm() {
                if (!this.movieName || !this.movieReview || !this.releaseDate || !this.selectedCategories) {
                    this.$store.commit("SINGLE_ERROR", "Each field is required!");
                    return false;
                }

                else {
                    return true;
                }
            },

            async submitForm() {
                if (this.checkForm()) {
                    if (this.action == 'insert') {
                        await Axios.post(`${process.env.VUE_APP_API_URL}/admin/insert`,
                        {
                            movieName: this.movieName,
                            movieReview: this.movieReview,
                            releaseDate: this.releaseDate,
                            categories: this.selectedCategories,
                        })
                        .then((res) => {
                            if (!res.data.status) {
                                this.$store.commit("SINGLE_ERROR", res.data.message);
                            }
                            else if (res.data.status) {
                                this.$store.commit("SINGLE_SUCCESSS", res.data.message);
                            }
                        })
                        .catch((err) => {
                            this.$store.commit("SINGLE_ERROR", err.message);
                        });
                    }

                    else if (this.action == 'update') {
                        await Axios.put(`${process.env.VUE_APP_API_URL}/admin/update/${this.updateMovieID}`,
                        {
                            movieName: this.movieName,
                            movieReview: this.movieReview,
                            releaseDate: this.releaseDate,
                            categories: this.selectedCategories,
                        })
                        .then((res) => {
                            if (!res.data.status) {
                                this.$store.commit("SINGLE_ERROR", res.data.message);
                            }
                            else if (res.data.status) {
                                this.$store.commit("SINGLE_SUCCESSS", res.data.message);
                            }
                        })
                        .catch((err) => {
                            this.$store.commit("SINGLE_ERROR", err.message);
                        });
                    }
                    this.showForm = false;
                    this.$store.dispatch("getAllMovies");
                    this.$store.dispatch("getEachComment");
                    this.$store.dispatch("getLikes");
                    this.movieName = "";
                    this.movieReview = "";
                    this.releaseDate = "";
                    this.selectedCategories = [];
                    document.body.style.overflowY = 'scroll';
                }
            }
        },
        mounted() {
            document.body.addEventListener("click", (event) => {
                const modal = document.querySelector('.modal_bg');
                if (event.target == modal) {
                    this.showForm = false;
                    document.body.style.overflowY = 'scroll';
                    this.movieName = "";
                    this.movieReview = "";
                    this.releaseDate = "";
                    this.selectedCategories = [];
                }
            });
        }
    }
</script>

<style lang="scss" scoped>
.message {
    @include absoluteCenter();
    z-index: 5;
    padding: 8px 20px;
    border-radius: 5px;
    font-size: 18px;
    color: $c-white;
    display: flex;
    justify-content: center;
    align-items: center;

    &.success {
        background: $c-success;
    }

    &.error {
        background: $c-error;
    }
}

.modalUpload {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 11;
    width: 100%;
    height: 100vh;

    .modal_bg {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;

        &::after {
            position: absolute;
            top: 0;
            left: 0;
            content: '';
            width: 100%;
            height: 100%;
            background-color: rgba($c-black, 0.8);
        }

        .container {
            display: flex;
            flex-direction: column;
            background-color: $c-e;
            width: auto;
            margin: 0 auto;
            padding: 25px;
            border-radius: 6px;
            position: relative;
            z-index: 1;

            .warning {
                font-size: 40px;
                color: $c-orange;
                text-align: center;
            }

            h3, span {
                margin: 8px auto 0;
                font-size: 16px;
                font-weight: 700;
            }

            .close-icon {
                position: absolute;
                top: 5px;
                right: 5px;
                font-size: 20px;
                padding: 7px;
                color: $c-white;
                background-color: $c-red;
                border-radius: 5px;
                cursor: pointer;
                transition: .3s;
            }

            form {
                @include flexCenter();
                width: auto;
                margin: 0 auto;
                padding: 25px;
                border-radius: 6px;
                position: relative;
                z-index: 1;

                .left {
                    &-inner {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                    }
                }

                .right {
                    display: grid;
                    grid-template-columns: repeat(2, auto);

                    .category {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        margin: 6px 10px;

                        label {
                            color: $c-3;
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
                                background-color: $c-middleblue;
                            }

                            &::before {
                                position: absolute;
                                content: '';
                                width: 15px;
                                height: 15px;
                                border-radius: 50%;
                                top: -1px;
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

                label {
                    font-size: 20px;
                    color: $c-3;
                }

                input {
                    height: 30px;
                    width: 100%;
                    font-size: 14px;
                    outline: none;
                    border: 1px solid $c-3;
                    border-radius: 3px;
                    font-family: $c-main-font;
                }

                textarea {
                    outline: none;
                    font-family: $c-main-font;
                    border: 1px solid $c-3;
                    border-radius: 3px;
                    resize: none;
                    font-size: 14px;
                }

                .text-length {
                    font-size: 16px;
                    color: $c-3;
                    margin: 5px auto;
                }

                .submit-btn {
                    padding: 6px 16px;
                    background: $c-blue;
                    font-size: 20px;
                    color: $c-white;
                    text-transform: uppercase;
                    margin: 15px auto 0;
                    border: none;
                    cursor: pointer;
                    transition: .3s;
                    border-radius: 3px;
                    font-family: $c-main-font;

                    &:hover {
                        background-color: $c-middleblue;
                    }
                }
            }
        }
    }
}
</style>