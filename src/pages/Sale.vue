<template>
  <div >
    <div class="orange">
      <img class="present" src="../assets/present.png" alt="present">
      <b-container class="pb-10">
        <h2 class="text-center">Приз от Билайн</h2>
        <b-row class="justify-content-center mt-3 mb-3">
          <b-col xs="12" md="6" xl="4">
            <div class="d-flex align-items-center">
              <the-mask v-bind:class="{bad:codeOneBad}" @input="inputPropmo" class="text-center promocode samllText" mask="XXXXXXXXXX" v-model="promocode" placeholder="Введи промокод из личного кабинета" :tokens="codeTokens" />
              <div class="ml-2 d-flex" v-if="codeOneChanging">
                <b-spinner class="spiner" label="Loading..."></b-spinner>
              </div>
            </div>
            <div class="mt-1" v-if="codeOneOk">
              <div class="ok text-center">
                {{serverRes}}
              </div>
            </div>
            <div class="mt-1" v-if="codeOneBad">
              <div class="bad text-center">
                {{serverRes}}
              </div>
            </div>
          </b-col>
        </b-row>
        <b-container v-bind:class="{ disabled:isDisabled }">
          <h2 class="text-center">Выбери свой приз</h2>
          <b-row class="justify-content-center mt-3 mb-3 pb-5 pb-md-0">
            <b-col xs="12" md="6">
              <div class="item__title text-center">
                Если у тебя тариф <br/> с абонентской платой
              </div>
              <div class="item ml-auto" @click="clickItem('sale')" v-scroll-to="'#toggle3'">
                <img class="log" src="../assets/20.svg" alt="20%">
                <p class="text-center">
                  Скидка 20% <br/>
                  на абонентскую плату
                  на 3 месяца
                </p>
              </div>

              <div class="choose" v-show="first" @click="choosePrize">
                <img class="ml-auto" src="../assets/choose.png" alt="">
              </div>
            </b-col>
            <b-col xs="12" md="6">
              <div class="item__title text-center mr-auto ml-0">
                Если у тебя тариф <br/> без абонентской платы
              </div>
              <div class="item mr-auto " @click="clickItem('unlim')" v-scroll-to="'#toggle3'">
                <img class="log" src="../assets/infin.svg" alt="infin">
                <p class="text-center">
                  Безлимитный <br/>
                  интернет на месяц
                </p>
              </div>

              <div class="choose" v-show="second" @click="choosePrize">
                <img class="mr-auto" src="../assets/choose.png" alt="">
              </div>
            </b-col>
          </b-row>
        </b-container>
      </b-container>
    </div>
    <b-modal id="modal" centered size="sm"  v-model="show">
      <h3 class="my-4 text-center">{{modaltext}}</h3>
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
    <VueSlideToggle id="toggle3" class="body" :open="open" tag="section" :duration="500">
<!--        <div class="toggle">-->
<!--          <h3 class="text-center"> Как получить</h3>-->
<!--          <div class="text mt-3">-->
<!--            <span class="num">1.</span>-->
<!--            <span>-->
<!--              Чтобы получить скидку, закажите<br/>-->
<!--              ее в личном кабинете на сайте.-->
<!--            </span>-->
<!--          </div>-->
<!--          <div class="text mt-3">-->
<!--            <span class="num">2.</span>-->
<!--            <span>-->
<!--          В течение 15 дней с момента<br/>-->
<!--          заказа скидки вам придёт SMS<br/>-->
<!--          c информацией о подключении<br/>-->
<!--          скидки или невозможности<br/>-->
<!--          подключения.-->
<!--        </span>-->
<!--          </div>-->
<!--        </div>-->
        <div class="footnote">
          <b-container>
            <p v-if="first">
              Скидка 20% на абонентскую плату на 90 дней. Указанная скидка действует на абонентскую плату с момента подключения на
              тарифных планах с предоплатной системой расчетов, предусматривающих абонентскую плату и включенные в неё пакеты услуг участников акции «Билайн-каток» на сайте <a target="_blank" href="https://beeline-katok.ru/">beeline-katok.ru</a> с 1 декабря 2019 года по 30 марта 2020 года.
              <br/>
              За исключением указанных <a target="_blank" href="http://katok-beeline.ru/20.pdf">тарифных планов</a>, новых абонентов и участников акции «Скидка 20% на 1 год на абонентскую плату».
              <a target="_blank" href="https://katok-beeline.ru/rules.pdf">Условия акции</a> доступны для абонентов-физических лиц. Кроме тарифных планов для USB-модемов и Wi-Fi роутеров. Скидка подключается в течение 30 дней с момента ее заказа на сайте
              <a target="_blank" href="https://katok-beeline.ru/sale">katok-beeline.ru/sale</a>. Предложение требует акцепта.
              <a target="_blank" href="https://katok-beeline.ru/rules.pdf">Подробнее</a>
            </p>
            <p v-else>
              Под Безлимитным интернетом на месяц подразумевается отсутствие тарификации мобильного интернета в течение 30 дней с момента подключения скидки. Указанные условия действуют для физических лиц, являющихся абонентами тарифов с предоплатной системой расчетов, не предусматривающих абонентскую плату и являющихся участниками акции «Билайн-каток» на сайте
              <a target="_blank" href="https://beeline-katok.ru/">beeline-katok.ru</a> с 1 декабря 2019 года по 30 марта 2020 года.
              <br/>
              За исключением указанных <a target="_blank" href="http://katok-beeline.ru/internet.pdf">тарифных планов</a>, а также тарифных планов для USB-модемов и Wi-Fi. Скидка подключается в течение 30 дней с момента ее заказа на сайте
              <a target="_blank" href="https://katok-beeline.ru/sale">katok-beeline.ru/sale</a>. Предложение требует акцепта.
              <a target="_blank" href="https://katok-beeline.ru/rules.pdf">Подробнее</a>
            </p>
          </b-container>
        </div>
      </VueSlideToggle>
  </div>
</template>

<script>
    export default {
        name: "Sale",
        data(){
            return{
                modaltext:'',
                show:false,
                open:false,
                first:false,
                second:false,
                type:'',
                promocode:'',
                isDisabled:true,
                serverRes:'',
                codeOneChanging:false,
                codeOneOk:false,
                codeOneBad:false,
                codeTokens:{
                    X:{
                        pattern: /[0-9a-zA-Z-]/
                    },
                },
            }
        },
        methods:{
            clickItem: function(type){
                this.open = true;
                this.type = type;
                if(type === 'sale'){
                    this.first = true;
                    this.second = false;
                }
                else{
                    this.first = false;
                    this.second = true;
                }
            },
            choosePrize: function(){
                this.$http.post(this.$api +'codes/prizes/'+ this.promocode +'/'+ this.type +'').
                then(response => {
                    if(response.ok){
                       this.show = true;
                       this.promocode = '';
                       this.modaltext = 'Прекрасный выбор!';
                       this.isDisabled = true;
                       this.codeOneOk = false;
                       this.first = false;
                       this.second = false;
                       this.open = false;
                    }
                }).catch(err => {
                    this.show = true;
                    this.modaltext = 'Приз уже выбран';
                });
            },
            inputPropmo: function () {
                if(this.promocode.length >0){
                    this.codeOneChanging = true;
                }
                else{
                    this.codeOneChanging = false;
                }
                if(this.codeOneChanging <10){
                    this.codeOneOk = false;
                    this.codeOneBad = false;
                    this.isDisabled = true;
                }
                if(this.promocode.length == 10){
                    this.promocode = this.promocode.toLocaleUpperCase();
                    this.$http.post(this.$api +'codes/prizes/'+ this.promocode +'').
                    then(response => {
                        console.log(response);
                        if(response.ok){
                            this.codeOneChanging = false;
                            this.codeOneOk = true;
                            this.codeOneBad = false;
                            this.isDisabled = false;
                            this.serverRes = response.bodyText;
                        }
                    }).catch(err => {
                        console.log(err)
                        if(err.status == 404){
                            this.codeOneChanging = false;
                            this.codeOneBad = true;
                            this.codeOneOk = false;
                            this.true = false;
                            this.serverRes = err.bodyText;
                        }
                    });
                }
            },
        }
    }
</script>

<style scoped lang="scss">
  .orange{
    position: relative;
    min-height: 100vh;
    padding-top: 100px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color:#ffb612;
    background-image: url('../assets/orangeBG.png');
    background-repeat: no-repeat;
    background-size: cover;
    .present{
      position: absolute;
      top: 100px;
      right: 10%;
      @media screen and (max-width:850px){
        display: none;
      }
    }
  }
  .pb-10{
    padding-bottom: 100px;
  }
  .footnote{
    position: relative;
    padding: 30px 0 100px;
    background-color:#ffb612;
    background-image: url('../assets/orangeBG.png');
    background-repeat: no-repeat;
    background-size: cover;
    font-family: Arial;
    p{
      a{
        color: #000;
        text-decoration: underline;
      }
    }
  }
  .prize__text{
    font-family: Arial;
    font-size: 16px;
  }
  .item__title{
    width: 200px;
    text-align: center;
    margin-left: auto;
    @media screen and (max-width:768px){
      margin: 0 auto!important;
    }
  }
  .item{
    font-family: Arial;
    background: #fff;
    width: 200px;
    position: relative;
    height: 240px;
    padding: 20px;
    cursor: pointer;
    font-size: 18px;
    box-shadow: 0 0 0 #000;
    transition:box-shadow .3s;
    .log{
      transition: .2s;
    }
    &:hover{
     .log{
       transform: scale(1.05);
     }
    }
    @media screen and (max-width:768px){
     margin: 10px auto!important;
    }
    img{
      display: block;
      margin: 20px auto;
    }
  }
  .choose{
    cursor: pointer;
    img{
      width: 200px;
      margin-top: 10px;
      display: block;
      @media screen and (max-width:768px){
        margin: 10px auto!important;
      }
    }
  }
  .toggle{
    background: #fff;
    padding: 30px 0;
    h3{
      color:#ffb612;
    }
  }
  .text{
    font-family: Arial;
    display: flex;
    justify-content: center;
    align-items: flex-start;
    .num{
      color:#ffb612;
      font-size: 28px;
      margin-top: -10px;
      margin-right: 10px;
      font-family:'OfficinaSerifBookC';
    }
  }
</style>
