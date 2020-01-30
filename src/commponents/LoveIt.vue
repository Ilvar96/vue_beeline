<template>
    <div class="love__it">
      <img src="../assets/text.png" alt="очисти каток и получи приз">
    </div>
</template>

<script>
    export default {
        name: "LoveIt"
    }
</script>

<style scoped lang="scss">
  .love__it{
    width: 100%;
    height:30vh;
    min-height: 300px;
    background: url("../assets/loveIT.png")no-repeat center;
    background-size: cover;
    position: relative;
    z-index: 3;
    img{
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
    }
  }
</style>
