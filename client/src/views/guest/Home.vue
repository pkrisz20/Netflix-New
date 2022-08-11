<template>
  <div class="home">
    <Header />
    <Hero :images=this.heroImages />
    <section class="countup">
      <div class="wrapper">
        <div class="countup-container">
          <div class="countup-container_box">
            <div class="countup-container_box__icon"><i class="fas fa-layer-group"></i></div>
            <div class="countup-container_box__number">
              <simple-count-up ref="counterCategories" v-model="this.categoriesCount" :duration="4" :auto="false"></simple-count-up>
            </div>
            <h5 class="countup-container_box__name">categories</h5>
          </div>

          <div class="countup-container_box">
            <div class="countup-container_box__icon"><i class="fas fa-mug-hot"></i></div>
            <div class="countup-container_box__number">
              <simple-count-up ref="counterCoffe" v-model="this.coffeNumber" :duration="3" :auto="false"></simple-count-up>
            </div>
            <h5 class="countup-container_box__name">cups of coffe</h5>
          </div>

          <div class="countup-container_box">
            <div class="countup-container_box__icon"><i class="fas fa-film-alt"></i></div>
            <div class="countup-container_box__number">
              <simple-count-up ref="counterMovies" v-model="this.moviesCount" :duration="4" :auto="false"></simple-count-up>
            </div>
            <h5 class="countup-container_box__name">movies</h5>
          </div>

          <div class="countup-container_box">
            <div class="countup-container_box__icon"><i class="fas fa-lightbulb-on"></i></div>
            <div class="countup-container_box__number">
              <simple-count-up ref="counterIdes" v-model="this.ideasNumber" :duration="4" :auto="false"></simple-count-up>
            </div>
            <h5 class="countup-container_box__name">new ideas</h5>
          </div>

        </div>
      </div>
    </section>
    <Commercial />
    <BlockTitle :title="'All categories'"/>
    <MovieList :movies=$store.state.list />
    <Footer />
  </div>
</template>

<script>
import Vue from "vue";
import SimpleCountUp from "vue-simple-countup";
Vue.use(SimpleCountUp);

import Header from '@/components/guest/Header.vue';
import Commercial from "@/components/guest/Commercial.vue";
import BlockTitle from "@/components/global/BlockTitle.vue";
import Hero from "@/components/guest/Hero.vue";
import MovieList from "@/components/global/MovieList.vue";
import Footer from "@/components/global/Footer.vue";
import inViewport from "in-viewport";
import Axios from "axios";
import { mapGetters } from "vuex";

export default {
  name: "Home",
  components: {
    Header,
    Hero,
    MovieList,
    BlockTitle,
    Footer,
    Commercial,
    SimpleCountUp
  },
  data() {
    return {
      heroImages: [],
      coffeNumber: 375,
      ideasNumber: 84
    }
  },
  computed: {
    simpleCountCategories() {
      return this.$refs.counterCategories;
    },
    simpleCountUpCoffe() {
      return this.$refs.counterCoffe;
    },
    simpleCountUpMovies() {
      return this.$refs.counterMovies;
    },
    simpleCountUpIdeas() {
      return this.$refs.counterIdes;
    },
    ...mapGetters({
      categoriesCount: "getCategoriesCount",
      moviesCount: "getMoivesCount",
    })
  },
  methods: {
    async getHeroImages() {
      await Axios.get(`${process.env.VUE_APP_API_URL}/movies/getheroimages`)
      .then((response) => {
        if (!response.data.status) {
          console.log("Hero guest error: " + response.data.message);
        }
        else if (response.data.status) {
          this.heroImages = response.data.images;
        }
      });
    },
  },
  mounted() {
    this.$store.dispatch('getAllMovies');
    this.$store.dispatch("getEachComment");
    this.$store.dispatch("getLikes");
    this.getHeroImages();

    const countUpElement = document.querySelector(".countup");
    inViewport(countUpElement, () => {
      console.log("Earn countup element");
      this.simpleCountCategories.start();
      this.simpleCountUpCoffe.start();
      this.simpleCountUpMovies.start();
      this.simpleCountUpIdeas.start();
    });
  }
};
</script>

<style lang="scss">
.home {
  padding: 0;
  margin: 0;
  position: relative;
  z-index: 0;

  .block_title {
    background-color: $c-dark-theme;
    margin-bottom: 0;
    padding-bottom: 40px;
  }

  .countup {
    background-image: linear-gradient(to right bottom, $c-skyblue, $c-middleblue);
    padding: 50px 0;

    .wrapper {
      @media #{$r-max-laptop-m} {
        width: 100%;
      }
    }

    &-container {
      @include flexCenter();
      width: 100%;

      @media #{$r-max-laptop-m} {
        display: grid;
        grid-template-columns: repeat(2, auto);
        justify-content: center;
      }

      @media (max-width: 580px) {
        @include flexCenter();
        flex-direction: column;
      }
      
      &_box {
        width: 100%;
        @include flexCenter();
        flex-direction: column;
        margin: 0 15px;
        border-radius: 6px;
        background-color: $c-dark-blue;
        padding: 40px;
        clip-path: polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%);

        &:first-child {
          margin: 0;
          margin-right: 15px;
        }

        &:last-child {
          margin: 0;
          margin-left: 15px;
        }

        @media #{$r-max-laptop-m} {
          margin: 15px;
          width: 260px;
          height: 260px;

          &:first-child {
            margin: 15px;
          }

          &:last-child {
            margin: 15px;
          }
        }

        &__icon {
          margin: 0 0 10px;
          width: auto;

          i {
            font-size: 38px;
            color: $c-e;
          }
        }

        &__number {
          margin: 10px 0;
          display: flex;
          align-items: center;

          span {
            text-align: center;
            font-size: 42px;
            font-weight: 700;
            color: $c-orange;
          }
        }

        &__name {
          margin: 10px 0 0;
          font-size: 18px;
          font-weight: 400;
          color: $c-e;
          text-transform: uppercase;
          position: relative;
          text-align: center;

          &::after {
            position: absolute;
            content: "";
            bottom: -15px;
            left: 50%;
            transform: translateX(-50%);
            width: 50px;
            height: 1px;
            background-color: $c-e;
            border-radius: 10px;
          }
        }
      }
    }
  }
}
</style>