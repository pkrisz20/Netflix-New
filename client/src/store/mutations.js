export default {
    GET_ALL_MOVIES (state, data) {
        if (!data.status) {
            return;
        }

        else if (data.status) {
            state.list = data.result;
            setTimeout(() => {
                state.httpStatus = 200;
            }, 500);
        }
    },
    GET_ALL_CATEGORIES (state, data) {
        state.categories = [];
        data.forEach(item => {
            state.categories.push(item);
        });
        state.httpStatus = 200;
    },
    GET_MOVIE_DETAILS (state, data) {
        state.movieDetails = data.movie;
        state.categoriesDetails = [];
        data.categories.forEach(item => {
            state.categoriesDetails.push(item.category_name);
        });
        setTimeout(() => {
            state.httpStatus = 200;
        }, 500);
    },
    GET_ACTUAL_USER_DATA (state, response) {
        if (!response.data.status) {
            state.isLoggedIn = false;
        }

        else if (response.data.status) {
            state.actualUserData.userId = response.data.result[0].user_id;
            state.actualUserData.email = response.data.result[0].email;
            state.actualUserData.username = response.data.result[0].username;
            state.actualUserData.image = response.data.result[0].profile_pic;
            state.httpStatus = 200;
        }
    },
    GET_ADMIN_DATA (state, response) {
        if (!response.data.status) {
            state.adminLoggedIn = false;
        }

        else if (response.data.status) {
            state.actualUserData.userId = response.data.result[0].user_id;
            state.actualUserData.username = response.data.result[0].username;
            state.httpStatus = 200;
        }
    },
    LOG_OUT (state, data) {
        if (data.status) {
            state.actualUserData.userId = null;
            state.actualUserData.email = "";
            state.actualUserData.username = "";
            state.actualUserData.image = null;
            state.isLoggedIn = false;
        }
    },
    ADMIN_LOG_OUT (state, data) {
        if (data.status) {
            state.actualUserData.username = "";
            state.adminLoggedIn = false;
        }
    },
    SET_LOGIN_STATUS (state, data) {
        if (data.loginStatus) {
            state.isLoggedIn = true;
        }

        else if (!data.loginStatus) {
            state.isLoggedIn = false;
        }
    },
    SET_ADMIN_STATUS (state, data) {
        if (data.adminStatus) {
            state.adminLoggedIn = true;
        }

        else if (!data.adminStatus) {
            state.adminLoggedIn = false;
        }
    },
    GET_COMMENTS (state, data) {
        state.comments = [];
        state.commentsInfo = "";

        if (!data.status) {
            state.commentsInfo = data.message;
        }

        else if (data.status == null) {
            state.commentsInfo = data.message;
        }

        else if (data.status) {
            data.result.forEach(item => {
                state.comments.push(item);
            });
        }
        setTimeout(() => {
            state.httpStatus = 200;
        }, 500);
    },
    GET_EACH_COMMENT (state, data) {
        state.eachComment = [];
        if (!data.status) {
            state.commentsInfo = data.message;
        }

        else if (data.status) {
            data.result.forEach(item => {
                state.eachComment.push(item);
            });
        }
    },
    GET_REACTIONS (state, data) {
        state.reactions = [];
        if (!data.status) {
            state.commentsInfo = data.message;
        }

        else if (data.status === null) {
            state.reactions = [];
        }

        else if (data.status) {
            data.result.forEach(i => {
                state.reactions.push(i);
            });
        }
    },
    GET_LIKES (state, data) {
        state.likes = [];
        if (!data.status) {
            console.log(data.message);
        }

        else if (data.status === null) {
            state.likes = [];
        }

        else if (data.status) {
            data.result.forEach(i => {
                state.likes.push(i);
            });
        }
        setTimeout(() => {
            state.httpStatus = 200;
        }, 500);
    },
    GET_FAVOURITES (state, data) {
        state.favourites = [];
        if (!data.status) {
            console.log(data.message);
        }

        else if (data.status == null) {
            state.favourites = [];
        }

        else if (data.status) {
            data.result.forEach(i => {
                state.favourites.push(i);
            });
        }
        state.httpStatus = 200;
    },
    GET_MY_LIST (state, data) {
        state.mylist = [];
        if (!data.status) {
            console.log(data.message);
        }

        else if (data.status == null) {
            state.mylist = [];
        }

        else if (data.status) {
            data.result.forEach(i => {
                state.mylist.push(i);
            });
        }
        state.httpStatus = 200;
    },
    FILTER_FAVOURITES (state, data) {
        state.filteredFavs = [];

        if (data.status == false) {
            console.log("error");
        }

        else if (data.status == null) {
            state.notFound = true;
        }

        else if (data.status) {
            data.result.forEach(item => {
                state.filteredFavs.push(item);
            });
        }
        setTimeout(() => {
            state.notFound = false;
        }, 2000);
    },
    FILTER_EACH (state, data) {
        state.filteredMovies = [];

        if (data.status == false) {
            console.log("error");
        }

        else if (data.status == null) {
            state.notFound = true;
        }

        else if (data.status) {
            data.result.forEach(item => {
                state.filteredMovies.push(item);
            });
        }
        setTimeout(() => {
            state.notFound = false;
        }, 2000);
    },
    FILTER_MY_LIST (state, data) {
        state.filteredMyList = [];

        if (data.status == false) {
            console.log("error");
        }

        else if (data.status == null) {
            state.notFound = true;
        }

        else if (data.status) {
            data.result.forEach(item => {
                state.filteredMyList.push(item);
            });
        }
        setTimeout(() => {
            state.notFound = false;
        }, 2000);
    },
    GET_USERS (state, data) {
        if (data.status) {
            data.result.forEach(item => {
                state.users.push(item);
            });
        }
        else if (!data.status) {
            state.errorMessage = data.message;
        }
        state.httpStatus = 200;
    },
    SINGLE_ERROR (state, data) {
        state.errorMessage = data;

        setTimeout(() => {
            state.errorMessage = "";
        }, 2000);
    },
    SINGLE_SUCCESS (state, data) {
        state.successMessage = data;

        setTimeout(() => {
            state.successMessage = "";
        }, 2000);
    },
    SET_MESSAGE (state, data) {
        state.httpStatus = 200;

        if (data.status) {
            state.successMessage = data.message;
        }

        else if (!data.status) {
            state.errorMessage = data.message;
        }
        setTimeout(() => {
            state.successMessage = "";
            state.errorMessage = "";
        }, 2000);
    }
};