<template>
    <div>
      <my-header></my-header>
      <love-it></love-it>
      <tiket-form></tiket-form>
    </div>
</template>

<script>
    import MyHeader from "../commponents/MyHeader";
    import LoveIt from "../commponents/LoveIt";
    import TiketForm from "../commponents/TiketForm";
    export default {
        name: "Home",
        components:{
            LoveIt,
            TiketForm,
            MyHeader,
        },
    }
</script>

<style scoped lang="scss">

</style>
