<template>
<section class="pricing">
    <BlockTitle :title="'Pricing'" />
    <div class="wrapper">

        <div class="pricing-table">
            <div class="pricing-table-col">
                <h2 class="pricing-table-col_title">Basic</h2>
                <h1 class="pricing-table-col-price">9€<span>/Month</span></h1>
                <ul class="package">
                    <li class="package-item">Ads</li>
                    <li class="package-item">Profile Edit</li>
                    <li class="package-item">No 18+ Content</li>
                    <li class="package-item">No Video Offers</li>
                    <li class="package-item">No Content For Kids</li>
                    <li class="package-item">No Children Lock</li>
                    <li class="package-item"><a class="package-item-button">BUY NOW</a></li>
                </ul>
            </div>
            <div class="pricing-table-col">
                <h2 class="pricing-table-col_title">Advanced</h2>
                <h1 class="pricing-table-col-price">12€<span>/Month</span></h1>
                <ul class="package">
                    <li class="package-item">No Ads</li>
                    <li class="package-item">Profile Edit</li>
                    <li class="package-item">18+ Content</li>
                    <li class="package-item">Free Video Offers Twice</li>
                    <li class="package-item">Content For Kids</li>
                    <li class="package-item">Children Lock</li>
                    <li class="package-item"><a class="package-item-button">BUY NOW</a></li>
                </ul>
            </div>
            <div class="pricing-table-col pro">
                <span class="ribbon">OFFER</span>
                <h2 class="pricing-table-col_title pro">Premium</h2>
                <h1 class="pricing-table-col-price pro">25€<span>/Month</span></h1>
                <ul class="package">
                    <li class="package-item">No Ads</li>
                    <li class="package-item">Profile Edit</li>
                    <li class="package-item">18+ Content</li>
                    <li class="package-item">Free Video Offers Anytime</li>
                    <li class="package-item">Content For Kids</li>
                    <li class="package-item">Children Lock</li>
                    <li class="package-item"><a class="package-item-button pro">BUY NOW</a></li>
                </ul>
            </div>
        </div>

    </div>
</section>
</template>

<script>
import BlockTitle from "@/components/global/BlockTitle.vue";

    export default {
        name: "Pricing",
        components: {
            BlockTitle
        },
    }
</script>

<style lang="scss" scoped>
.pricing {
    width: 100%;
    height: auto;
    background-color: $c-dark-theme;

    .wrapper {
        @media #{$r-max-laptop-m} {
            width: 100%;
        }
    }

    &-table {
        margin: 50px 0 0;
        width: 100%;
        height: 100%;
        display: flex;
        font-family: $c-main-font;

        @media #{$r-max-tablet} {
            flex-direction: column;
            margin: 30px auto 0;
            max-width: 410px;
        }

        &-col {
            width: 100%;
            height: 100%;
            display: flex;
            flex-direction: column;
            text-align: center;
            border-radius: 5px;
            background-color: $c-white;

            &:nth-child(2) {
                margin: 0 30px;

                @media #{$r-max-laptop-s} {
                    margin: 0 15px;
                }

                @media #{$r-max-tablet} {
                    margin: 30px 0;
                }
            }

            &.pro {
                position: relative;
                overflow: hidden;

                .ribbon {
                    position: absolute;
                    top: 9px;
                    right: -36px;
                    background-color: $c-green-theme;
                    color: $c-white;
                    font-size: 14px;
                    line-height: 39px;
                    font-weight: 400;
                    width: 120px;
                    height: 24px;
                    transform: rotate(45deg);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            }

            &_title {
                @include flexCenter();
                font-size: 24px;
                line-height: 39px;
                color: $c-7;
                font-weight: 700;
                text-transform: uppercase;
                margin: 0;
                padding: 10px 0;

                &.pro {
                    color: $c-green-theme;
                }

                @media #{$r-max-mobile-s} {
                    font-size: 20px;
                }
            }

            &-price {
                background-color: $c-blue;
                font-size: 39px;
                line-height: 34px;
                color: $c-white;
                font-weight: 700;
                padding: 30px 0;
                margin: 0;

                &.pro {
                    background-color: $c-green-theme;
                }

                @media #{$r-max-mobile-s} {
                    font-size: 25px;
                    padding: 15px 0;
                }

                span {
                    font-size: 14px;
                }
            }

            .package {
                padding: 0;
                margin: 0;

                &-item {
                    list-style: none;
                    border: 1px solid $c-d;
                    font-size: 14px;
                    line-height: 47px;
                    color: $c-6;
                    font-weight: 400;

                    &:last-child {
                        padding: 20px 0;
                        border-bottom-left-radius: 5px;
                        border-bottom-right-radius: 5px;
                    }

                    &-button {
                        font-size: 14px;
                        line-height: 55px;
                        color: $c-white;
                        font-weight: 700;
                        border-radius: 3px;
                        background-color: $c-blue;
                        padding: 18px 50px;
                        cursor: pointer;
                        transition: all .3s ease-in-out;

                        &.pro {
                            background-color: $c-green-theme;
                        }

                        &:hover {
                            background-color: $c-error2;
                        }
                    }
                }
            }
        }
    }
}
</style>