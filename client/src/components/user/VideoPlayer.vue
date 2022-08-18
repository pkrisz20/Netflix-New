<template>
    <div class="video">
        <div @click="closePlayer()" class="video-close"><i class="far fa-times"></i></div>
        <Media
            :kind="'video'"
            :controls="true"
            :autoplay="false"
            :isMuted="false"
            :loop="false"
            :poster="this.$props.videoPoster"
            :src="this.$props.videoSource"
            :ref="'videoPlayer'"
            @pause="pause()"
            @play="play()">
        </Media>
    </div>
</template>

<script>
import Media from "@dongido/vue-viaudio";

    export default {
        name: "VideoPlayer",
        props: ["videoSource", "videoPoster"],
        components: {
            Media
        },
        methods: {
            play() {
                this.$refs.videoPlayer.play();
            },
            pause() {
                this.$refs.videoPlayer.pause();
            },
            closePlayer() {
                this.$refs.videoPlayer.pause();
                this.$emit("close");
            }
        }
    }
</script>

<style lang="scss" scoped>
.video {
    position: relative;
    height: 100%;
    width: 100%;

    &-close {
        cursor: pointer;
        position: absolute;
        z-index: 20;
        top: 20px;
        left: 20px;

        i {
            color: $c-white;
            font-size: 35px;
        }
    }

    video {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
    }
}
</style>