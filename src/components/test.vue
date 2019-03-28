<template>
  <div id="test" @resize="lengthBlockCard(lengthString,dataCard);">
    <div class="block" ref="block">
      <div class="block-text">
        <span>Ты сегодня покормил кота?</span>
      </div>
      <div class="block-card">
        <div class="block-card__card"
             v-for="key in dataCard.length"
             ref="blockCard"
        >
          <card :dataCard="dataCard[key-1]"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import Card from "@/components/card";

  export default {
    name: 'test',
    components: {Card},
    data() {
      return {
        window: {
          width: 0,
          height: 0
        },
        clientWidth: Number,
        // эмитация данных с сервера
        dataCard: [
          {
            idCard: 1,
            nursling: 'cat',
            share: true,
            nameCompany: 'Сказачное заморское яство',
            nameProduct: 'Нямушка',
            composition: 'фуа-гра',
            textActive: 'Печень утки разварная с артишоками.',
            massNominal: 0.5,
            residue: 0,
            nominal: 10
          },{
            idCard: 2,
            nursling: 'cat',
            share: true,
            nameCompany: 'Сказачное заморское яство',
            nameProduct: 'Нямушка',
            composition: 'рыбой',
            textActive: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
            massNominal: 0.5,
            residue: 10,
            nominal: 10
          },{
            idCard: 3,
            nursling: 'cat',
            share: true,
            nameCompany: 'Сказачное заморское яство',
            nameProduct: 'Нямушка',
            composition: 'рыбой',
            textActive: 'Головы щучьи с чесноком да свежайшая сёмгушка.',
            massNominal: 0.5,
            residue: 10,
            nominal: 10
          }
        ],
        lengthString: Number,
        textblock: 80,
        marginTop: 50
      };
    },
    /**
     * метод расчитывает количество строк дял дальнейшего построения
     */
    methods: {
      handleResize() {
        this.window.width = window.innerWidth;
        this.window.height = window.innerHeight;
        this.lengthBlockCard(this.lengthString, this.dataCard);
      },
      heightWindow(numberCard) {
        this.lengthString = Math.ceil(numberCard.length / 3);
      },
      lengthBlockCard(NumberString, card) {
        let widthBlock = 0;
        let clientWidth = this.window.width;
        //если дефолт
        if (clientWidth > '1280') {
          widthBlock = NumberString * 480 + this.textblock + (this.marginTop * (NumberString+4));
          this.$refs.block.style.height = `${widthBlock}px`;
          //если планшет
        } else if (clientWidth < '1280' && clientWidth > '768') {
          let freeBlock = 0;
          let length = card.length;
          let lengthDop = Math.floor(length / 3);
          if (length <= 3) {
            if (length === 3) {
              freeBlock = 2;
            } else {
              freeBlock = 1;
            }
          } else if (length > 3) {
            freeBlock = Math.ceil(length / 3) + lengthDop;
          }
          widthBlock = freeBlock * 480 + this.textblock + (this.marginTop * (NumberString * 3) + this.marginTop*2);
          this.$refs.block.style.height = `${widthBlock}px`;
          // если телефон
        } else if (clientWidth < '768' && clientWidth > '360') {
          widthBlock = card.length * 480 + this.textblock + (card.length * this.marginTop*2);
          this.$refs.block.style.height = `${widthBlock}px`;
        }
        console.log(widthBlock / this.lengthString)
      }
    },
    created() {

      window.addEventListener('resize', this.handleResize)
      this.handleResize();
    },
    mounted() {
      this.heightWindow(this.dataCard);
      this.lengthBlockCard(this.lengthString, this.dataCard);
    },
    destroyed() {
      window.removeEventListener('resize', this.handleResize)
    },
  };
</script>


<style lang="sass">
  $color-header__text: #ffffff
  @media (min-width: 768px) and (max-width: 1280px)
    .block
      &-card
        &__card
          transition: 0.1s linear
          width: calc(100% / 2) !important
          display: flex
          justify-content: center
          align-items: center
          margin-top: -80px!important
          #card
        &__card:nth-child(3n)
          width: 100% !important

  @media (min-width: 360px) and (max-width: 768px)
    .block
      &-text
        font-size: 24px !important
      &-card
        &__card
          transition: 0.1s linear
          width: 100% !important
          display: flex
          justify-content: center
          align-items: center
          margin-top: -55px!important
          #card
            width: 320px !important


  #test
    min-height: 100vh
    width: 100%
    background: url("../../static/img/patternOne.png") center center repeat fixed
    display: flex
    .block
      width: 1280px
      min-height: 680px
      display: flex
      justify-content: space-around
      flex-flow: column
      margin: auto
      transition: 0.3s
      &-text
        font-size: 36px
        font-family: "Exo2.0"
        color: #ffffff
        line-height: 1.2
        text-align: center
        text-shadow: 0 1px 0 rgba(0, 0, 0, 0.004)
        margin: 0
        transition: 0.3s
      &-card
        display: flex
        flex-wrap: wrap
        justify-content: center
        height: 100%
        margin: 0
        transition: 0.3s
        > div:nth-child(1)
          > div
            margin-left: 30px
        > div:nth-child(3)
          > div
            margin-left: -30px
        &__card
          transition: 0.1s linear
          width: calc(100% / 3)
          display: flex
          justify-content: center
          #card
            height: 480px
            margin-top: 35px
            margin-bottom: 15px

</style>
