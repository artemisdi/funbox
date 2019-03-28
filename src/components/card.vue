<template>
  <div id="card">
    <div class="card-block"
         ref="cardBlock"
         v-if="isActiveClass.defolt.status"
         :id="dataCard.idCard"
         @mouseenter="isActiveClass.defolt.hoverClass = true" @mouseleave="isActiveClass.defolt.hoverClass = false"
         :class="isActiveClass.defolt.hoverClass ? 'border-defolt-hover' : 'border-defolt'"
         @click="clickCard($event,isActiveClass)"
    >
      <div class="card-block__img-border "></div>
      <div class="card-block__img-photo">
        <div class="card-block__img-photo-card photo-card"></div>
      </div>
      <div class="card-block__text">
        <span>{{ dataCard.nameCompany }}</span>
        <span>{{ dataCard.nameProduct }}</span>
        <span>c {{ dataCard.composition}}</span>
        <div class="card-block__text-portion">
          <span>{{ dataCard.nominal }} порций</span>
          <span v-if="dataCard.share"> {{present(dataCard)}}</span>
          <!-- доп проверка на наличие акции, если нет, то не отрисовывается span -->
          <span v-if="dataCard.nominal === 100">заказчик доволен</span>
        </div>
      </div>
      <div class="card-block__radius">
        <span>{{dataCard.massNominal }}</span>
        <span>кг</span>
      </div>
      <div class="card-block__text-footer">
        <span v-if="dataCard.nursling === 'cat'" class="text-buy" ref="textBuy">Чего сидишь? порадуй котэ,</span>
        <span v-if="dataCard.nursling === 'dog'" class="text-buy" ref="textBuy">Чего сидишь? порадуй собакена,</span>
        <span class="button-buy" ref="buttonBuy">купи</span><span>.</span>
      </div>
      <!--<div class="test-photo"></div>-->
    </div>
    <div class="card-block"
         ref="cardBlock"
         :id="dataCard.idCard"
         v-if="isActiveClass.selected.status"
         @mouseenter.once="isActiveClass.selected.hoverClass = true"
         @mouseleave="isActiveClass.selected.hoverClass = false"
         :class="isActiveClass.selected.hoverClass ? 'border-selected' : 'border-selected-hover'"
         @click="clickCard($event,isActiveClass)"
    >
      <div class="card-block__img-border "></div>
      <div class="card-block__img-photo">
        <div class="card-block__img-photo-card photo-card"></div>
      </div>
      <div class="card-block__text">
        <span v-if="isActiveClass.selected.hoverClass">{{ isActiveClass.selected.text.defolt }}</span>
        <span v-if="!isActiveClass.selected.hoverClass && dataCard.nursling === 'cat' " class="selected-hover-text">{{ isActiveClass.selected.text.hoverCat }}</span>
        <span v-if="!isActiveClass.selected.hoverClass && dataCard.nursling === 'dog' " class="selected-hover-text">{{ isActiveClass.selected.text.hoverDog }}</span>
        <span>{{ dataCard.nameProduct }}</span>
        <span>c {{ dataCard.composition}}</span>
        <div class="card-block__text-portion">
          <span>{{ dataCard.nominal }} порций</span>
          <span v-if="dataCard.share"> {{present(dataCard)}}</span>
          <!-- доп проверка на наличие акции, если нет, то не отрисовывается span -->
          <span v-if="dataCard.nominal === 100">заказчик доволен</span>
        </div>
      </div>
      <div class="card-block__radius">
        <span>{{dataCard.massNominal }}</span>
        <span>кг</span>
      </div>
      <div class="card-block__text-footer">
        <span v-if="dataCard.nursling === 'cat'" class="text-buy" ref="textBuy">Чего сидишь? порадуй котэ,</span>
        <span v-if="dataCard.nursling === 'dog'" class="text-buy" ref="textBuy">Чего сидишь? порадуй собакена,</span>
        <span class="button-buy" ref="buttonBuy">купи</span><span>.</span>
      </div>
      <!--<div class="test-photo"></div>-->
    </div>
    <div class="card-block border-disabled"
         ref="cardBlock"
         :id="dataCard.idCard"
         v-if="isActiveClass.disabled.status"
         @click="clickCard($event,isActiveClass)"
    >
      <div class="card-block__img-border "></div>
      <div class="card-block__img-photo">
        <div class="card-block__img-photo-card photo-card"></div>
      </div>
      <div class="card-block__text">
        <span>{{ dataCard.nameCompany }}</span>
        <span>{{ dataCard.nameProduct }}</span>
        <span>c {{ dataCard.composition}}</span>
        <div class="card-block__text-portion">
          <span>{{ dataCard.nominal }} порций</span>
          <span v-if="dataCard.share"> {{present(dataCard)}}</span>
          <!-- доп проверка на наличие акции, если нет, то не отрисовывается span -->
          <span v-if="dataCard.nominal === 100">заказчик доволен</span>
        </div>
      </div>
      <div class="card-block__radius">
        <span>{{dataCard.massNominal }}</span>
        <span>кг</span>
      </div>
      <div class="card-block__text-footer">
        <span v-if="dataCard.nursling === 'cat'" class="text-buy" ref="textBuy">печалька, c {{ dataCard.composition}} закончился.</span>
      </div>
      <!--<div class="test-photo"></div>-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "card",
    props: {
      dataCard: Object
    },
    data() {
      return {
        isActiveClass: {
          defolt: {
            status: true,
            hoverClass: false
          },
          selected: {
            status: false,
            hoverClass: false,
            text: {
              defolt: this.dataCard.nameCompany,
              hoverCat: 'Котэ не одобряет?',
              hoverDog: 'Собакен всегда рад :)',
            }
          },
          disabled: {
            status: false
          }
        },
        present: (dataCardServer) => {
          if (dataCardServer.share && dataCardServer.nursling === 'cat') {
            switch (dataCardServer.nominal) {
              case 10:
                return 'мышь в подарок';
              case 40:
                return '2 мыши в подарок';
              case 100:
                return '5 мышей в подарок';
            }
          } else {
            return 'акций пока нет';
          }
        },
        isHover: true
      }
    },
    methods: {
      /**
       * метод проверяющий остаток и в случае необходимости показывающий заблокированный товар
       * @param objServer - пришедшие с сервера данные
       * @param activeClass - активный класс
       */
      addDataServer(objServer, activeClass) {
        if (objServer.residue <= 0) {
          activeClass.defolt.status = false;
          activeClass.disabled.status = true;
        }
      },
      /**
       * метод меняющий текст при выборе упаковки
       * @param event - елемент по котрому кликаем
       * @param activeClass - объект с определнным классом
       */
      clickCard(event, activeClass) {
        let nursling = this.dataCard.nursling;
        // если есть класс disablrd и не текст подвала
        if (!event.currentTarget.classList.contains('border-disabled') &&
          !event.target.classList.contains('card-block__text-footer') &&
          !event.target.classList.contains('text-buy')) {
          // тогда делаем активным
          activeClass.defolt.status = !activeClass.defolt.status;
          activeClass.selected.status = !activeClass.selected.status;
          // если класс hover
          if (activeClass.defolt.hoverClass) {
            // тогда меняем текста
            activeClass.defolt.hoverClass = !activeClass.defolt.hoverClass;
            this.$refs.textBuy.innerHTML = this.dataCard.textActive;
            this.$refs.buttonBuy.style.display = 'none'
            // иначе возвращаем изначальный
          } else {
            switch (nursling) {
              case 'cat':
                this.$refs.textBuy.innerHTML = 'Чего сидишь? порадуй котэ,';
                break;
              case 'dog':
                this.$refs.textBuy.innerHTML = 'Чего сидишь? порадуй собакена,';
                break;
            }

            this.$refs.buttonBuy.style.display = 'inline-block'
          }
        }
      }
    },
    mounted() {
      this.addDataServer(this.dataCard, this.isActiveClass)
    }
  }
</script>


<style lang="sass">
  $color-defolt: #1698d9
  $color-defolt-hover: #2ea8e6
  $color-text: #ffffff
  $colorGray: #666666
  $colorBlack: #000000
  $color-selected: #d91667
  $color-selected-hover: #e62e7a
  $color-link: #107cb2
  $color-disabled: #b3b3b3
  $color-disabled-text: #ffff66


  #card
    position: relative
    cursor: pointer
    user-select: none

    /*.test-photo*/
      /*width: 100%*/
      /*height: 100%*/
      /*position: absolute*/
      /*top: 0*/
      /*left: 0*/
      /*z-index: 101*/
      /*opacity: 0.5*/
      /*background-image: url("../../static/img/cardTest.png")*/



    .card-block
      width: 320px
      min-width: 320px
      height: 100%
      max-height: 480px
      position: relative
      font-family: "Trebuchet MS"
      &__img-border
        width: 100%
        height: 100%
        background-position: center
        background-repeat: no-repeat
        position: absolute
        top: 0
        left: 0
      &__img-photo
        width: 99.1%
        height: 99.1%
        position: absolute
        overflow: hidden
        border-radius: 10px
        margin-left: 0.9%
        &-card
          width: 100%
          height: 100%
          background-repeat: no-repeat
          background-position: bottom
          position: absolute
          left: 0
          bottom: -91px
      &__radius
        /*width: 81px*/
        /*height: 81px*/
        width: 25.4%
        height: 16.9%
        max-width: 81px
        max-height: 81px
        position: absolute
        /*bottom: 15px*/
        /*right: 15px*/
        bottom: 3.1%
        right: 4.7%
        border-radius: 50%
        display: flex
        justify-content: center
        align-items: center
        flex-flow: column
        span
          color: $color-text
          margin: 0
          position: relative
        span:nth-child(1)
          max-font-size: 42px
          font-size: 261%
          line-height: 0.524
          top: 4px
        span:nth-child(2)
          top: 10px
          font-size: 21px
      &__text
        position: relative
        display: flex
        flex-flow: column
        span
          font-size: 16px
          text-align: left
          margin-left: 48.2px
          line-height: 1.2
        > span:nth-child(1)
          margin-top: 20px
          color: $colorGray
        > span:nth-child(2)
          font-size: 48px
          font-weight: bold
          margin-top: 5px
          margin-left: 46px
          color: $colorBlack
        > span:nth-child(3)
          font-size: 24px
          font-weight: bold
          margin-top: -3px
          color: $colorBlack
        &-portion
          display: flex
          flex-flow: column
          margin-top: 13px
          span
            font-size: 14px
            text-align: left
            font-weight: bold
            color: $colorGray
          span:nth-child(1)
            letter-spacing: -0.2px
          span:nth-child(2)
            letter-spacing: -0.4px
          span:nth-child(3)
            margin-top: -1px
            letter-spacing: -0.4px
      &__text-footer
        width: 100%
        position: absolute
        bottom: -30px
        text-align: center
        display: flex
        justify-content: center
        align-items: end
        height: 30px
        span
          font-size: 13px
          line-height: 1.231
          color: $color-text
          text-shadow: 0 1px 0 rgba(0, 0, 0, 0.004)
        span:nth-child(2)
          color: $color-link
          border-bottom: 1px dashed $color-link
        span:nth-child(3)
          color: $color-link

    .border-defolt
      .card-block__img-border
        background-image: url("../../static/img/defolt.png")
      .card-block__radius
        background: $color-defolt

    .border-defolt-hover
      .card-block__img-border
        background-image: url("../../static/img/defoltHover.png")
      .card-block__radius
        background: $color-defolt-hover

    .border-selected
      .card-block__img-border
        background-image: url("../../static/img/selected.png")
      .card-block__radius
        background: $color-selected

    .border-selected-hover
      .card-block__img-border
        background-image: url("../../static/img/selectedHover.png")
      .card-block__radius
        background: $color-selected-hover

    .border-disabled
      cursor: no-drop
      .card-block__img-border
        background-image: url("../../static/img/disabled.png")
      .card-block__radius
        background: $color-disabled
        opacity: 0.5
      .card-block__img-photo
        opacity: 0.5
      .card-block__text
        opacity: 0.5
      .card-block__text-footer
        span
          color: $color-disabled-text

    .photo-card
      background-image: url("../../static/img/cat.png")

    .selected-hover-text
      color: $color-selected-hover !important

</style>
