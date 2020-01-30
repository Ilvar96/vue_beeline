<template>
  <div id="app">
    <my-header></my-header>

    <router-view></router-view>

    <my-footer></my-footer>
    <share-modal></share-modal>
  </div>
</template>

<script>
  import MyHeader from "./commponents/MyHeader";
  import MyFooter from "./commponents/MyFooter";
  import ShareModal from "./commponents/ShareModal";
  export default {
    name: 'app',
    components:{
        MyHeader,
        MyFooter,
        ShareModal,
    },
    data () {
      return {

      }
    }
  }
</script>

<style lang="scss">
  .container{
    transition: opacity .3s;
    &.disabled{
      pointer-events: none!important;
      opacity: .6;
    }
  }
  .city{
    &.disabled{
      pointer-events: none!important;
      opacity: .6;
    }
  }
  #app{
    overflow: hidden;
  }
  body{
    font-family:'OfficinaSerifBookC';
  }
  h2, .h2{
    font-size: 3rem;
  }
  .modal-header{
    border: none;
  }
  .tree, .man{
    position: absolute;
    z-index: 3;
    pointer-events: none;
    @media screen and (max-width:768px){
      display: none;
    }
  }
  .tree{
    left: 5%;
    top: 5%;
  }
  .man{
    right: -5%;
    top: -25%;
  }
  input{
    border-radius: 25px !important;
    background: rgba(0,0,0,0) !important;
    border: 2px solid #000 !important;
    font-size: 25px!important;
    width: 100%;
    outline: none;
    height: 50px;
    padding: 0.375rem 0.75rem;
    &::placeholder{
      color:#868686;
      font-size: 25px!important;
    }
    &.bad{
      background: rgba(228, 15, 49, 0.34) !important;
    }
    &.promocode{
      text-transform: uppercase;
      &::placeholder{
        text-transform: none;
      }
    }
    &.black{
      color: #000;
      &::placeholder{
        color:#000;
      }
    }
  }
  .legal{
    background-image:url("./assets/orangeBG.png");
    background-repeat: no-repeat;
    background-size: cover;
    background-color: #ffb612;
    padding: 50px;
    font-size: 14px;
    @media screen and (max-width:768px){
     padding: 50px 10px;
    }
    a{
      color: #000;
      text-decoration: underline;
    }
  }
  .xs-75{
    @media screen and (max-width:768px){
      width: 80%;
      margin: 0 auto;
      display: block;
    }
  }
  .samllText {
    font-size: 14px !important;

    &::placeholder {
      font-size: 14px !important;
    }
  }
  .modal-footer{
    border: none;
  }
  .btn-beeline{
    background: #ffb612;
    border: 2px solid #000;
    &.disabled{
      pointer-events: none;
    }
  }
  .modal{
    .close{
      color: #ffb612;
      opacity: 1!important;
    }
  }
  .spiner{
    width: 1rem;
    height: 1rem;
    color: #ffb612;
    border: 0.15em solid currentColor;
    border-right-color: transparent;
  }
  .ok{
    color: #009800;
  }
  .bad{
    color: #950000;
  }
  @media screen and (max-width:768px){
    .samllText-xs{
      font-size: 14px !important;
      &::placeholder {
        font-size: 14px !important;
      }
    }
  }
</style>
