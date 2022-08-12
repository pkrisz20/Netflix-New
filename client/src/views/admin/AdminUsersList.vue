<template>
    <div class="users">
        <HeaderAdmin />

        <div class="modal-vue" v-if="this.showModal">
            <div class="overlay" @click="openModal()"></div>
            <div class="modal">
                <i class="fas fa-exclamation-triangle warning"></i>
                <h3 class="">Are you sure you want to delete this user?</h3>
                <div class="operations">
                    <button @click="deleteUser()" class="operations_btn delete">DELETE</button>
                    <button @click="openModal()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="modal-vue" v-if="this.userProfilePictureForm">
            <div class="overlay" @click="openImageModal()"></div>
            <div class="modal">
                <h3>Change profile picture</h3>
                <form method="POST" enctype="multipart/form-data">
                    <input
                        type="file"
                        class="modal-file"
                        name="image"
                        accept="image/*"
                        @change="handleUploadProfile"
                        id="profile"
                    />
                    <label class="modal-label" for="profile"><i class="fas fa-upload upload-icon"></i> Picture</label>
                </form>
                
                <div class="operations">
                    <button @click="submitProfileChange()" class="operations_btn delete">SAVE</button>
                    <button @click="openImageModal()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="modal-vue" v-if="this.userUpdateForm">
            <div class="overlay" @click="openUpdateForm()"></div>
            <div class="modal">
                <h3 class="">Fill the inputs with the new values of the user</h3>
                <form class="modal_container" enctype="multipart/form-data" method="POST">
                    <label for="email">New email</label>
                    <input type="email" id="email" class="modal_container-input" v-model="newEmail" />

                    <label for="username">New username</label>
                    <input type="text" id="username" class="modal_container-input" v-model="newUsername" />

                    <label for="password">New password</label>
                    <input type="password" id="password" class="modal_container-input" v-model="newPassword" />

                    <label for="password-again">New password again</label>
                    <input type="password" id="password-again" class="modal_container-input" v-model="passwordAgain" />
                </form>
                <div class="operations">
                    <button @click="updateUser()" class="operations_btn delete">UPDATE</button>
                    <button @click="openUpdateForm()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="modal-vue" v-if="this.userInsertForm">
            <div class="overlay" @click="openInsertForm()"></div>
            <div class="modal">
                <h3 class="">Fill the inputs with the values of the user</h3>
                <form class="modal_container" enctype="multipart/form-data" method="POST">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="modal_container-input" v-model="newEmail" />

                    <label for="username">Username</label>
                    <input type="text" id="username" class="modal_container-input" v-model="newUsername" />

                    <label for="password">Password</label>
                    <input type="password" id="password" class="modal_container-input" v-model="newPassword" />

                    <label for="password-again">Password again</label>
                    <input type="password" id="password-again" class="modal_container-input" v-model="passwordAgain" />

                    <div class="modal_container-radio">
                        <input class="radio-input" type="radio" id="admin" name="permission" value="1" v-model="isAdmin">
                        <label class="radio-label" for="admin">Admin</label>

                        <input class="radio-input" type="radio" id="user" name="permission" value="0" v-model="isAdmin">
                        <label class="radio-label" for="user">User</label>
                    </div>

                    <div class="modal_container-radio">
                        <input class="radio-input" type="radio" id="verified" name="verified" value="1" v-model="isVerified">
                        <label class="radio-label" for="verified">Verified</label>

                        <input class="radio-input" type="radio" id="not-verified" name="verified" value="0" v-model="isVerified">
                        <label class="radio-label" for="not-verified">Not Verified</label>
                    </div>
                </form>
                <div class="operations">
                    <button @click="insertUser()" class="operations_btn delete">ADD USER</button>
                    <button @click="openInsertForm()" class="operations_btn cancel">CANCEL</button>
                </div>
            </div>
        </div>

        <div class="wrapper">
            <button @click="openInsertForm()" class="users_add"><i class="fas fa-plus"></i> ADD NEW USER</button>
            <AdminSearchBar :searchTpye="'users'" />
            <h4 class="count">Users count: {{ usersCount }}</h4>

            <!-- ALL USERS -->
            <table class="users_list" v-if="adminUsersFilter.length == 0">
                <tr class="users_list-headers">
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Operations</th>
                </tr>
                <tr class="users_list-item" v-for="user in users" :key="user.user_id">
                    <td class="users_list-item__param">{{ user.user_id }}</td>
                    <td class="users_list-item__param">{{ user.username }}</td>
                    <td class="users_list-item__param">{{ user.email }}</td>

                    <td v-if="user.is_admin == 1" class="users_list-item__param"><i class="fas fa-crown"></i></td>
                    <td v-else-if="user.is_admin == 0" class="users_list-item__param"><i class="fas fa-user"></i></td>

                    <td class="users_list-item__actions">
                        <button
                            v-if="user.is_admin == 0"
                            @click="setPermission(user.user_id, true)"
                            class="users_list-item__actions-btn permission"><i class="fas fa-plus-circle"></i>
                        </button>
                        <button
                            v-else-if="user.is_admin == 1"
                            @click="setPermission(user.user_id, false)"
                            class="users_list-item__actions-btn permission"><i class="fas fa-minus-circle"></i>
                        </button>
                        <button
                            @click="openModal(user.user_id)"
                            class="users_list-item__actions-btn delete"><i class="fas fa-trash"></i> DELETE
                        </button>
                        <button
                            @click="openUpdateForm(user.user_id)"
                            class="users_list-item__actions-btn update"><i class="fas fa-edit"></i> UPDATE
                        </button>
                        <button
                            @click="openImageModal(user.user_id)"
                            class="users_list-item__actions-btn profile"><i class="fas fa-camera"></i> PROFILE
                        </button>
                    </td>
                </tr>
            </table>

            <!-- FILTERED USERS -->
            <table class="users_list" v-if="adminUsersFilter.length > 0">
                <tr class="users_list-headers">
                    <th>ID</th>
                    <th>Username</th>
                    <th>Email</th>
                    <th>Status</th>
                    <th>Operations</th>
                </tr>
                <tr class="users_list-item" v-for="user in filterUsers(adminUsersFilter)" :key="user.user_id">
                    <td class="users_list-item__param">{{ user.user_id }}</td>
                    <td class="users_list-item__param">{{ user.username }}</td>
                    <td class="users_list-item__param">{{ user.email }}</td>

                    <td v-if="user.is_admin == 1" class="users_list-item__param"><i class="fas fa-crown"></i></td>
                    <td v-else-if="user.is_admin == 0" class="users_list-item__param"><i class="fas fa-user"></i></td>

                    <td class="users_list-item__actions">
                        <button
                            v-if="user.is_admin == 0"
                            @click="setPermission(user.user_id, true)"
                            class="users_list-item__actions-btn permission"><i class="fas fa-plus-circle"></i>
                        </button>
                        <button
                            v-else-if="user.is_admin == 1"
                            @click="setPermission(user.user_id, false)"
                            class="users_list-item__actions-btn permission"><i class="fas fa-minus-circle"></i>
                        </button>
                        <button
                            @click="openModal(user.user_id)"
                            class="users_list-item__actions-btn delete"><i class="fas fa-trash"></i> DELETE
                        </button>
                        <button
                            @click="openUpdateForm(user.user_id)"
                            class="users_list-item__actions-btn update"><i class="fas fa-edit"></i> UPDATE
                        </button>
                        <button
                            @click="openImageModal(user.user_id)"
                            class="users_list-item__actions-btn profile"><i class="fas fa-camera"></i> PROFILE
                        </button>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import Axios from "axios";
import HeaderAdmin from "@/components/admin/HeaderAdmin.vue";
import AdminSearchBar from "@/components/admin/AdminSearchBar.vue";
import { mapState, mapGetters } from "vuex";

    export default {
        name: "AdminUserList",
        components: {
            HeaderAdmin,
            AdminSearchBar
        },
        data() {
            return {
                showModal: false,
                userInsertForm: false,
                userUpdateForm: false,
                userProfilePictureForm: false,
                userId: null,
                newEmail: "",
                newUsername: "",
                isAdmin: null,
                isVerified: null,
                newPassword: "",
                passwordAgain: "",
                newImage: null
            }
        },
        methods: {
            handleUploadProfile(e) {
                this.newImage = e.target.files[0];
            },
            openModal(item) {
                this.showModal = !this.showModal;

                if (this.showModal) {
                    this.userId = item;
                }
            },
            openUpdateForm(item) {
                this.userUpdateForm = !this.userUpdateForm;

                if (this.userUpdateForm) {
                    this.userId = item;
                }

                else if (!this.userUpdateForm) {
                    this.newEmail = "";
                    this.newUsername = "";
                    this.newPassword = "";
                    this.passwordAgain = "";
                }
            },
            openInsertForm() {
                this.userInsertForm = !this.userInsertForm;

                if (!this.userInsertForm) {
                    this.newEmail = "";
                    this.newUsername = "";
                    this.newPassword = "";
                    this.passwordAgain = "";
                    this.isAdmin = null;
                    this.isVerified = null;
                }
            },
            openImageModal(item) {
                this.userProfilePictureForm = !this.userProfilePictureForm;

                if (this.userProfilePictureForm) {
                    this.userId = item;
                }
            },
            deleteUser() {
                this.$store.dispatch("deleteUser", this.userId);
                this.showModal = false;
            },
            setPermission(userID, permission) {
                this.$store.dispatch("setPermission", [userID, permission]);
            },
            validEmail(email_data) {
                var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                return re.test(email_data);
            },
            checkForm() {
                if (!this.newUsername || !this.newPassword || !this.newEmail || !this.passwordAgain) {
                    this.$store.commit("SINGLE_ERROR", "Each field is required!");
                    return false;
                }

                else if (!this.validEmail(this.newEmail)) {
                    this.$store.commit("SINGLE_ERROR", "Invalid email!");
                    return false;
                }

                else if (this.newUsername.length < 2) {
                    this.$store.commit("SINGLE_ERROR", "The username has to be at least 2 characters!");
                    return false;
                }

                else if (this.newUsername.length > 14) {
                    this.$store.commit("SINGLE_ERROR", "The username can not be longer than 14 characters!");
                    return false;
                }

                else if (this.newPassword.length < 6) {
                    this.$store.commit("SINGLE_ERROR", "Too weak password!");
                    return false;
                }

                else if (this.newPassword !== this.passwordAgain) {
                    this.$store.commit("SINGLE_ERROR", "Passwords do not match!");
                    return false;
                }

                else {
                    return true;
                }
            },
            async insertUser() {
                if (this.checkForm()) {
                    await Axios.post(`${process.env.VUE_APP_API_URL}/admin/adduser`, { email: this.newEmail, username: this.newUsername, password: this.newPassword, isAdmin: this.isAdmin, isVerified: this.isVerified })
                    .then((response) => {
                        if (response.data.status) {
                            this.newEmail = "";
                            this.newUsername = "";
                            this.newPassword = "";
                            this.passwordAgain = "";
                            this.isAdmin = null;
                            this.isVerified = null;
                            this.userUpdateForm = false;
                            this.$store.commit("SINGLE_SUCCESS", response.data.message);
                            this.$store.dispatch("getUsers");
                        }
                        else if (!response.data.status) {
                            this.$store.commit("SINGLE_ERROR", response.data.message);
                        }
                    });
                }
            },
            async updateUser() {
                if (this.checkForm()) {
                    await Axios.put(`${process.env.VUE_APP_API_URL}/admin/updateuser`, { userID: this.userId, email: this.newEmail, username: this.newUsername, password: this.newPassword })
                    .then((response) => {
                        if (response.data.status) {
                            this.newEmail = "";
                            this.newUsername = "";
                            this.newPassword = "";
                            this.passwordAgain = "";
                            this.userUpdateForm = false;
                            this.$store.commit("SINGLE_SUCCESS", response.data.message);
                            this.$store.dispatch("getUsers");
                        }
                        else if (!response.data.status) {
                            this.$store.commit("SINGLE_ERROR", response.data.message);
                        }
                    });
                }
            },
            async submitProfileChange() {
                const data = new FormData();
                data.append("image", this.newImage);

                await Axios.post(`${process.env.VUE_APP_API_URL}/admin/profilechange/${this.userId}`, data,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then((response) => {
                    this.$store.commit("SINGLE_SUCCESSS", response.data.message);
                    this.userProfilePictureForm = false;
                    this.newImage = null;
                    this.userId = null;
                });
            }
        },
        computed: {
            ...mapState({
                users: state => state.users,
                adminUsersFilter: state => state.adminUsersFilter,
            }),
            ...mapGetters({
                filterUsers: 'filterUsers',
                usersCount: 'getUsersCount'
            }),
        },
        mounted() {
            this.$store.dispatch("getUsers");
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
    z-index: 15;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flexCenter();

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 14;
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

        &-file {
            display: none;
        }
        &-label {
            background-color: $c-blue;
            border-radius: 5px;
            color: $c-white;
            width: 120px;
            height: 40px;
            margin: 10px auto 30px;
            font-size: 14px;
            cursor: pointer;
            @include flexCenter();
            flex-direction: column;
            transition: .4s;

            &:hover {
                background-color: $c-middleblue;
            }
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
            &-radio {
                display: flex;
                align-items: center;
                margin: 10px auto;
                
                .radio {
                    &-input {
                        display: none;

                        &:checked + .radio-label {
                            background-color: $c-green-theme;
                        }
                    }
                    &-label {
                        padding: 12px 18px;
                        font-size: 16px;
                        font-family: $c-main-font;
                        border-radius: 10px;
                        color: $c-white;
                        margin: 0 8px;
                        background-color: $c-blue;
                        cursor: pointer;
                    }

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

                    &.profile {
                        background-color: $c-3;

                        &:hover {
                            background-color: $c-5;
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