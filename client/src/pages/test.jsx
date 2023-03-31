.booking {
  background-color: $color1;
  text-align: center;

  .main_img img {
    width: 100%;
    height: 100%;
  }
  .container {
    .choose-villas-cards {
      @media screen and (min-width: $breakPoint-Desktop) {
        display: flex;
      }
    }
    max-width: 90%;
    margin: 0 auto;
    > * {
      margin-bottom: 40px;
    }
    .head-div {
      height: 60px;
      background-color: rgb(91, 94, 97);
      width: 100%;
      h3 {
        margin-left: 5rem;
        text-align: left;
        font-family: $rob4;
        color: $color1;
        padding: 10px 0;
        font-size: 1.75rem;
        letter-spacing: 2px;
        text-transform: uppercase;
      }
    }
    .title-choose {
      margin-top: 25px;
      padding: 30px;
      background-color: rgb(237, 237, 237);
      h1 {
        @media screen and (min-width: $breakPoint-Desktop) {
          font-size: 2.875rem;
          line-height: 2.875rem;
        }
        font-size: 2rem;
        color: $color4;
        line-height: 2rem;
        font-family: $pop2;
      }
    }

    .choose-villas {
    }
    .title-cards {
      margin-top: 25px;
      padding: 30px;
      background-color: rgb(237, 237, 237);
      h3 {
        font-size: 2.875rem;
        color: $color4;

        line-height: 2.875rem;
        font-family: $pop2;
      }
    }
    .choose-villa-card {
      @media screen and (min-width: $breakPoint-Desktop) {
        @include around;
        max-width: 80%;
      }
      @include around;
      max-width: 80%;
      border: 1px solid $color1;
      box-shadow: 0px 0px 6px #6e6161;
      border-radius: 10px;
      margin: 1.5rem auto;
      .swipe {
        height: 40rem;
        width: 100%;

        /*           max-height: 200px; */
        .swiper-pagination-bullet-active {
          background-color: rgb(36, 34, 34);
        }
        .swiper-wrapper {
          width: 500px;
        }
        .swiper,
        .swiper-initialized,
        .swiper-horizontal,
        .swiper-backface-hidden,
        .mySwiper {
          width: 100%;
        }
        max-width: 500px;
        .swiper-slide .swiper-slide-active {
          min-width: 100%;
        }
        div {
          border-radius: 5px;
          min-width: 100%;
        }
        .swiper .swiper-initialized,
        .swiper-horizontal,
        .swiper-backface-hidden,
        .mySwiper {
          max-width: 300px;
        }
      }

      //calendar
      .choose-villa-infos {
        @include flex;
        .card-infos {
          padding: 15px 0;
          > * {
            margin-bottom: 15px;
          }
          h2 {
            font-family: $pop2;
            font-size: 1.875rem;
            line-height: 2.875rem;
            color: $color4;
          }

          .guests {
            > * {
              margin-bottom: 15px;
            }
            .infos {
              div {
                width: 50%;
                margin: 15px auto;
                display: flex;
                justify-content: space-around;
              }

              font-size: 1rem;
              font-family: $gildas;
              > * {
                margin-left: 25px;
              }
              .house {
                position: relative;
                &::before {
                  position: absolute;
                  content: "";
                  width: 2px;
                  height: 100%;
                  background-color: #8a2525;
                  left: -8px;
                  bottom: 0;
                }
              }
              .price {
                position: relative;
                font-family: $pop2;
                font-size: 1.375rem;
                color: $color4;
                line-height: 1.375rem;
              }
            }

            .date {
              /*  @media screen and (max-width: 377px) {
                .rdrMonth,
                .rdrMonthAndYearWrapper,
                .rdrDateDisplayWrapper {
                  width: 80%;
                  margin: 0 auto;
                }
              } */
              .header-book {
                margin-top: 1rem;
                font-size: 1rem;

                max-width: 80%;
                margin: 20px auto;
                box-shadow: 0 0 5px #746b6b;
                padding: 10px 15px;
                .headerSearchText {
                  margin: 40px 20px;
                  font-family: $gildas;
                  font-weight: 700;
                  font-size: 1.2rem;
                  letter-spacing: 2px;
                  color: #767575;
                }
              }
              .link {
                margin: 20px;
                p {
                  font-size: 1rem;
                  font-family: $rob3;
                  color: #878788;
                  line-height: 2rem;
                }

                button {
                  cursor: pointer;
                  padding: 10px 20px;
                }
              }
            }
          }
          #button {
            font-family: "font-rob300", sans-serif;
            font-size: 0.938rem;
            color: rgb(56, 54, 54);
            background: rgb(255, 255, 255);
            cursor: pointer;
            line-height: 18px;
            letter-spacing: 1px;
            padding: 10px 30px;
            transition: 0.4s;
            border: 2px solid black;
            border-radius: 5px;
            transition: 0.4s linear;
            &:hover {
              transform: scale(1.1);
              background-color: black;
              color: white;
              font-family: 1.1rem;
            }
            span {
              color: rgb(53, 139, 53);
            }
          }
        }
      }
    }
  }
}
