<template>
  <div>
    <div v-if="success">
      <div v-if="endGame" class="success__block prizes">
        <div class="container ">
          <prizes-block
            :prizes="prizes"
            :test_users_id="test_users_id">
          </prizes-block>
        </div>
      </div>
      <div v-else class="yt success__block d-flex align-items-center">
          <img src="../assets/tree.svg" alt="tree" class="tree tree1">
          <img src="../assets/tree.svg" alt="tree" class="tree tree2">
          <div class="success__block w-100">
            <h2 v-if="completed" class="text-center">Приз уже выбран!</h2>
            <div v-else class="container ">
              <h2 v-if="YT" class="text-center nextStepH2">
                Ты ответил правильно <br/>
                на вопросы теста!
              </h2>
              <div v-if="YT">
                <p class="text-center ">
                  Введи свой e-mail и узнай какой приз <br/>
                  от <img src="../assets/youtube-music.svg" alt="youtube-music"> ты выиграл
                </p>
                <b-row class="justify-content-center mt-4">
                  <b-col xs="12" md="8" lg="4">
                    <b-form class="text-center" @submit.prevent="youtubeForm">
                      <the-mask  class="text-center xs-75" mask="XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX" :tokens="emailTokens"  v-model="email" placeholder="E-mail" />

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

                      <button v-bind:class="{disabled:buttonDisabled}" v-if="YT" class="form_btn">
                        <img src="../assets/get__prize.png" alt="получить приз">
                      </button>
                      <button v-bind:class="{disabled:buttonDisabled}" v-else class="btn-beeline">
                        продолжить
                      </button>
                    </b-form>
                  </b-col>
                </b-row>
              </div>
              <div v-else>
                <b-row class="justify-content-center mt-4">
                  <b-col xs="12" md="8" lg="4">
                    <register-form v-if="!isAuth" :buttonDisabled="buttonDisabled" :messAfterReg="'Ищи остальные QR-коды'">
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
                    </register-form>
                    <div v-else>
                      <h2 class="text-center">QR-тест продолжается!</h2>
                      <p class="mt-3 text-center">Ищи остальные QR-коды</p>
                    </div>
                  </b-col>
                </b-row>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div v-else class="content snow">
      <test-head></test-head>
      <div class="snow__block position-relative">
        <div v-if="noneTest">
          <div class="text-center pt-5 mt-5">
            <b-spinner label="Loading..."></b-spinner>
          </div>
        </div>
        <div v-else>
          <div class="logo_block position-relative">
            <div v-if="YT" class="logo">
              <p class="text-center">
                Правильно ответь на 5 вопросов <br/>
                и выиграй приз от <img src="../assets/youtube-music.svg" alt="YT">
              </p>
            </div>
            <div v-else class="logo">
              <p class="text-center big-fs">
                Выиграй призы! <br/>
                Найди все 5 QR-кодов на катке <br/>
                и правильно ответь на вопросы!
              </p>
            </div>
          </div>
          <div class="test container pt-5" v-bind:class="{disabled:isDisabled}">
            <div v-for="(question, index) in questions">
              <div v-show="index === questionIndex">
                <h2 class="test__question text-center pb-4">{{ question.text }}</h2>
                <div class="answer__block d-flex align-items-center mt-3 " v-for="(response, key) in question.responses" @click="click(response)">
                  <div class="circle">{{ key+=1 }}</div>
                  <div class="answer ml-3">{{response.text}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div class="share" v-b-modal.share>
        <img src="../assets/share.svg" alt="share">
      </div>
      <a target="_blank" href="https://katok-beeline.ru/testrules.pdf">Условия акции</a>
    </div>
    <b-modal id="modalTiket" centered size="sm"  v-model="show">
      <h3 class="my-4 text-center">{{message}}</h3>
      <template v-slot:modal-footer>
        <div class="w-100">
          <b-button
            variant="beeline"
            class="m-auto d-block"
            @click="show=false"
          >
            ок
          </b-button>
        </div>
      </template>
    </b-modal>
  </div>
</template>

<script>
    String.prototype.replaceAt = function(index, replacement) {
      return this.substr(0, index) + replacement + this.substr(index + replacement.length);
    }
    import TestHead from "../commponents/TestHead";
    import RegisterForm from "../commponents/Forms/RegisterForm";
    import PrizesBlock from "../commponents/PrizesBlock";
    export default {
        components:{
            TestHead,
            RegisterForm,
            PrizesBlock
        },
        name: "TestPage",
        data() {
            return {
                isAuth: false,
                agree1:'',
                agree2:'',
                buttonDisabled:true,
                endGame:false,
                success:false,
                prizes:[],
                noneTest:false,
                urlCurrect:false,
                YT:false,
                id: this.$route.params['id'],
                test_id:'',
                completed:false,
                test_users_id:'',
                questionIndex: 0,
                questions:'',
                isDisabled:false,
                score:0,
                show:false,
                message:'',
                emailTokens:{
                    X:{
                        pattern: /[0-9a-zA-Z_@./-]/
                    },
                },
                email:''
            }
        },
        methods:{
            click: function (obj) {
                if(this.isAuth){
                  if(this.id != 'yttest'){
                    this.$http.post(this.$api +'tests/completeQr/'+ this.test_id,{},{
                      headers : {'Authorization':'Bearer ' + this.$store.state.Token}
                    }).
                    then(response => {
                      if(response.body){
                        if(response.body.prizes){
                          this.endGame = true;
                          this.prizes = response.body.prizes
                          this.test_users_id = response.data.test.id
                        }
                      } else{
                        if(response.bodyText==='Приз уже выбран'){
                          this.completed = true
                        }
                      }

                    })
                      .catch(err => {
                        console.log(err);
                      })
                  }
                }
                else{
                  if(this.id != 'yttest'){
                    localStorage.setItem('test_id', this.test_id)
                  }
                }
                this.isDisabled = true;
                let thisis = this;
                let eventTarget = event.target;
                event.target.parentNode.classList.add('selected');
                setTimeout(function () {
                    eventTarget.parentNode.classList.remove('selected');
                    if(obj.correct){
                        thisis.questionIndex ++;
                        thisis.score ++;
                        thisis.isDisabled = false;
                        if(thisis.questionIndex === thisis.questions.length){
                            thisis.success = true;
                        }
                    }
                    else{
                        thisis.show = true;
                        thisis.message = 'Ты был близок к правильному ответу! Попробуй еще раз.';
                        thisis.questionIndex = 0;
                        thisis.score = 0;
                        thisis.isDisabled = false;
                    }
                },500)

            },
            youtubeForm: function () {
                  this.$http.post(this.$api +'tests/complete/'+ this.test_id +'',
                      {'email':this.email}
                  ).
                  then(response => {
                      if(response){
                        console.log(response);
                        this.message = response.bodyText;
                        this.show = true;
                        this.email = '';
                      }
                  })
                  .catch(err => {
                      console.log(err);
                      this.message = 'Ошибка при отправке';
                      this.show = true;
                  })
            },
            chChange: function () {
                if(this.agree1 && this.agree2){
                    this.buttonDisabled = false
                }
                else{
                    this.buttonDisabled = true
                }
            },
        },
        mounted() {
            // проверка на авторизованность
            if(this.$store.state.Token != null){
              this.isAuth = true
            }
            else{
              this.isAuth = false
            }
            // проверка теста
            if(this.id === 'yttest'){
                this.YT = true;
                this.urlCurrect = true;
                this.noneTest = false;
            }
            this.$http.get(this.$api +'tests',).then(response => {
                    if(response){
                        for(let i = 0; i < response.body.length; i++){
                            if(response.body[i].href === this.id){
                                this.noneTest = false;
                                this.urlCurrect = true;
                                this.test_id = response.body[i].id;
                                this.questions = response.body[i].content.questions;
                            }
                        }
                    }
                }).catch(err => {console.log(err);});
            if(!this.urlCurrect){
                this.noneTest = true;
            }
        }
    }
</script>

<style scoped lang="scss">
  .logo_block{
    margin: 0 auto;
    padding-top: 60px;
    padding-bottom: 10px;
    background: url("../assets/blueBeeline.png") no-repeat center top;
    background-size: contain;
    @media (max-width: 768px){
      background-size: cover;
    }
    .logo{
      img{
        width: 150px;
      }
      p{
        font-size: 20px;
      }
    }
  }
  .content{
    min-height: calc(100vh - 50px);
    padding-bottom: 150px;
    &.snow{
      background: url("../assets/snow.png") repeat center;
      background-size: contain;
    }
  }
  .test{
    &.disabled{
      pointer-events: none;
    }
    .test__question{
      font-size: 30px;
      width: 750px;
      margin: 0 auto;
      line-height: 100%;
      @media (max-width: 1200px){
        width: 650px;
        font-size: 20px;
      }
      @media (max-width: 992px){
        width: 550px;
        font-size: 23px;
      }
      @media (max-width: 768px){
        width: 100%;
      }
    }
    .answer__block{
      cursor: pointer;
      width: 750px;
      margin: 1rem auto;
      @media (max-width: 1200px){
        width: 550px;
      }
      @media (max-width: 768px){
        width: 100%;
      }
      .circle{
        min-width: 50px;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #77b0d3;
        font-size: 32px;
        height: 50px;
        border-radius: 50px;
        background: #c9e5f1;
        -webkit-box-shadow: inset -5px 4px 0px 0px #77b0d3;
        -moz-box-shadow: inset -5px 4px 0px 0px #77b0d3;
        box-shadow: inset -5px 4px 0px 0px #77b0d3;
      }
      .answer{
        font-size: 35px;
        border-radius:50px;
        padding: 0 20px;
        transition: .3s;
        border: 2px solid rgba(0,0,0,0);
        @media (max-width: 1200px){
          font-size: 25px;
        }
        @media (max-width: 768px){
          font-size: 17px;
        }
      }
      &.selected{
        .circle {
          background: #ffb612;
        }
      }
    }
  }
  .success__block{
    min-height: calc(100vh - 150px);
    display: flex;
    padding: 50px 0;
    flex-direction: column;
    justify-content: center;
    &.yt{
      background: url("../assets/snow.png")repeat center;
      background-size: contain;
      .tree2{
        left: auto;
        top: auto;
        right: 5%;
        bottom: 15%;
      }
      .nextStepH2{
        @media (max-width: 768px){
          font-size: 30px;
        }
      }
      p{
        font-size: 18px;
        font-family: Arial;
        line-height: 170%;
        @media (max-width: 768px){
          br{
            display: none;
          }
        }
        img{
          height: 20px;
          position: relative;
          top: -5px;
        }
      }
    }
    &.prizes{
      background-image: url("../assets/orangeBG.png");
      background-repeat: repeat;
      background-position: center center;
      background-size: contain;
      background-color: #ffb612;
      padding: 150px 0;
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
  }
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
  .spinner-border {
    border: 0.25em solid #144686;
    border-right-color: transparent;
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
  }
  .form_btn, .btn-beeline{
    transition: .3s;
    &.disabled{
      opacity: .5;
      pointer-events: none;
    }
  }
</style>
