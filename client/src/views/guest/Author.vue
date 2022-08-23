<template>
  <div class="about_view">
    <HeaderUser v-if="activeUser" />
    <Header v-else-if="!activeUser || activeUser == null" />
    <BackButton />
    <div class="about">
      <div class="wrapper">
        <div class="about__top">

          <div class="about__top-pic">
            <div class="img-container">
              <img class="aboutme" alt="Picture about me" src="../../assets/images/profile.jpg">
              <a class="social" target="blank" href="https://www.facebook.com/krisztian.pasztor.56"><i class="icon fab fa-facebook"></i></a>
              <a class="social" target="blank" href="https://www.instagram.com/christian.pasztor/?hl=en"><i class="icon fab fa-instagram"></i></a>
              <a class="social" href="tel:+381 61-505-1095"><i class="icon fas fa-phone"></i></a>
              <a class="social" target="blank" href="https://github.com/pkrisz20"><i class="icon fab fa-github"></i></a>
              <a class="social" target="blank" href="https://twitter.com/Kriszti45075299"><i class="icon fab fa-twitter"></i></a>
              <a class="social" target="blank" href="mailto:krisztianpasztor11@gmail.com"><i class="icon fas fa-paper-plane"></i></a>
            </div>
          </div>

          <div class="about__top-nametext">
            <h1>Hi,</h1>
            <h1>I'm <span class="name">Krisztian Pasztor</span></h1>
            <h2>Junior Web Developer</h2>
            <a href="https://digitalhive.io/" target="blank" class="my-workplace">Where do I practice? <i class="fas fa-long-arrow-alt-right"></i></a>
          </div>

        </div>

        <div class="about__bottom">

          <Tabs>
            <Tab class="tab" name="Skills" :selected="true">

              <div class="skill">
                <h3 class="skill-name">HTML</h3>
                <h3 class="skill-name">JavaScript</h3>
                <h3 class="skill-name">CSS / SASS</h3>
                <h3 class="skill-name">VueJS</h3>
                <h3 class="skill-name">Photoshop</h3>
                <h3 class="skill-name">C#</h3>
              </div>

              <div class="diagram">
                <div class="diagram-bar html"></div>
                <div class="diagram-bar js"></div>
                <div class="diagram-bar css"></div>
                <div class="diagram-bar vue"></div>
                <div class="diagram-bar ph"></div>
                <div class="diagram-bar csharp"></div>
              </div>

            </Tab>
            <Tab class="tab" name="Education">
              <ul class="schools">
                <li class="item">
                  <p class="date">2007 - 2015</p>
                  <p>Hunyadi Janos Elementary School at Csantaver</p>
                </li>
                <li class="item">
                  <p class="date">2015 - 2019</p>
                  <p>"Ivan Saric" Technical School at Subotica</p>
                </li>
                <li class="item">
                  <p class="date">2019 - 2022</p>
                  <p>Subotica Tech - College of Applied Sciences</p>
                </li>
              </ul>
            </Tab>
            <Tab class="tab" name="About me">
              <p class="mystory">Hello Visitor. My name is Kriszitan Pasztor. I made this website on my own. I live in Csantaver. I was born at Subotica in 2000. Now I'm 22 years old and I have big plans for the future. My father is woodworker. My mother is nurse in the hospital at Subotica. We live at the edge of our town. My biggest dream is to become a programmer and work as Front-End developer by an IT company. My second biggest dream is an american journey around the United States.</p>
            </Tab>
          </Tabs>
        </div>

      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Tabs from "@/components/global/Tabs.vue";
import Tab from "@/components/global/Tab.vue";
import Footer from "@/components/global/Footer.vue";
import BackButton from "@/components/global/BackButton.vue";
import HeaderUser from "@/components/user/HeaderUser.vue";
import Header from "@/components/guest/Header.vue";
import { mapState } from "vuex";

export default {
  name: "About",
  components: {
    Tabs,
    Tab,
    Footer,
    BackButton,
    HeaderUser,
    Header
  },
  computed: {
    ...mapState({
      activeUser: state => state.isLoggedIn
    })
  },
  mounted() {
    this.$store.dispatch("getLoginStatus");
    this.$store.state.httpStatus = 200; //need to be loaded
  },
  updated() {
    if (this.activeUser) {
      this.$store.dispatch('getFavourites');
      this.$store.dispatch("getMyList");
    }
  }
}
</script>

<style lang="scss">
.about_view {
  min-height: 100vh;
  position: relative;
  z-index: 0;

  .about {
    min-height: 100vh;
    width: 100%;
    height: 100%;
    background-color: $c-dark-blue;

    .wrapper {
      @media #{$r-max-laptop-m} {
        width: calc(100% - 30px); //I dont know from where comes this 30px
        margin: 0;
      }
    }

    &__top {
      display: flex;
      justify-content: space-around;
      align-items: center;
      padding: 100px 15px 0;
      height: auto;

      @media #{$r-max-laptop-m} {
        width: 100%;
        margin: 0;
        padding: 80px 0 0;
      }

      @media #{$r-max-tablet} {
        padding: 80px 0 0;
        flex-direction: column-reverse;
        justify-content: center;
      }

      &-pic {
        height: 500px;
        width: auto;

        @media #{$r-max-laptop-s} {
          height: auto;
          width: 360px;
        }

        @media #{$r-max-tablet} {
          width: 60%;
          margin-top: 50px;
        }

        .img-container {
          width: 100%;
          height: 100%;
          cursor: pointer;
          overflow: hidden;
          position: relative;

          img {
            @include object-fit();
            width: 100%;
            height: 100%;
            border-radius: 5px;
          }

          .social {
            text-decoration: none;

            .icon {
              position: absolute;
              font-size: 40px;
              color: $c-white;
              pointer-events: none;
              transition: all .2s ease-in-out;

              &.fa-facebook {
                top: 25%;
                transform: translateY(-25%);
                left: -45px;

                &:hover {
                  color: $c-facebook;
                }
              }

              &.fa-instagram {
                top: 50%;
                transform: translateY(-50%);
                left: -45px;

                &:hover {
                  color: $c-instagram;
                }
              }

              &.fa-phone {
                top: 75%;
                transform: translateY(-75%);
                left: -45px;

                &:hover {
                  color: $c-phone;
                }
              }

              &.fa-paper-plane {
                top: 25%;
                transform: translateY(-25%);
                right: -45px;

                &:hover {
                  color: $c-orange;
                }
              }

              &.fa-twitter {
                top: 50%;
                transform: translateY(-50%);
                right: -45px;

                &:hover {
                  color: $c-twitter;
                }
              }

              &.fa-github {
                top: 75%;
                transform: translateY(-75%);
                right: -45px;

                &:hover {
                  color: $c-github;
                }
              }
            }
          }

          &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: transparent;
            opacity: .8;
            transition: all .3s;
            border-radius: 5px;
          }

          &:hover::before {
            background-color: $c-black;
          }

          &:hover {

            .social {

              .icon {
                pointer-events: auto;

                &.fa-facebook, &.fa-instagram, &.fa-phone {
                  left: 50px;
                }

                &.fa-paper-plane, &.fa-twitter, &.fa-github {
                  right: 50px;
                }
              }
            }
          }
        }
      }

      &-nametext {
        height: 100%;

        @media #{$r-max-tablet} {
          text-align: center;
        }

        h1 {
          color: $c-c;
          font-size: 50px;

          @media #{$r-max-laptop-s} {
            font-size: 32px;
          }

          @media #{$r-max-mobile-l} {
            font-size: 26px;
          }

          .name {
            color: $c-dark-blue;
            background-color: $c-c;
            border-radius: 5px;
            padding: 2px 10px;
          }
        }

        h2 {
          font-size: 36px;
          color: $c-green-theme;

          @media #{$r-max-laptop-s} {
            font-size: 30px;
          }

          @media #{$r-max-mobile-l} {
            font-size: 22px;
            margin-bottom: 30px;
          }
        }

        .my-workplace {
          border: 2px solid $c-c;
          font-size: 16px;
          font-family: $c-main-font;
          padding: 12px 18px;
          color: $c-c;
          cursor: pointer;
          text-decoration: none;
          background: transparent;
          transition: color .3s ease-in-out;
          z-index: 1;
          position: relative;

          &::before {
            position: absolute;
            content: '';
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            z-index: -1;
            transition: transform .3s ease-in-out;
            background-color: $c-c;
            transform: scaleX(0);
            transform-origin: left;
          }

          &:hover::before {
            transform: scaleX(1);
          }

          &:hover {
            color: $c-dark-theme;
          }
        }
      }
    }

    &__bottom {
      height: auto;
      margin: 50px auto 0;

      @media #{$r-max-laptop-m} {
        width: 100%;
        margin: 40px 0 0;
        padding: 0;
      }

      .tabs-container {

        .tabs {
            ul {
                @include flexCenter();
                padding: 0;
                margin: 0;

                li {
                    list-style-type: none;
                    margin: 0 15px;
                    padding: 8px 12px;
                    position: relative;
                    cursor: pointer;

                    @media #{$r-max-mobile-l} {
                      margin: 0;
                    }

                    &::before {
                        transition: all .3s;
                        position: absolute;
                        content: '';
                        bottom: 0;
                        left: 0;
                        height: 2px;
                        width: 100%;
                        background-color: transparent;
                    }

                    a {
                        text-decoration: none;
                        color: $c-c;
                        font-size: 26px;
                        transition: .3s;

                        @media #{$r-max-mobile-l} {
                          font-size: 16px;
                        }
                    }

                    &.is-active {
                        &::before {
                            background-color: $c-green-theme;
                        }
                        a {
                            color: $c-green-theme;
                        }
                    }

                    &:hover {
                        &::before {
                            background-color: $c-green-theme;
                        }
                        a {
                            color: $c-green-theme;
                        }
                    }
                }
            }
        }

        .tabs-details {
          margin: 30px auto 0;
          width: 100%;
          min-height: 260px;

          @media #{$r-max-laptop-m} {
            padding: 0 15px;
            width: auto;
          }

          .tab {
            @include flexCenter();
            width: 100%;

            .skill {
              display: flex;
              flex-direction: column;
              align-items: flex-end;
              width: auto;
              margin-right: 20px;

              &-name {
                color: $c-c;
                font-size: 24px;
                margin: 6px 0;

                @media #{$r-max-mobile-l} {
                  font-size: 16px;
                  margin: 12px 0;
                }
              }
            }

            .diagram {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              width: 50%;

              &-bar {
                height: 24px;
                margin: 9px 0;

                &.html {
                  width: 100%;
                  background-color: $c-orange;
                }
                &.css {
                  width: 85%;
                  background-color: $c-error;
                }
                &.js {
                  width: 75%;
                  background-color: $c-yellow;
                }
                &.vue {
                  width: 60%;
                  background-color: $c-green-theme;
                }
                &.ph {
                  width: 65%;
                  background-color: $c-blue;
                }
                &.csharp {
                  width: 50%;
                  background-color: $c-purple;
                }
              }
            }

            .schools {
              padding: 0;
              margin: 0;

              @media #{$r-max-mobile-s} {
                text-align: center;
              }

              .item {
                font-size: 24px;
                color: $c-c;
                margin: 0 0 20px;
                display: flex;
                flex-direction: column;
                align-items: center;

                @media #{$r-max-tablet} {
                  font-size: 20px;
                }

                @media #{$r-max-mobile-l} {
                  font-size: 16px;
                }

                p {
                  margin: 0;

                  &.date {
                    font-weight: 600;
                    color: $c-green-theme;
                  }
                }
              }
            }

            .mystory {
              color: $c-c;
              font-size: 18px;
              line-height: 30px;
              text-align: justify;

              @media #{$r-max-mobile-l} {
                font-size: 16px;
                line-height: 26px;
              }
            }
          }
        }
      }
    }
  }
}
</style>