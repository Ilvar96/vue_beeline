<template>
    <div class="prizes_block">
      <h2 class="text-center">
        Выбери свой приз!
      </h2>
      <div class="prize__line d-flex justify-content-center flex-wrap ">
        <div class="prize position-relative" v-for="(prize, index) in prizes">
          <div class="mark"></div>
          <div class="info" @click="infoClick()">?</div>
          <div class="description">
            {{prize.description}}
          </div>
          <div class="prize__logo">
            <img v-bind:src="prize.image" alt="">
          </div>
          <div class="prize__text text-center">
            {{ prize.name}}
          </div>
          <div @click="choosePrize(prize)" class="prize__button text-center">Выбрать</div>
        </div>
      </div>
      <b-row class="justify-content-center mt-4">
        <b-col xs="12" md="8" lg="4" class="text-center">
          <button v-bind:class="{disabled:buttonDisabled}" class="mt-4 form_btn" @click="prizeFormSubmit">
            <img src="../assets/get__prize.png" alt="получить приз">
          </button>
        </b-col>
      </b-row>
      <b-modal centered size="sm"  v-model="modal">
        <h3 class="my-4 text-center">{{message}}</h3>
        <template v-slot:modal-footer>
          <div class="w-100">
            <b-button
              variant="beeline"
              class="m-auto d-block"
              @click="modal=false"
            >
              ок
            </b-button>
          </div>
        </template>
      </b-modal>
    </div>
</template>

<script>
    export default {
        name: "PrizesBlock",
        props:{
          prizes: Array,
          test_users_id: Number
        },
        data() {
          return {
            prize_type_id: '',
            buttonDisabled: true,
            modal:false,
            message: ''
          }
        },
        methods:{
          infoClick: function() {
            if(event.target.parentNode.classList.contains('active')){
              event.target.parentNode.classList.remove('active');
              event.target.innerText = '?';
            }else{
              event.target.parentNode.classList.add('active');
              event.target.innerText = 'X';
            }
          },
          choosePrize: function(obj) {
            this.buttonDisabled = false
            this.prize_type_id = obj.id;
            let prizArr = event.target.parentNode.parentNode.querySelectorAll('.prize');
            let i = 0;
            for(i; i < prizArr.length; i++){
              prizArr[i].classList.add('disabled');
            }
            event.target.parentNode.classList.remove('disabled');

          },
          prizeFormSubmit: function () {
            this.$http.post(this.$api +'tests/orderPrize/'+ this.test_users_id + '/' + this.prize_type_id,{},{
              headers : {'Authorization':'Bearer ' + this.$store.state.Token}
            }).
            then(response => {
              this.modal = true
              this.message = response.bodyText
            })
              .catch(err => {
                console.log(err)
              })
          }
        }

    }
</script>

<style scoped lang="scss">
  .prizes_block{
    .prize__line{
      width: 800px;
      margin: 0 auto;
      @media (max-width: 992px){
        width: 630px;
      }
      @media (max-width: 768px){
        width: 100%;
      }
      .prize{
        background: #fff;
        width: 200px;
        height: 300px;
        padding:0 25px;
        overflow: hidden;
        margin: 10px;
        .mark{
          width: 30px;
          height: 50px;
          margin: 0 auto;
          background: url("../assets/prize__mark.png")no-repeat center;
          background-size: contain;
        }
        .info{
          position: absolute;
          z-index: 5;
          cursor: pointer;
          width: 20px;
          top: 10px;
          right: 10px;
          border: 1px solid #000;
          padding-top: 3px;
          padding-left: 2px;
          height: 20px;
          background-color: #ffb612;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50px;
          transition: .2s;
          &:hover{
            opacity: .8;
          }
        }
        .prize__logo{
          height: 50px;
          margin: 10px 0;
          width: 100%;
          img{
            max-height: 50px;
            display: block;
            max-width: 150px;
            margin: 20px auto;
          }
        }
        .prize__text{
          font-family: Arial;
          font-size: 15px;
          margin-bottom: 20px;
          line-height: 110%;
        }
        .prize__button{
          position: absolute;
          bottom: 20px;
          left: 50%;
          width: 130px;
          background: #ffb612;
          border-radius: 50px;
          padding: 3px 10px;
          font-family: Arial;
          border: 1px solid #000;
          cursor: pointer;
          transform: translateX(-50%);
          transition: .2s;
          &:hover{
            opacity: .8;
          }
        }
        .description{
          position: absolute;
          left: 0;
          transition: .3s;
          top: -300px;
          width: 100%;
          height: 100%;
          padding: 40px 20px;
          overflow: scroll;
          background: rgba(0,0,0,.8);
          color: #fff;
          z-index: 2;
        }
        &.disabled{
          opacity: .7;
        }
        &.active{
          .description{
            top: 0;
          }
        }
      }
    }
  }
  .form_btn{
    background: none;
    border: none;
    outline: none;
    cursor: pointer;
    img{
      cursor: pointer;
    }
    &.disabled{
      opacity: .5;
      pointer-events: none;
    }
  }
</style>
