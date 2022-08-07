<template>
    <div class="users">
        <HeaderAdmin />

        <div class="modal-vue" v-if="this.showModal">
            <div class="overlay" @click="openModal()"></div>
            <div class="modal">
                <i class="fas fa-exclamation-triangle warning"></i>
                <h3>Are you sure you want to delete this category?</h3>
                <div class="operations">
                    <button @click="deleteCategory()" class="operations_btn delete">DELETE</button>
                    <button @click="openModal()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="modal-vue" v-if="this.categoryInsertForm">
            <div class="overlay" @click="openInsertForm()"></div>
            <div class="modal">
                <h3 class="">Add new category</h3>
                <form class="modal_container">
                    <label for="name">Category name</label>
                    <input type="text" id="name" class="modal_container-input" v-model="newCategoryName" />
                </form>
                <div class="operations">
                    <button @click="insertCategory()" class="operations_btn delete">ADD CATEGORY</button>
                    <button @click="openInsertForm()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="modal-vue" v-if="this.categoryUpdateForm">
            <div class="overlay" @click="openUpdateForm()"></div>
            <div class="modal">
                <h3 class="">Fill the input with the new category name</h3>
                <form class="modal_container">
                    <label for="name">New category name</label>
                    <input type="text" id="name" class="modal_container-input" v-model="newCategoryName" />
                </form>
                <div class="operations">
                    <button @click="updateCategory()" class="operations_btn delete">UPDATE</button>
                    <button @click="openUpdateForm()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="wrapper">
            <div class="message success" v-if="successMessage">{{ successMessage }}</div>
            <div class="message error" v-if="errorMessage">{{ errorMessage }}</div>
            <button @click="openInsertForm()" class="users_add"><i class="fas fa-plus"></i> ADD NEW CATEGORY</button>
            <AdminSearchBar :searchTpye="'categories'" />
            <h4 class="count">Categories count: {{ categoriesCount }}</h4>

            <!-- ALL USERS -->
            <table class="users_list" v-if="filterCategories.length == 0">
                <tr class="users_list-headers">
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Operations</th>
                </tr>
                <tr class="users_list-item" v-for="category in categories" :key="category.category_id">
                    <td class="users_list-item__param">{{ category.category_id }}</td>
                    <td class="users_list-item__param">{{ category.category_name }}</td>

                    <td class="users_list-item__actions">
                        <button
                            @click="openModal(category.category_id)"
                            class="users_list-item__actions-btn delete"><i class="fas fa-trash"></i> DELETE
                        </button>
                        <button
                            @click="openUpdateForm(category.category_id)"
                            class="users_list-item__actions-btn update"><i class="fas fa-edit"></i> UPDATE
                        </button>
                    </td>
                </tr>
            </table>

            <!-- FILTERED CATEGORIES -->
            <table class="users_list" v-if="filterCategories.length > 0">
                <tr class="users_list-headers">
                    <th>ID</th>
                    <th>Category Name</th>
                    <th>Operations</th>
                </tr>
                <tr class="users_list-item" v-for="category in filterCategories(adminCategoriesFilter)" :key="category.category_id">
                    <td class="users_list-item__param">{{ category.category_id }}</td>
                    <td class="users_list-item__param">{{ category.category_name }}</td>

                    <td class="users_list-item__actions">
                        <button
                            @click="openModal(category.category_id)"
                            class="users_list-item__actions-btn delete"><i class="fas fa-trash"></i> DELETE
                        </button>
                        <button
                            @click="openUpdateForm(category.category_id)"
                            class="users_list-item__actions-btn update"><i class="fas fa-edit"></i> UPDATE
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import AdminSearchBar from "@/components/admin/AdminSearchBar.vue";
import { mapState, mapGetters } from "vuex";

    export default {
        name: "AdminCategories",
        components: {
            HeaderAdmin,
            AdminSearchBar
        },
        data() {
            return {
                showModal: false,
                categoryUpdateForm: false,
                categoryInsertForm: false,
                categoryId: null,
                newCategoryName: "",
            }
        },
        methods: {
            openModal(item) {
                this.showModal = !this.showModal;

                if (this.showModal) {
                    this.categoryId = item;
                }
            },
            openUpdateForm(item) {
                this.categoryUpdateForm = !this.categoryUpdateForm;

                if (this.categoryUpdateForm) {
                    this.categoryId = item;
                }
                else if (!this.showModal) {
                    this.newCategoryName = "";
                }
            },
            openInsertForm() {
                this.categoryInsertForm = !this.categoryInsertForm;
                
                if (!this.categoryInsertForm) {
                    this.newCategoryName = "";
                }
            },
            deleteCategory() {
                this.$store.dispatch("deleteCategory", this.categoryId);
                this.showModal = !this.showModal;
            },
            updateCategory() {
                this.$store.dispatch("updateCategory", [this.categoryId, this.newCategoryName]);
                this.categoryUpdateForm = !this.categoryUpdateForm;
            },
            insertCategory() {
                this.$store.dispatch("insertCategory", this.newCategoryName);
                this.categoryInsertForm = !this.categoryInsertForm;
            }
        },
        computed: {
            ...mapState({
                successMessage: state => state.successMessage,
                errorMessage: state => state.errorMessage,
                categories: state => state.categories,
                adminCategoriesFilter: state => state.adminCategoriesFilter
            }),
            ...mapGetters({
                filterCategories: 'filterCategories',
                categoriesCount: 'getCategoriesCount'
            }),
        },
        mounted() {
            this.$store.dispatch("getCategories");
        }
    }
</script>

<style lang="scss">
.users {
    min-height: 100vh;
    padding-bottom: 40px;
    background-color: $c-3;

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
        width: auto;
        z-index: 1000;
        padding: 20px 30px;
        background-color: $c-white;
        text-align: center;

        .warning {
            font-size: 60px;
            color: $c-orange;
        }

        &_container {
            display: flex;
            flex-direction: column;
            align-items: center;
            padding: 20px;

            &-input {
                width: 300px;
                margin: 5px auto;
                border: none;
                background-color: $c-d;
                border-radius: 5px;
                padding: 10px 20px;
                font-size: 18px;
                font-family: $c-main-font;
                color: $c-3;

                &:focus {
                    outline: 3px solid $c-green-theme;
                }
            }
        }

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

    &_add {
        cursor: pointer;
        padding: 12px 18px;
        border: none;
        border-radius: 3px;
        font-size: 12px;
        letter-spacing: 2px;
        text-transform: uppercase;
        margin: 20px 0 5px;
        color: $c-white;
        font-weight: 900;
        background-color: $c-green-theme;

        i {
            font-size: 16px;
            color: $c-white;
        }
    }

    .wrapper {
        padding: 60px 15px 0;
        position: relative;
        
        .count {
            color: $c-white;
            margin: 10px auto;
            letter-spacing: 2px;
        }

        .message {
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            z-index: 8;
            padding: 14px 20px;
            border-radius: 5px;
            font-size: 18px;
            color: $c-white;
            text-align: center;
            display: flex;

            &.success {
                background: $c-green-theme;
            }
            &.error {
                background: $c-error;
            }

            i {
                cursor: pointer;
                font-size: 25px;
                margin-left: 8px;
            }

            @media #{$r-max-tablet} {
                width: 100%;
            }
        }
    }

    &_list {
        background-color: $c-e;
        width: 100%;
        margin: 15px 0;
        height: auto;
        border-collapse: collapse;

        &-headers {
            border-bottom: 4px solid $c-black;

            th {
                padding: 15px 0;
            }
        }

        &-item {
            background-color: transparent;
            border-bottom: 1px solid $c-3;

            &__param {
                padding: 15px 0;
                margin: 0 10px;
                font-size: 16px;
                color: $c-3;
                text-align: center;
                vertical-align: initial;
            }

            &__actions {
                display: flex;
                justify-content: center;

                &-btn {
                    cursor: pointer;
                    padding: 8px 12px;
                    border: none;
                    border-radius: 3px;
                    font-size: 12px;
                    letter-spacing: 2px;
                    text-transform: uppercase;
                    margin: 0 15px;
                    color: $c-white;
                    font-weight: 600;
                    transition: .2s ease-in-out;

                    &.permission {
                        background-color: $c-success;

                        &:hover {
                            background-color: $c-green-theme;
                        }
                    }
                    &.delete {
                        background-color: $c-red;

                        &:hover {
                            background-color: $c-youtube;
                        }
                    }
                    &.update {
                        background-color: $c-middleblue;

                        &:hover {
                            background-color: $c-blue;
                        }
                    }

                    i {
                        font-size: 16px;
                        color: $c-white;
                    }
                }
            }
        }
    }
}
</style>