<template>
    <div class="instagram__block">
      <test-head></test-head>
      <div class="content">
        <div v-if="showRegister" class="block">
          <b-form v-if="!smsForm" class="text-center" @submit.prevent="onRegister">
            <h4 class="text-center nextStepH2">
              Введи номер телефона, чтобы продолжить.
            </h4>
            <the-mask  class="text-center xs-75 mt-3"  mask="+# (###) ### ## ##" v-model="phone" placeholder="Номер телефона" />
            <div class="checkbox__block">
              <div class="line">
                <label>
                  <input type="checkbox" v-model="agree1" @change="chChange">
                  <span class="custom__checkbox"></span>
                  <span class="description">Согласен на получение СМС-сообщений и email - сообщений рекламного и информационного характера от OOO «Юзер ту кастомер».</span>
                </label>
              </div>
              <div class="line">
                <label>
                  <input type="checkbox" v-model="agree2" @change="chChange">
                  <span class="custom__checkbox"></span>
                  <span class="description">Согласен с правилами Акции, а также с политикой обработки персональных данных.</span>
                </label>
              </div>
              <div class="description mt-4">
                Предоставляю своё согласие OOO «Юзер ту кастомер» (125362 г. Mосква, yл. Циолковского, дом 3, стр. 1, помещение V) - оператору обработки персональных данных - на обработку моих персональных данных (номер телефона и email) в целях участия в акции, получение СМС-сообщений и сообщений на email рекламного и информационного характера сроком до "30" марта 2020г. В рамках настоящего Согласия Оператор вправе использовать мои персональные данные для формирования и направления мне своих маркетинговых предложений и вручения призов. Оператор осуществляет сбор, запись, хранение, уточнение, использование, блокирование, удаление полученных данных.
                В течение указанного выше срока Оператор обязан:
                <br/>
                - сохранять конфиденциальность и обеспечить безопасность моих персональных данных;
                <br/>
                - по истечении указанного срока обязан удалить все мои персональные данные.
                <br/>
                Согласие может быть отозвано посредством письменного обращения к Оператору. При направлении письменного обращения или заявления обязательным условием является указание на страницу сайта и/или название акции, в связи с которыми дано настоящее Согласие.
                <a target="_blank" href="https://katok-beeline.ru/agree.pdf">Полный текст Соглашения</a>
              </div>
            </div>
            <button v-if="!isSubmited" v-bind:class="{disabled:buttonDisabled}" class="btn-beeline mt-3">
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
        <div v-else class="block">
          <form class="text-center" @submit.prevent="formSubmit">
            <h3 class="text-center">
              Название задания
            </h3>
            <input @input="linkChange" v-model="link" type="text" class="input text-center mt-3" placeholder="Добавь ссылку на задание">
            <p class="text-center mt-3">Описание <br/> Описание <br/> Описание <br/></p>
            <button v-if="!isSubmited" v-bind:class="{disabled: linkDisabled}" type="submit" class="btn-beeline">
              Отправить
            </button>
            <b-spinner v-else label="Spinning"></b-spinner>
          </form>
        </div>
      </div>
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
    </div>
</template>

<script>
    import TestHead from "../commponents/TestHead";
    import RegisterForm from "../commponents/Forms/RegisterForm";

    export default {
        name: "Instagram",
        components:{
          TestHead,
          RegisterForm
        },
      data() {
        return {
          linkDisabled:true,
          modal:false,
          message:'',
          showRegister: false,
          buttonDisabled: true,
          agree1: '',
          agree2: '',
          link:'',
          isSubmited: false,
          smsForm: false,
          sms:'',
          phone:'',
        }
      },
      methods:{
        chChange: function () {
          if(this.agree1 && this.agree2){
            this.buttonDisabled = false
          }
          else{
            this.buttonDisabled = true
          }
        },
        formSubmit: function () {
          this.isSubmited = true
          this.$http.post(this.$api +'instagram/save',{
            'link':this.link
          },{
            headers : {'Authorization':'Bearer ' + localStorage.getItem('token')}
          })
          .then(response => {
            if(response){
              this.isSubmited = false
              if(response.ok){
                this.message = 'Сообщение отправлено. Ожидайте результатов.'
                this.modal = true
                this.link = ''
                this.linkDisabled = true
              }
            }
          })
          .catch(err => {
            this.isSubmited = false
            console.log(err);
            if(err.data.error === 'token_not_provided'){
              this.showRegister = true
            }
            else{
              this.message = 'Что-то пошло не так!'
              this.modal = true
            }
          });
        },
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
              this.showRegister = false
              this.$http.post(this.$api +'instagram/save',{
                'link':this.link
              },{
                headers : {'Authorization':'Bearer ' + localStorage.getItem('token')}
              })
                .then(response => {
                  if(response){
                    if(response.ok){
                      this.message = 'Сообщение отправлено. Ожидайте результатов.'
                      this.modal = true
                      this.link = ''
                      this.linkDisabled = true
                    }
                  }
                })
                .catch(err => {
                  this.isSubmited = false
                  console.log(err);
                  if(err.data.error === 'token_not_provided'){
                    this.showRegister = true
                  }
                  else{
                    this.message = 'Что-то пошло не так!'
                    this.modal = true
                  }
                });
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
        linkChange: function () {
          if(this.link.length >= 4){
            this.linkDisabled = false
          }else{
            this.linkDisabled = true
          }
        }
      }
    }
</script>

<style scoped lang="scss">
  .instagram__block{
    height: calc(100vh - 50px);
    min-height: 700px;
    padding-bottom: 100px;
    background: url("../assets/snow.png");
    @media screen and (max-width: 550px){
      height: auto;
    }
    .content{
      width: 500px;
      margin: 50px auto;
      @media screen and (max-width: 550px){
        width: 300px;
      }
    }
    input{
      @media screen and (max-width: 550px){
        font-size: 16px!important;
      }
      &::placeholder{
        @media screen and (max-width: 550px){
          font-size: 16px!important;
        }
      }
    }
  }
  .checkbox__block{
    height: 250px;
    padding: 20px;
    overflow-y: scroll;
    overflow-x: hidden;
    min-width: 300px;
    width: 100%;
    background: rgba(0,0,0,.5);
    border-top-left-radius: 20px;
    border-bottom-left-radius: 20px;
    margin: 20px auto;
    &::-webkit-scrollbar { width: 3px; height: 3px;}
    &::-webkit-scrollbar-button {  background-color: #666; }
    &::-webkit-scrollbar-track {  background-color: #999;}
    &::-webkit-scrollbar-track-piece { background-color: #ffffff;}
    &::-webkit-scrollbar-thumb { height: 50px; background-color: #ffb612; border-radius: 3px;}
    &::-webkit-scrollbar-corner { background-color: #999;}
    &::-webkit-resizer { background-color: #666;}
    .line{
      margin: 0 0 20px;
      label{
        display: flex;
        align-items: flex-start;
        justify-content: flex-start;
        text-align: left;
        font-family: Arial;
        cursor: pointer;
        .custom__checkbox{
          min-width: 50px;
          height: 50px;
          border-radius: 50px;
          border: 2px solid #ffb612;
          margin-right: 20px;
          position: relative;
        }
        input{
          width: 0;
          position: absolute;
          height: 0;
          opacity: 0;
          &:checked + .custom__checkbox{
            &:after{
              content: '';
              position: absolute;
              top: 50%;
              left: 25%;
              width:20px;
              height: 30px;
              transform: rotate(40deg) translateX(-50%) translateY(-50%);
              border-right: 5px solid #ffb612;
              border-bottom: 5px solid #ffb612;
            }
          }
        }
      }
    }
    .description{
      color: #fff;
      font-family: Arial;
      line-height: 100%;
      font-size: 13px;
      text-align: left;
      a{
        color: #fff;
        text-decoration: underline;
      }
    }
  }
  .btn-beeline{
    width: 200px;
    padding: 10px 20px;
    border-radius: 50px;
    font-family: Arial;
    font-size: 20px;
    outline: none;
    &.disabled{
      opacity: .5;
      pointer-events: none;
    }
  }
</style>
