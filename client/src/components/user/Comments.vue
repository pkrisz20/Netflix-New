<template>
    <div class="comment-section">
        <div class="wrapper">
            <div class="statistics_top">
                <h3 class="comments_number">{{ commentsCount }} {{ commentsCount > 1 ? 'Comments' : 'Comment' }}</h3>
                
                <div class="param">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.543 489.543" style="enable-background:new 0 0 489.543 489.543" xml:space="preserve"><path d="M270.024 0c-22.6 0-15 48.3-15 48.3s-48.3 133.2-94.5 168.7c-9.9 10.4-16.1 21.9-20 31.3-.9 2.3-1.7 4.5-2.4 6.5-3.1 6.3-9.7 16-23.8 24.5l46.2 200.9s71.5 9.3 143.2 7.8c28.7 2.3 59.1 2.5 83.3-2.7 82.2-17.5 61.6-74.8 61.6-74.8 44.3-33.3 19.1-74.9 19.1-74.9 39.4-41.1.7-75.6.7-75.6s21.3-33.2-6.2-58.3c-34.3-31.4-127.4-10.5-127.4-10.5-6.5 1.1-13.4 2.5-20.8 4.3 0 0-32.2 15 0-82.7 32.3-97.7-21.4-112.8-44-112.8zM127.324 465.7l-35-166.3c-2-9.5-11.6-17.3-21.3-17.3h-66.8l-.1 200.8h109.1c9.8.1 16.1-7.7 14.1-17.2z"/></svg>
                    <h3 class="likes_number">{{ getLikes(movieID) }}</h3>
                </div>
                <div class="param">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><path d="M117.333 10.667h-64C23.936 10.667 0 34.603 0 64v170.667C0 264.064 23.936 288 53.333 288H160c5.888 0 10.667-4.779 10.667-10.667V64c0-29.397-23.936-53.333-53.334-53.333zM512 208c0-18.496-10.603-34.731-26.347-42.667 3.285-6.549 5.013-13.781 5.013-21.333 0-18.496-10.603-34.752-26.368-42.688 4.864-9.728 6.293-20.928 3.84-32.043C463.36 47.68 443.051 32 419.819 32H224c-7.232 0-16.405 1.173-25.771 3.285-5.739 1.301-9.344 6.976-8.064 12.693C191.403 53.632 192 58.859 192 64v213.333c0 5.739-1.6 11.264-4.736 16.448a10.623 10.623 0 0 0-.555 9.984l47.957 103.893v72.32a10.75 10.75 0 0 0 3.989 8.341c.683.555 16.512 13.013 38.677 13.013 24.683 0 64-39.061 64-85.333 0-29.184-10.453-65.515-16.96-85.333h131.755c28.715 0 53.141-21.248 55.637-48.341 1.387-15.189-3.669-29.824-13.632-40.725C506.901 232.768 512 220.821 512 208z"/></svg>
                    <h3 class="dislikes_number">{{ getDislikes(movieID) }}</h3>
                </div>
            </div>

            <div class="comment-form" v-if="returnLoginStatus">
                <h4 class="form-title">Post a comment</h4>
                <form @submit.prevent="submitComment(movieID)">

                    <div class="comment-above">

                        <div class="comment-above_img" v-if="returnProfilePicture == null">
                            <img class="commenter-img" alt="commenter-user" src="../../assets/images/default_profile.jpg">
                        </div>
                        <div class="comment-above_img" v-if="returnProfilePicture != null">
                            <img class="commenter-img" alt="commenter-user" :src="getImagePath(returnProfilePicture)">
                        </div>

                        <textarea maxlength="500" placeholder="Write your public comment..." v-model="comment"/>
                    </div>

                    <div class="form-btns">
                        <div class="text_length">{{ commentLength }} / 500</div>
                        <button class="cancel comment-btn" @click="cancelComment">CANCEL</button>
                        <button type="submit" class="send comment-btn">
                            <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" >
                            <path stroke-linecap="round"
                            stroke-linejoin="round" d="m6 12-3 9 18-9L3 3l3 9zm0 0h6"/></svg>
                        </button>
                    </div>
                </form>
            </div>

            <div class="comments">
                <div class="comments_infobox" v-if="returnCommentsInfo">{{ returnCommentsInfo }}</div>

                <div class="comment-box" v-for="item in returnComments" :key="item.comment_id">

                    <div class="user-pic" v-if="item.profile_pic == null">
                        <img class="user-img" alt="user picture" src="../../assets/images/default_profile.jpg">
                    </div>
                    <div class="user-pic" v-if="item.profile_pic != null">
                        <img class="user-img" alt="user picture" :src="getImagePath(item.profile_pic)">
                    </div>

                    <div class="right-side">
                        <h5 class="comment-username">{{ item.username }}</h5>
                        <p class="comment-text">{{ item.description }}</p>

                        <div class="reaction_and_time">
                            <h5 class="comment-date">{{ item.created_at }}</h5>
                            <Reactions :comment="item.comment_id" />
                        </div>

                        <div class="right-side_reactions" v-if="returnLoginStatus && returnActiveUserID != item.user_id">
                            <button @click="addLike(item.comment_id)" class="like reaction" :class="{ activelike: likedComment(item.comment_id) }">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.543 489.543" style="enable-background:new 0 0 489.543 489.543" xml:space="preserve"><path d="M270.024 0c-22.6 0-15 48.3-15 48.3s-48.3 133.2-94.5 168.7c-9.9 10.4-16.1 21.9-20 31.3-.9 2.3-1.7 4.5-2.4 6.5-3.1 6.3-9.7 16-23.8 24.5l46.2 200.9s71.5 9.3 143.2 7.8c28.7 2.3 59.1 2.5 83.3-2.7 82.2-17.5 61.6-74.8 61.6-74.8 44.3-33.3 19.1-74.9 19.1-74.9 39.4-41.1.7-75.6.7-75.6s21.3-33.2-6.2-58.3c-34.3-31.4-127.4-10.5-127.4-10.5-6.5 1.1-13.4 2.5-20.8 4.3 0 0-32.2 15 0-82.7 32.3-97.7-21.4-112.8-44-112.8zM127.324 465.7l-35-166.3c-2-9.5-11.6-17.3-21.3-17.3h-66.8l-.1 200.8h109.1c9.8.1 16.1-7.7 14.1-17.2z"/></svg>
                                Like
                            </button>

                            <button @click="addDislike(item.comment_id)" class="dislike reaction" :class="{ activedislike: dislikedComment(item.comment_id) }">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><path d="M117.333 10.667h-64C23.936 10.667 0 34.603 0 64v170.667C0 264.064 23.936 288 53.333 288H160c5.888 0 10.667-4.779 10.667-10.667V64c0-29.397-23.936-53.333-53.334-53.333zM512 208c0-18.496-10.603-34.731-26.347-42.667 3.285-6.549 5.013-13.781 5.013-21.333 0-18.496-10.603-34.752-26.368-42.688 4.864-9.728 6.293-20.928 3.84-32.043C463.36 47.68 443.051 32 419.819 32H224c-7.232 0-16.405 1.173-25.771 3.285-5.739 1.301-9.344 6.976-8.064 12.693C191.403 53.632 192 58.859 192 64v213.333c0 5.739-1.6 11.264-4.736 16.448a10.623 10.623 0 0 0-.555 9.984l47.957 103.893v72.32a10.75 10.75 0 0 0 3.989 8.341c.683.555 16.512 13.013 38.677 13.013 24.683 0 64-39.061 64-85.333 0-29.184-10.453-65.515-16.96-85.333h131.755c28.715 0 53.141-21.248 55.637-48.341 1.387-15.189-3.669-29.824-13.632-40.725C506.901 232.768 512 220.821 512 208z"/></svg>
                                Dislike
                            </button>
                        </div>

                        <div class="right-side_reactions" v-if="(returnLoginStatus && returnActiveUserID == item.user_id) || returnAdminStatus">
                            <button @click="deleteComment(item.comment_id)" class="delete"><i class="fas fa-trash"></i> Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        
        </div>
    </div>
</template>

<script>
import Reactions from "@/components/user/Reactions.vue";
import Axios from "axios";
import { mapState, mapGetters } from "vuex";

    export default {
        name: "Comments",
        components: {
            Reactions
        },
        data() {
            return {
                comment: "",
            }
        },
        props: ['movieID'],
        computed: {
            commentLength() {
                return this.comment.length;
            },
            ...mapGetters({
                commentsCount: 'getCommentsCount',
                likedComment: 'getLikedComments',
                dislikedComment: 'getDislikedComments',
                getDislikes: 'getDislikesCount',
                getLikes: 'getLikesCount',
            }),
            ...mapState({
                returnComments: state => state.comments,
                returnCommentsInfo: state => state.commentsInfo,
                returnLoginStatus: state => state.isLoggedIn,
                returnProfilePicture: state => state.actualUserData.image,
                returnActiveUserID: state => state.actualUserData.userId,
                returnAdminStatus: state => state.adminLoggedIn
            })
        },
        methods: {
            cancelComment() {
                this.comment = '';
            },
            getImagePath (image) {
                return require('../../../../server/uploads/profiles/' + image);
            },
            async deleteComment (commentID) {
                await Axios.delete(`${process.env.VUE_APP_API_URL}/movies/deletecomment/${commentID}`)
                .then((response) => {
                    this.$store.commit("SET_MESSAGE", response.data);
                    this.$store.dispatch("getComments", this.$props.movieID);
                });
            },
            addLike(commentID) {
                if (this.likedComment(commentID)) {
                    // unlike if the comment is already liked
                    this.$store.dispatch("updateReaction", [commentID, 'like', false]);
                }
                else if (!this.likedComment(commentID)) {
                    //like the comment without delete dislike
                    if (!this.dislikedComment(commentID)) {
                        this.$store.dispatch("addReactionToComment", [commentID, true]);
                    }
                    //like the comment and delete dislike
                    else if (this.dislikedComment(commentID)) {
                        this.$store.dispatch("updateReaction", [commentID, 'like', true]);
                    }
                }
            },
            addDislike(commentID) {
                if (this.dislikedComment(commentID)) {
                    // disable dislike if the comment is already disliked
                    this.$store.dispatch("updateReaction", [commentID, 'dislike', false]);
                }
                else if (!this.dislikedComment(commentID)) {
                    //dislike the comment without delete like
                    if (!this.likedComment(commentID)) {
                        this.$store.dispatch("addReactionToComment", [commentID, false]);
                    }
                    //dislike the comment and delete like
                    else if (this.likedComment(commentID)) {
                        this.$store.dispatch("updateReaction", [commentID, 'dislike', true]);
                    }
                }
            },

            submitComment(movie) {
                if (!this.$store.state.isLoggedIn) {
                    this.error = "Please sign in to write a comment!";
                    return;
                }

                else if (!this.comment) {
                    this.error = "Don't leave the field empty!";
                    return;
                }

                else if (this.comment > 250) {
                    this.error = "Comment can not be longer than 250 characters!";
                    return;
                }

                else {
                    Axios.post(`${process.env.VUE_APP_API_URL}/movies/postcomment`, { comment: this.comment, movie: movie })
                    .then((response) => {
                        this.comment = '';
                        this.$store.commit("SET_MESSAGE", response.data);
                        this.$store.dispatch("getComments", this.$props.movieID);
                    });
                }
            }
        },
        created() {
            this.$store.dispatch("getComments", this.$props.movieID);
        }
    }
</script>

<style lang="scss" scoped>
    .comment-section {
        width: 100%;
        position: relative;
        z-index: 4;

        .wrapper {
            display: flex;
            flex-direction: column;
            align-items: center;

            @media #{$r-max-laptop-m} {
                width: calc(100% - 30px);
            }

            .statistics_top {
                width: 100%;
                display: flex;
                justify-content: space-evenly;
                align-items: center;
                margin: 10px 0;

                @media #{$r-max-tablet} {
                    margin-top: 50px;
                }

                @media #{$r-max-tablet} {
                    margin-top: 120px;
                }

                .comments_number {
                    color: $c-white;
                    margin: 0;
                    letter-spacing: 1px;

                    @media #{$r-max-mobile-s} {
                        font-size: 16px;
                    }
                }

                .param {
                    display: flex;
                    align-items: center;

                    .likes_number, .dislikes_number {
                        color: $c-white;
                        letter-spacing: 1px;
                        margin: 0;
                        margin-left: 8px;

                        @media #{$r-max-mobile-s} {
                            font-size: 16px;
                        }
                    }

                    svg {
                        width: 24px;
                        height: 24px;
                        fill: $c-white;

                        @media #{$r-max-mobile-s} {
                            width: 18px;
                            height: 18px;
                        }
                    }
                }
            }

            .comment-form {
                display: flex;
                flex-direction: column;
                width: 75%;
                position: relative;

                @media #{$r-max-tablet} {
                    width: 100%;
                }

                .form-title {
                    font-size: 22px;
                    color: $c-white;
                    letter-spacing: 0.5px;
                    margin: 10px 0;

                    @media #{$r-max-tablet} {
                        text-align: center;
                    }
                }

                form {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    width: 100%;

                    .comment-above {
                        display: flex;
                        align-items: center;
                        width: 100%;

                        @media #{$r-max-tablet} {
                            justify-content: center;
                        }

                        &_img {
                            width: 80px;
                            height: 80px;
                            margin: 0 5px;
                            
                            .commenter-img {
                                width: 100%;
                                height: 100%;
                                border-radius: 50%;
                                border: none;
                                @include object-fit();
                            }
                        }

                        textarea {
                            width: 100%;
                            height: 80px;
                            resize: none;
                            outline: none;
                            border: none;
                            background-color: $c-d;
                            border-radius: 3px;
                            font-family: 'Montserrat', sans-serif;
                            font-size: 16px;
                            color: $c-3;
                            padding: 10px;

                            @media #{$r-max-tablet} {
                                width: 80%;
                            }
                        }
                    }

                    .form-btns {
                        width: 100%;
                        display: flex;
                        justify-content: flex-end;
                        align-items: center;

                        @media #{$r-max-tablet} {
                            justify-content: center;
                        }

                        .text_length {
                            color: $c-white;
                            font-size: 18px;
                            margin: 0 20px;

                            @media #{$r-max-mobile-s} {
                                font-size: 14px;
                                margin: 0 10px;
                            }
                        }

                        .comment-btn {
                            padding: 10px 15px;
                            border-radius: 3px;
                            font-size: 20px;
                            margin: 10px;
                            transition: .3s;
                            cursor: pointer;

                            @media #{$r-max-mobile-s} {
                                font-size: 16px;
                            }

                            &.cancel {
                                background: transparent;
                                border: 2px solid $c-white;
                                color: $c-white;

                                &:hover {
                                    background-color: $c-red;
                                    border: 2px solid $c-red;
                                }
                            }

                            &.send {
                                border: 2px solid $c-white;
                                background-color: $c-dark-theme;
                                padding: 8px 35px;

                                @media #{$r-max-mobile-s} {
                                    padding: 6px 20px;
                                }

                                svg {
                                    transition: .3s;
                                    fill: none;
                                    stroke-width: 2;
                                    stroke: $c-white;

                                    @media #{$r-max-mobile-s} {
                                        width: 20;
                                        height: 20;
                                    }
                                }

                                &:hover {
                                    background-color: $c-white;
                                    
                                    svg {
                                        stroke: $c-dark-theme;
                                        transform: scale(1.2);
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .comments {
                width: 100%;
                height: auto;

                &_infobox {
                    margin: 60px 0;
                    padding: 14px 20px;
                    border-radius: 5px;
                    font-size: 18px;
                    color: $c-white;
                    background: $c-success;
                    text-align: center;

                    @media #{$r-max-tablet} {
                        width: 100%;
                    }
                }

                .comment-box {
                    height: auto;
                    display: flex;
                    align-items: center;
                    border-radius: 3px;
                    background-color: $c-c;
                    padding: 10px;
                    margin: 25px auto;
                    position: relative;

                    .user-pic {
                        position: absolute;
                        top: 10px;
                        left: 10px;
                        width: 60px;
                        height: 60px;
                        display: flex;
                        align-items: center;

                        .user-img {
                            width: 100%;
                            height: 100%;
                            border-radius: 50%;
                            @include object-fit();
                        }
                    }

                    .right-side {
                        display: flex;
                        align-items: flex-start;
                        flex-direction: column;
                        color: $c-black;
                        margin-left: 60px;

                        .comment-username {
                            padding-left: 10px;
                            margin: 0 0 10px;
                            letter-spacing: 0.5px;
                        }

                        .reaction_and_time {
                            display: flex;
                            align-items: center;
                            margin-top: 5px;
                            padding-left: 10px;

                            @media #{$r-max-mobile-l} {
                                flex-direction: column-reverse;
                            }

                            .comment-date {
                                margin: 0;
                                letter-spacing: 0.5px;
                            }
                        }

                        .comment-text {
                            padding-left: 10px;
                            margin: 0;
                            text-align: justify;
                            line-height: 24px;
                        }

                        &_reactions {
                            width: auto;
                            
                            .reaction {
                                color: $c-white;
                                padding: 6px 12px;
                                border: none;
                                border-radius: 3px;
                                margin: 10px;
                                font-family: $c-main-font;
                                font-size: 14px;
                                cursor: pointer;
                                transition: .3s ease-in-out;

                                &.like {
                                    background-color: $c-6;

                                    &:hover {
                                        background-color: $c-middleblue;
                                    }
                                }

                                &.dislike {
                                    background-color: $c-6;
                                
                                    &:hover {
                                        background-color: $c-error;
                                    }
                                }
                                
                                svg {
                                    width: 14px;
                                    height: 14px;
                                    fill: $c-white;
                                }
                            }

                            .delete {
                                background-color: $c-dark-blue;
                                cursor: pointer;
                                border-radius: 5px;
                                border: none;
                                color: $c-white;
                                padding: 6px 15px;
                                margin-left: 10px;
                                font-size: 14px;
                                margin-top: 10px;
                                font-family: $c-main-font;
                                transition: .3s;

                                &:hover {
                                    background-color: $c-black;
                                }
                            }

                            .activelike {
                                background-color: $c-middleblue !important;
                            }

                            .activedislike {
                                background-color: $c-error !important;
                            }
                        }
                    }
                }
            }
        }
    }
</style>