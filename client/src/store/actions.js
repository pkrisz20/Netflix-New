import Axios from "axios";

export default {
    async getAllMovies ({ commit }) {
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/get`)
        .then((response) => {
            commit('GET_ALL_MOVIES', response.data);
        });
    },

    async getCategories ({ commit }) {
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getcategories`)
        .then((response) => {
            commit('GET_ALL_CATEGORIES', response.data);
        });
    },

    async getMovieDetails ({ commit }, movieId) {
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getmoviedetails/${movieId}`)
        .then((response) => {
            commit('GET_MOVIE_DETAILS', response.data);
        })
        .catch(function (error) {
            if (error.response.status == 500) {
                this.state.serverError = true;
                console.log("Data: " + error.response.data);
                console.log("Status: " + error.response.status);
                console.log("Headers: " + error.response.headers);
            }
        });
    },

    async getActualUserData ({ commit }) {
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/users/getuserdata`)
        .then((response) => {
            commit('GET_ACTUAL_USER_DATA', response);
        });
    },

    async getAdminData ({ commit }) {
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/admin/getdata`)
        .then((response) => {
            commit('GET_ADMIN_DATA', response);
        });
    },

    async updateProfilePicture ({ commit }, newProfilePicture) {
        const data = new FormData();
        data.append("image", newProfilePicture);

        await Axios.post(`${process.env.VUE_APP_API_URL}/users/changeprofile`, data, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then((response) => {
            commit('SET_MESSAGE', response.data);
        });
    },

    async logOut ({ commit }) {
        await Axios.put(`${process.env.VUE_APP_API_URL}/users/logout`)
        .then((response) => {
            commit('LOG_OUT', response.data);
        });
    },

    async logOutAdmin ({ commit }) {
        await Axios.put(`${process.env.VUE_APP_API_URL}/admin/logout`)
        .then((response) => {
            commit('ADMIN_LOG_OUT', response.data);
        });
    },

    async getLoginStatus ({ commit }) {
        await Axios.get(`${process.env.VUE_APP_API_URL}/users/getloginstatus`)
        .then((response) => {
            commit('SET_LOGIN_STATUS', response.data);
        });
    },

    async getAdminStatus ({ commit }) {
        await Axios.get(`${process.env.VUE_APP_API_URL}/admin/getadminstatus`)
        .then((response) => {
            commit('SET_ADMIN_STATUS', response.data);
        });
    },

    async getComments ({ commit }, movieID) {
        this.state.comments = [];
        this.state.commentsInfo = '';
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getcomments/${movieID}`)
        .then((response) => {
            commit('GET_COMMENTS', response.data);
        });
    },

    async getEachComment ({ commit }) {
        this.state.eachComment = [];
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/geteachcomment`)
        .then((response) => {
            commit('GET_EACH_COMMENT', response.data);
        });
    },

    async getReactions ({ commit }) {
        this.state.reactions = [];
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getreactions`)
        .then((response) => {
            commit('GET_REACTIONS', response.data);
        });
    },

    async addReactionToComment ({ dispatch, commit }, [comment, reaction]) {
        await Axios.post(`${process.env.VUE_APP_API_URL}/movies/addreaction`, { comment, reaction })
        .then((response) => {
            dispatch("getReactions");
            commit("SET_MESSAGE", response.data);
        });
    },

    async updateReaction ({ dispatch, commit }, [comment, reaction, update]) {
        await Axios.put(`${process.env.VUE_APP_API_URL}/movies/updatereaction`, { comment, reaction, update })
        .then((response) => {
            dispatch("getReactions");
            commit("SET_MESSAGE", response.data);
        });
    },

    async getLikes ({ commit }) {
        this.state.likes = [];
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getlikes`)
        .then((response) => {
            commit('GET_LIKES', response.data);
        });
    },

    async addFeedback ({ dispatch }, [movie, reaction]) {
        await Axios.post(`${process.env.VUE_APP_API_URL}/movies/addfeedback`, { movie, reaction })
        .then((response) => {
            if (response.data.status) {
                dispatch("getLikes");
            }
            else if (!response.data.status) {
                console.log("Something went wrong");
            }
        });
    },

    async updateFeedback ({ dispatch }, [movie, reaction, update]) {
        await Axios.put(`${process.env.VUE_APP_API_URL}/movies/updatefeedback`, { movie, reaction, update })
        .then((response) => {
            if (response.data.status) {
                dispatch("getLikes");
            }
            else if (!response.data.status) {
                console.log("Something went wrong");
            }
        });
    },

    async getFavourites ({ commit }) {
        this.state.favourites = [];
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getfavourites`)
        .then((response) => {
            commit('GET_FAVOURITES', response.data);
        });
    },

    async getMyList ({ commit }) {
        this.state.mylist = [];
        this.state.httpStatus = 0;
        await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getmylist`)
        .then((response) => {
            commit('GET_MY_LIST', response.data);
        });
    },

    async addToMyList ({ commit, dispatch }, movieID) {
        await Axios.post(`${process.env.VUE_APP_API_URL}/movies/addtolist/${movieID}`)
        .then((response) => {
            dispatch("getMyList");
            commit('SET_MESSAGE', response.data);
        });
    },

    async deleteFromMyList ({ commit, dispatch }, movieID) {
        await Axios.delete(`${process.env.VUE_APP_API_URL}/movies/deletefromlist/${movieID}`)
        .then((response) => {
            dispatch("getMyList");
            commit('SET_MESSAGE', response.data);
        });
    },

    async filterFavourites ({ commit }, [categories, fromYear, toYear]) {
        this.state.filteredFavs = [];
        await Axios.post(`${process.env.VUE_APP_API_URL}/movies/filter/favs`, { selectedCategories: categories, yearFrom: fromYear, yearTo: toYear })
        .then((response) => {
            commit('FILTER_FAVOURITES', response.data);
        });
    },

    async searchMovies ({ commit }, [categories, fromYear, toYear]) {
        this.state.filteredMovies = [];
        await Axios.post(`${process.env.VUE_APP_API_URL}/movies/filter/each`, { selectedCategories: categories, yearFrom: fromYear, yearTo: toYear })
        .then((response) => {
            commit('FILTER_EACH', response.data);
        });
    },

    async filterMyList ({ commit }, [categories, fromYear, toYear]) {
        this.state.filteredMyList = [];
        await Axios.post(`${process.env.VUE_APP_API_URL}/movies/filter/mylist`, { selectedCategories: categories, yearFrom: fromYear, yearTo: toYear })
        .then((response) => {
            commit('FILTER_MY_LIST', response.data);
        });
    },

    async deleteMovie ({ commit, dispatch }, movieID) {
        await Axios.delete(`${process.env.VUE_APP_API_URL}/admin/deletemovie/${movieID}`)
        .then((response) => {
            dispatch("getAllMovies");
            commit('SET_MESSAGE', response.data);
        });
    },

    async getUsers ({ commit }) {
        this.state.httpStatus = 0;
        this.state.users = [];
        await Axios.get(`${process.env.VUE_APP_API_URL}/admin/getusers`)
        .then((response) => {
            commit('GET_USERS', response.data);
        });
    },

    async deleteUser ({ commit, dispatch }, userID) {
        await Axios.delete(`${process.env.VUE_APP_API_URL}/admin/deleteuser/${userID}`)
        .then((response) => {
            commit('SET_MESSAGE', response.data);
            dispatch("getUsers");
        });
    },

    async setPermission ({ commit, dispatch }, [userID, permission]) {
        await Axios.put(`${process.env.VUE_APP_API_URL}/admin/setpermission`, { userID: userID, permission: permission })
        .then((response) => {
            commit('SET_MESSAGE', response.data);
            dispatch("getUsers");
        });
    },

    async deleteCategory ({ commit, dispatch }, categoryID) {
        await Axios.delete(`${process.env.VUE_APP_API_URL}/admin/deletecategory/${categoryID}`)
        .then((response) => {
            commit('SET_MESSAGE', response.data);
            dispatch("getCategories");
        });
    },

    async updateCategory ({ commit, dispatch }, [categoryID, newValue]) {
        await Axios.put(`${process.env.VUE_APP_API_URL}/admin/updatecategory`, { categoryID: categoryID, newValue: newValue })
        .then((response) => {
            commit('SET_MESSAGE', response.data);
            dispatch("getCategories");
        });
    },

    async insertCategory ({ commit, dispatch }, categoryName) {
        await Axios.post(`${process.env.VUE_APP_API_URL}/admin/insertcategory`, { categoryName: categoryName })
        .then((response) => {
            commit('SET_MESSAGE', response.data);
            dispatch("getCategories");
        });
    },
};