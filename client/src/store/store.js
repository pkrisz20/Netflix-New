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
        filteredFavs: [],    //result of search from favourite movies
        filteredMovies: [], //result of search from each movie
        filteredMyList: []  //result of search from my list
    },
    getters: getters,
    mutations: mutations,
    actions: actions
});