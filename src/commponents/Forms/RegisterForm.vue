<template>
  <div>
      <b-modal centered size="sm" v-model="modal">
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
      <div v-if="!regSuccsess">
        <b-form v-if="!smsForm" class="text-center" @submit.prevent="onRegister">
          <h4 class="text-center nextStepH2">
            Введи номер телефона, чтобы продолжить.
          </h4>
          <the-mask  class="text-center xs-75"  mask="+# (###) ### ## ##" v-model="phone" placeholder="Номер телефона" />
          <slot></slot>
          <button v-if="!isSubmited" v-bind:class="{disabled:buttonDisabled}" class="btn-beeline">
            продолжить
          </button>
          <b-spinner v-else label="Spinning"></b-spinner>
        </b-form>
        <b-form v-else class="text-center" @submit.prevent="smsConfirm">
          <h4 class="text-center nextStepH2">Введите код из СМС</h4>
          <the-mask  class="text-center xs-75"  mask="####" v-model="sms" placeholder="СМС-код" />
          <button v-if="!isSubmited" class="btn-beeline mt-3">
            продолжить
          </button>
          <b-spinner class="mt-3" v-else label="Spinning"></b-spinner>
        </b-form>
      </div>
      <div v-else>
        <h3 class="text-center">Регистрация <br/>  прошла успешно!</h3>
        <p class="mt-2 text-center">{{messAfterReg}}</p>
      </div>
    </div>
</template>

<script>
    export default {
        name: "RegisterForm",
        props:{
          buttonDisabled: Boolean,
          messAfterReg: String,
        },
        data() {
          return {
            phone: '',
            sms: '',
            modal:false,
            isSubmited: false,
            message:'',
            smsForm: false,
            regSuccsess: false,
          }
        },
        methods: {
          onRegister : function () {
            this.isSubmited = true
            this.phone = this.phone.replaceAt(0,'7')
            this.$http.post(this.$api +'auth/register',
              {'phone':this.phone}
            ).then(response => {
              if(response){
                this.isSubmited = false
                this.smsForm = true
              }
            })
              .catch(err => {
                console.log(err);
                if(err){
                  this.isSubmited = false
                  this.message = 'Что-то пошло не так';
                  this.modal = true
                }
              })
          },
          smsConfirm : function () {
            this.isSubmited = true
            this.phone = this.phone.replaceAt(0,'7')
            this.$http.post(this.$api +'auth/login',
              {'phone':this.phone, 'password': this.sms}
            ).then(response => {
              if(response){
                this.$store.token = response.data.token
                localStorage.setItem('token', response.data.token)
                this.isSubmited = false
                this.smsForm = true
                this.regSuccsess = true

                this.$http.post(this.$api +'tests/completeQr/'+ localStorage.getItem('test_id'),{},{
                  headers : {'Authorization':'Bearer ' + localStorage.getItem('token')}
                }).
                then(res => {
                  localStorage.removeItem('test_id')
                })
                  .catch(error => {
                    console.log(error);
                  })
              }
            })
              .catch(err => {
                console.log(err);
                if(err){
                  this.isSubmited = false
                  this.message = 'Что-то пошло не так';
                  this.modal = true
                }
              })
          },
        }
    }
</script>

<style scoped lang="scss">
  .btn-beeline{
    width: 200px;
    padding: 10px 20px;
    border-radius: 50px;
    font-family: Arial;
    font-size: 20px;
    outline: none;
  }
  .form_btn, .btn-beeline{
    transition: .3s;
  &.disabled{
     opacity: .5;
     pointer-events: none;
   }
  }
</style>
