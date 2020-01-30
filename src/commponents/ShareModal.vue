<template>
    <div>
      <b-modal id="share" title="Поделиться" size="sm" centered hide-footer>
        <template v-slot:modal-header="{ close }">
          <!-- Emulate built in modal header close button action -->
          <b-button class="ml-auto" variant="outline-light" size="sm" @click="close()">
            <img src="../assets/cross.svg" alt="cross">
          </b-button>
        </template>
        <h2 class="text-center">
          Поделиться
        </h2>
        <div class="share__line d-flex align-items-center justify-content-center">
          <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=https://beeline-katok.ru/&caption=Я еду за призами. Убирай снег и собирай призы в игре Билайн-Каток.">
            <img src="../assets/fb.svg" alt="fb">
          </a>
          <a target="_blank" href="https://vk.com/share.php?url=https://beeline-katok.ru/&title=Я еду за призами. Убирай снег и собирай призы в игре Билайн-Каток.&description=&image=https://beeline-katok.ru/dist/vk.jpg">
            <img src="../assets/vk.svg" alt="vk">
          </a>
          <a target="_blank" href="https://connect.ok.ru/offer?url=https://beeline-katok.ru/&title=Я еду за призами. Убирай снег и собирай призы в игре Билайн-Каток.&imageUrl=https://beeline-katok.ru/dist/ok.jpg">
            <img src="../assets/ok.svg" alt="ok">
          </a>
        </div>
      </b-modal>
    </div>
</template>

<script>
    export default {
        name: "ShareModal"
    }
</script>

<style scoped lang="scss">
  .share__line{
    img{
      display: block;
      width: 70px;
      margin: 15px 5px;
      transition: transform .3s;
      &:hover{
        transform: scale(1.1);
      }
    }
  }
</style>
