export default {
    getCommentsCount (state) {
        return state.comments.length;
    },
    getReactionLikes (state) {
        return id => state.reactions.filter(item => {
            return item.comment_id == id && item.is_liked == 1
        }).length;
    },
    getReactionDislikes (state) {
        return id => state.reactions.filter(item => {
            return item.comment_id == id && item.is_liked == 0
        }).length;
    },
    getLikedComments (state) {
        return comment => {
            var isLiked = false;
            state.reactions.map(item => {
                if (comment == item.comment_id && item.is_liked == 1 && item.user_id == state.actualUserData.userId) {
                    isLiked = true;
                }
            });
            return isLiked;
        }
    },
    getDislikedComments (state) {
        return comment => {
            var isNotLiked = false;
            state.reactions.map(item => {
                if (comment == item.comment_id && item.is_liked == 0 && item.user_id == state.actualUserData.userId) {
                    isNotLiked = true;
                }
            });
            return isNotLiked;
        }
    },
    isLikedMovie (state) {
        return movie => {
            var isLikedMovie;
            state.likes.map(item => {
                if (movie == item.movie_id && item.is_liked == 1 && item.user_id == state.actualUserData.userId) {
                    isLikedMovie = true;
                }
            });
            return isLikedMovie;
        }
    },
    isDislikedMovie (state) {
        return movie => {
            var isDislikedMovie;
            state.likes.map(item => {
                if (movie == item.movie_id && item.is_liked == 0 && item.user_id == state.actualUserData.userId) {
                    isDislikedMovie = true;
                }
            });
            return isDislikedMovie;
        }
    },
    getDislikesCount (state) {
        return movie => state.likes.filter(item => {
            return item.movie_id == movie && item.is_liked == 0
        }).length;
    },
    getLikesCount (state) {
        return movie => state.likes.filter(item => {
            return item.movie_id == movie && item.is_liked == 1
        }).length;
    },
    getCommentsForList (state) {
        return movie => state.eachComment.filter(item => {
            return item.movie_id == movie
        }).length;
    },
    isOnMyList (state) {
        return id => {
            var isOnTheList = false;
            state.mylist.map(item => {
                if (id == item.id) {
                    isOnTheList = true;
                }
            });
            return isOnTheList;
        }
    },
    checkIsFavourite (state) {
        return id => {
            var isFavourite = false;
            state.favourites.map(item => {
                if (id == item.id) {
                    isFavourite = true;
                }
            });
            return isFavourite;
        }
    },
    favouritesCount (state) {
        return state.favourites.length;
    },
    myListCount (state) {
        return state.mylist.length;
    },
    filterMovies (state) {
        return filter => {
            return state.list.filter(item => {
                return item.movieName.toLowerCase().includes(filter.toLowerCase());
            });
        }
    },
    filterUsers (state) {
        return username => {
            return state.users.filter(user => {
                return user.username.toLowerCase().includes(username.toLowerCase());
            });
        }
    },
    filterCategories (state) {
        return category => {
            return state.categories.filter(item => {
                return item.category_name.toLowerCase().includes(category.toLowerCase());
            });
        }
    },
    getUsersCount(state) {
        return state.users.length;
    },
    getCategoriesCount(state) {
        return state.categories.length;
    },
    getMoivesCount(state) {
        return state.list.length;
    },
    hasVideo(state) {
        return ID => {
            var isThereVideo = false;
            state.list.map(item => {
                if (item.id == ID && item.video != null) {
                    isThereVideo = true;
                }
            });
            return isThereVideo;
        }
    },
    getEmailsCount(state) {
        return state.adminMessages.length;
    },
    getEmailDetails(state) {
        return ID => {
            return state.adminMessages.filter(item => {
                return item.email_id == ID;
            });
        }
    },
};