<template>
    <div class="modal-vue">
        <div class="overlay" @click="$emit('closeDetails');"></div>
        <div class="modal">
            <i class="fas fa-info-circle info"></i>
            <i class="fas fa-window-close close" @click="$emit('closeDetails');"></i>

            <div class="modal-container" v-for="(item, index) in emailDetails(this.$props.emailID)" :key="index">
                <h1 class="modal-container-title">{{ item.subject }}</h1>
                <p class="modal-container-message">{{ item.message }}</p>
                <h3 class="modal-container-name">{{ item.full_name }} <span>{{ item.username ? `(Username: ${item.username})` : '' }}</span></h3>
                <div class="modal-container-row">
                    <a :href="'mailto:' + item.from_email" class="modal-container-row-email">{{ item.from_email }}</a>
                    <span class="modal-container-row-date">{{ item.sent_at }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

    export default {
        name: "MessageDetails",
        props: ['emailID'],
        computed: {
            ...mapGetters({
                emailDetails: 'getEmailDetails'
            })
        }
    }
</script>

<style lang="scss" scoped>
.modal-vue {
    position: fixed;
    z-index: 15;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    @include flexCenter();

    .overlay {
        position: fixed;
        top: 0;
        left: 0;
        z-index: 14;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.7);
    }

    .modal {
        position: relative;
        width: auto;
        z-index: 1000;
        padding: 20px 30px;
        background-color: $c-white;
        max-width: 750px;
        display: flex;
        align-items: center;
        flex-direction: column;

        .close {
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 30px;
            color: $c-red;
            cursor: pointer;
        }

        .info {
            font-size: 60px;
            color: $c-blue;
        }

        &-container {
            display: flex;
            justify-content: center;
            align-items: flex-start;
            flex-direction: column;
            width: 100%;

            &-title {
                width: 100%;
            }

            &-message {
                text-align: justify;
                line-height: 26px;
            }

            &-row {
                width: 100%;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &-email {
                    text-decoration: none;
                    transition: .2s ease-in-out;
                    
                    &:hover {
                        color: $c-green-theme;
                    }
                }
            }
        }
    }
}
</style>