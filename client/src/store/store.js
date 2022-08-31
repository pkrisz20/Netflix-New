import Vue from "vue";
import Vuex from "vuex";

import actions from "./actions";
import getters from "./getters";
import mutations from "./mutations";

Vue.use(Vuex);

export const store = new Vuex.Store({
    state: {
        isLoggedIn: null,   //watching active user
        adminLoggedIn: null,    //watching active admin
        list: [],
        users: [],
        videoDuration: 0,
        adminMessages: [],
        adminUsersFilter: "",
        adminCategoriesFilter: "",
        adminEmailsFilter: "",
        movieToUpdate: null,    //movieID which is being updated by form
        categories: [],
        movieDetails: [],
        categoriesDetails: [],
        likes: [],
        notFound: false,    //if a query not found any result
        actualUserData: {
            userId: null,
            username: "",
            email: "",
            image: null
        },
        serverError: false,
        comments: [],   //comments of the moviedetails
        commentsInfo: "",   //if a movie does not have neither a comment
        eachComment: [],    //comments count for movies list
        reactions: [],
        successMessage: "",
        errorMessage: "",
        httpStatus: 0,
        favourites: [],
        mylist: [],
        filteredFavs: [],
        filteredMovies: [],
        filteredMyList: []
    },
    getters: getters,
    mutations: mutations,
    actions: actions
});