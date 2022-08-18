<template>
    <div class="counters">
        <div class="feedback">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 489.543 489.543" style="enable-background:new 0 0 489.543 489.543" xml:space="preserve"><path d="M270.024 0c-22.6 0-15 48.3-15 48.3s-48.3 133.2-94.5 168.7c-9.9 10.4-16.1 21.9-20 31.3-.9 2.3-1.7 4.5-2.4 6.5-3.1 6.3-9.7 16-23.8 24.5l46.2 200.9s71.5 9.3 143.2 7.8c28.7 2.3 59.1 2.5 83.3-2.7 82.2-17.5 61.6-74.8 61.6-74.8 44.3-33.3 19.1-74.9 19.1-74.9 39.4-41.1.7-75.6.7-75.6s21.3-33.2-6.2-58.3c-34.3-31.4-127.4-10.5-127.4-10.5-6.5 1.1-13.4 2.5-20.8 4.3 0 0-32.2 15 0-82.7 32.3-97.7-21.4-112.8-44-112.8zM127.324 465.7l-35-166.3c-2-9.5-11.6-17.3-21.3-17.3h-66.8l-.1 200.8h109.1c9.8.1 16.1-7.7 14.1-17.2z"/></svg>
            <h3 class="feedback_number">{{ getLikes }}</h3>
        </div>
        <div class="feedback">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style="enable-background:new 0 0 512 512" xml:space="preserve"><path d="M117.333 10.667h-64C23.936 10.667 0 34.603 0 64v170.667C0 264.064 23.936 288 53.333 288H160c5.888 0 10.667-4.779 10.667-10.667V64c0-29.397-23.936-53.333-53.334-53.333zM512 208c0-18.496-10.603-34.731-26.347-42.667 3.285-6.549 5.013-13.781 5.013-21.333 0-18.496-10.603-34.752-26.368-42.688 4.864-9.728 6.293-20.928 3.84-32.043C463.36 47.68 443.051 32 419.819 32H224c-7.232 0-16.405 1.173-25.771 3.285-5.739 1.301-9.344 6.976-8.064 12.693C191.403 53.632 192 58.859 192 64v213.333c0 5.739-1.6 11.264-4.736 16.448a10.623 10.623 0 0 0-.555 9.984l47.957 103.893v72.32a10.75 10.75 0 0 0 3.989 8.341c.683.555 16.512 13.013 38.677 13.013 24.683 0 64-39.061 64-85.333 0-29.184-10.453-65.515-16.96-85.333h131.755c28.715 0 53.141-21.248 55.637-48.341 1.387-15.189-3.669-29.824-13.632-40.725C506.901 232.768 512 220.821 512 208z"/></svg>
            <h3 class="feedback_number">{{ getDislikes }}</h3>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Reactions",
        props: ['comment'],
        created() {
            this.$store.dispatch("getReactions");
        },
        computed: {
            getLikes() {
                return this.$store.getters.getReactionLikes(this.$props.comment);
            },
            getDislikes() {
                return this.$store.getters.getReactionDislikes(this.$props.comment);
            }
        }
    }
</script>

<style lang="scss">
.counters {
    display: flex;

    .feedback {
        display: flex;
        align-items: center;
        margin: 0 10px;

        @media #{$r-max-mobile-l} {
            justify-content: center;
            margin: 5px;
        }

        &_number {
            margin: 0;
            font-size: 16px;
            margin-left: 5px;
            
            @media #{$r-max-mobile-l} {
                font-size: 14px;
            }
        }

        svg {
            width: 16px;
            height: 16px;

            @media #{$r-max-mobile-l} {
                width: 14px;
                height: 14px;
            }
        }
    }
}
</style>