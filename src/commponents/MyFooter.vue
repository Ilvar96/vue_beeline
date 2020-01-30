<template>
    <div class="footer" v-if="!$route.meta.hideFooter">
        <div class="share" v-b-modal.share>
          <img src="../assets/share.svg" alt="share">
        </div>
      <a target="_blank" href="https://katok-beeline.ru/rules.pdf">Условия акции</a>
    </div>
</template>

<script>
    export default {
        name: "MyFooter"
    }
</script>

<style scoped lang="scss">
  .footer{
    height: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
    background: #000;
    margin-top: -50px;
    z-index: 5;
    a{
      color: #fff;
      text-decoration: underline;
      font-size: 20px;
      padding-top: 20px;
    }
  }
  .share{
    width: 60px;
    height: 60px;
    border: 2px solid #000;
    outline: none;
    position: absolute;
    top: -30px;
    background: #ffb612;
    border-radius: 40px;
    left: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transform: translateX(-50%);
    cursor: pointer;
    box-shadow: 0 0 0 #000;
    transition: box-shadow .3s;
    &:hover {
      box-shadow: 0 0 10px #000;
    }
    img{
      width: 70%;
    }
  }
</style>
