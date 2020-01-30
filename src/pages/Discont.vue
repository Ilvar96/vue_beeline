<template>
    <div>
      <love-it></love-it>
      <discont-form></discont-form>
    </div>
</template>

<script>

    import LoveIt from "../commponents/LoveIt";
    import DiscontForm from "../commponents/DiscontForm";
    export default {
        name: "Tiket",
        components:{
            LoveIt,
            DiscontForm,
        },
    }
</script>

<style scoped lang="scss">

</style>
