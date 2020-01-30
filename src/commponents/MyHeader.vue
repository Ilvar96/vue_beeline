<template>
    <div class="header d-flex align-items-center justify-content-between">
      <img src="../assets/logo.svg" alt="beeline">
      <div @click="show = !show" v-bind:class="{active:show}" class="burger d-flex justify-content-between flex-column">
        <div class="line"></div>
        <div class="line"></div>
        <div class="line"></div>
      </div>
      <transition name="fade">
        <div v-show="show" class="menu__wrapper">
          <div class="menu d-flex flex-column ">
            <a onClick="gtag('event', 'game', {'event_category': 'click_button'})"          target="_blank" href="https://beeline-katok.ru/game-menu" class="orange" >Играть</a>
            <a onClick="gtag('event', 'vdnh', {'event_category': 'click_button'})"          target="_blank" href="https://beeline-katok.ru/about-rink/msk ">Каток ВДНХ</a>
            <a onClick="gtag('event', 'sea', {'event_category': 'click_button'})"           target="_blank" href="https://beeline-katok.ru/about-rink/spb ">Каток у моря</a>
            <a onClick="gtag('event', 'prize', {'event_category': 'click_button'})"         target="_blank" href="https://beeline-katok.ru/prizes">Призы</a>
            <a onClick="gtag('event', 'partner', {'event_category': 'click_button'})"       target="_blank" href="https://beeline-katok.ru/partners">Партнеры</a>
            <a onClick="gtag('event', 'unlim', {'event_category': 'click_button'})"         target="_blank" href="https://moskva.beeline.ru/customers/products/mobile/services/details/protestiruyte-set-beeline-poluchite-2-nedeli-bezlimitnogo-interneta-besplatno/">Две недели безлимита</a>
            <a onClick="gtag('event', 'tariffs', {'event_category': 'click_button'})"       target="_blank" href="https://moskva.beeline.ru/customers/products/mobile/tariffs/">Тарифы «Билайн»</a>
            <a onClick="gtag('event', 'howitworks', {'event_category': 'click_button'})"    target="_blank" href="https://beeline-katok.ru/how-it-work">Как это работает</a>
            <a onClick="gtag('event', 'faq', {'event_category': 'click_button'})"           target="_blank" href="https://beeline-katok.ru/faq">FAQ и обратная связь</a>
            <a onClick="gtag('event', 'registration’', {'event_category': 'click_button'})" target="_blank" href="https://beeline-katok.ru" class="orange__min"  >Вход/Регистрация</a>
          </div>
        </div>
      </transition>
    </div>
</template>

<script>
    export default {
        name: "MyHeader",
        data(){
            return{
                show:false,
            }
        }
    }
</script>

<style scoped lang="scss">
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active до версии 2.1.8 */ {
    opacity: 0;
  }
  .menu__wrapper{
    position: fixed;
    width: 100%;
    height: 100vh;
    top: 0;
    left: 0;
    z-index: 10;
    background: rgba(0,0,0,.5);
  }
  .menu{
    width: 375px;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    background: #000;
    padding: 36px 64px;
    @media screen and (max-width:768px){
      width: 320px;
      padding: 35px 10px;
    }
    a{
      color: #fff;
      font-size: 29px;
      line-height: 1.65;
      white-space: nowrap;
      &:hover{
        text-decoration: none;
      }
      &.orange{
        color: #ffb612;
        font-size: 54px;
      }
      &.orange__min{
        color: #ffb612;
        margin-top: 15px;
      }
    }
  }
  .header{
    height: 50px;
    background: #fff;
    width: 100%;
    position: fixed;
    z-index: 1000;
    img{
      margin-left: 15px;
    }
  }
  .burger{
    position: relative;
    z-index: 15;
    width: 37px;
    height: 31px;
    margin-right: 15px;
    cursor: pointer;
    .line{
      background-color: #000;
      width: 100%;
      height: 7px;
      -webkit-transition: transform .3s;
      -o-transition: transform .3s;
      transition: transform .3s;
      -webkit-backface-visibility: hidden;
      backface-visibility: hidden;
      border-radius: 3px;
      position: relative;
    }
    &.active{
      .line{
        background-color: #fff;
        &:nth-child(1){
          transform: rotate(45deg);
          top: 12px;
        }
        &:nth-child(2){
          opacity: 0;
        }
        &:nth-child(3){
          transform: rotate(-45deg);
          top: -12px;
        }
      }
    }
  }
</style>
