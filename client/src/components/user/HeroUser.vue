<template>
    <div class="herouser">
        <div class="hero-video" v-for="item in this.heroVideo" :key="item.id">
            <img v-if="item.video == null" alt="herouser" src="../../assets/images/video_default.png">
            <video v-else-if="item.video != null" id="videoHero" :src="getMoviePath(item.video)" autoplay muted loop></video>
            <div class="box">
                <h3 class="box-title">{{ item.movieName }}</h3>
                <button class="box-btn" @click="routeDetails(item.id)">Details</button>
            </div>
        </div>
    </div>
</template>

<script>
import Axios from "axios";

    export default {
        name: "UserHero",
        data() {
            return {
                heroVideo: null,
                status: 0,
            }
        },
        methods: {
            getMoviePath (video) {
                return require('../../../../server/uploads/videos/' + video);
            },
            routeDetails(movieId) {
                this.$router.push({ path: `/detailsuser/${movieId}` });
            },
            async getHeroVideo() {
                await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getherovideo`)
                .then((response) => {
                    if (!response.data.status) {
                        console.log("Hero errors: " + response.data.message);
                    }
                    else if (response.data.status) {
                        this.heroVideo = response.data.result;
                        this.status = 200;
                    }
                })
                .catch(error => {
                    if (error.response.status >= 500 && error.response.status <= 599) {
                        this.$store.commit('SET_SERVER_ERROR_STATUS', error.response);
                    }
                });
            }
        },
        mounted() {
            this.getHeroVideo();
        }
    }
</script>

<style lang="scss" scoped>
.hero-video {
    position: relative;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    mask-image: linear-gradient(to bottom, #111 75%, transparent 94%);

    img, video {
        position: absolute;
        width: auto;
        height: auto;
        min-width: 100%;
        min-height: 100%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }

    .box {
        position: absolute;
        bottom: 50%;
        left: 60px;
        z-index: 2;
        display: flex;
        flex-direction: column;
        align-items: flex-start;

        @media #{$r-max-tablet} {
            left: 15px;
        }

        &-title {
            font-size: 40px;
            margin: 20px 0;
            color: $c-white;
            pointer-events: none;

            @media #{$r-max-tablet} {
                font-size: 30px;
            }
        }

        &-btn {
            cursor: pointer;
            text-decoration: none;
            padding: 12px 30px;
            background: $c-green-theme;
            color: $c-white;
            font-size: 24px;
            font-weight: 600;
            text-transform: uppercase;
            transition: .5s;
            border: none;

            &:hover {
                box-shadow: 0 0 10px $c-green-theme, 0 0 20px $c-green-theme, 0 0 40px $c-green-theme, 0 0 80px $c-green-theme, 0 0 160px $c-green-theme;
            }
        }
    }
}
</style>