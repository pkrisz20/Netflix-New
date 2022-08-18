<template>
    <div class="video">
        <Media
            :kind="'video'"
            :controls="true"
            :autoplay="false"
            :isMuted="false"
            :loop="false"
            :poster="this.$props.videoPoster"
            :src="this.$props.videoSource"
            :ref="'videoPlayer'"
            @pause="pauseMethod()"
            @play="play()"
        >
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
            pauseMethod() {
                console.log('paused');
                this.$refs.videoPlayer.pause();
            },
        }
    }
</script>

<style lang="scss" scoped>
.video {
    position: relative;
    height: 100%;
    width: 100%;

    video {
        position: absolute;
        z-index: 10;
        width: 100%;
        height: 100%;
    }
}
</style>