<template>
    <div @click="menuOpen = !menuOpen">
        {{ title }}
        <i class="fas fa-sort-down"></i>

        <transition name="slide" appear>
            <div v-show="menuOpen" class="sub-items">
                <div v-for="(link, i) in links" :key="i" class="sub-row">
                    <a class="sub-link" @click="routeToSite(link.category_name)">{{ link.category_name }}</a>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    export default {
        name: "Dropdown",
        props: ['title', 'links'],
        data() {
            return {
                menuOpen: false,
            }
        },
        methods: {
            routeToSite(link) {
                this.$emit("getSelected", link);
            }
        },
        mounted() {
            document.addEventListener('click', (event) => {
                if (event.target.closest('.submenu')) return;
                if (event.target.closest('.submenu_user')) return;
                this.menuOpen = false;
            });
        },
    }
</script>

<style lang="scss" scoped>

.sub-items {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: calc(100% + 15px);
    left: 0;
    width: max-content;
    border-radius: 0 0 5px 5px;
    transition: .4s;

    @media #{$r-max-laptop-m} {
        position: relative;
        top: 0;
        align-items: center;
    }

    .sub-row {
        margin: 5px 0;
        padding: 8px;

        .sub-link {
            font-weight: bold;
            color: $c-d;
            text-decoration: none;
            transition: .3s;
            cursor: pointer;

            &:hover {
                color: $c-green-theme;
            }
        }
    }
}

.slide-enter-active {
    transition-duration: 0.3s;
    transition-timing-function: ease-in;
}

.slide-leave-active {
    transition-duration: 0.3s;
    transition-timing-function: cubic-bezier(0, 1, 0.5, 1);
}

.slide-enter-to, .slide-leave {
    max-height: 100px;
    overflow: hidden;
}

.slide-enter, .slide-leave-to {
    overflow: hidden;
    max-height: 0;
}
</style>