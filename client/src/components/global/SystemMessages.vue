<template>
    <div 
        v-if="successMessage || errorMessage"
        class="message"
        :class="[{ success: successMessage }, { error: errorMessage }]">
        <span v-if="this.successMessage">{{ successMessage }}</span>
        <span v-if="this.errorMessage">{{ errorMessage }}</span>
    </div>
</template>

<script>
import { mapState } from "vuex";

    export default {
        name: "SystemMessages",
        computed: {
            ...mapState({
                successMessage: state => state.successMessage,
                errorMessage: state => state.errorMessage
            })
        }
    }
</script>

<style lang="scss" scoped>
    .message {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        z-index: 20;
        padding: 14px 20px;
        border-radius: 5px;
        font-size: 18px;
        color: $c-white;
        text-align: center;
        display: flex;

        &.success {
            background-color: $c-green-theme;
        }
        &.error {
            background-color: $c-error;
        }

        @media #{$r-max-tablet} {
            width: 100%;
        }
    }
</style>