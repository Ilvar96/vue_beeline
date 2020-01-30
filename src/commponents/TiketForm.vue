<template>
    <div>
      <div class="snow__bg">
        <img class="tree" src="../assets/tree.svg" alt="tree">
        <b-container class="pt-5">
          <b-row class="justify-content-center">
            <b-col xs="12" md="8">
              <h2 class="text-center">Билет на каток</h2>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mt-3">
            <b-col xs="12" md="6" lg="4">
              <b-form>
                <div class="d-flex align-items-center justify-content-center">
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
              </b-form>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <div class="blue__snow">
        <img class="man" src="../assets/man.png" alt="man">
        <b-container v-bind:class="{ disabled:isDisabled }">
          <b-row class="justify-content-center pt-5">
            <b-col xs="12" md="6">
              <h2 class="text-center">Выбери свой каток</h2>
            </b-col>
          </b-row>
          <b-row class="justify-content-center pt-4">
            <b-col xs="12" md="6" lg="4">
              <div class="item msk city" v-bind:class="{ disabled:mskDisabled }" @click="cityClick('moscow')" v-scroll-to="'#toggle2'">
                <p class="text-center">Москва</p>
                <img src="../assets/msk.svg" alt="city">
              </div>
            </b-col>
            <b-col xs="12" md="6" lg="4">
              <div class="item spb city" v-bind:class="{ disabled:spbDisabled }" @click="cityClick('saint-petersburg')" v-scroll-to="'#toggle2'">
                <p class="text-center">Санкт-Петербург</p>
                <img src="../assets/spb.png" alt="city">
              </div>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <VueSlideToggle id="toggle2" class="body pb-5" :open="open" tag="section" :duration="500">

        <div class="snow__bg2">
          <img class="tree2" src="../assets/tree.svg" alt="tree">
            <div v-if="city == 'moscow'" class="mskPrize prize">
              <h3 class="text-center mt-3">Электронный билет</h3>
              <div class="tiket">
                <b-form class="mt-1" @submit.prevent="cityFormSubmit">
                  <the-mask  class="text-center black xs-75" mask="XXXXXXXXXXXXXXXXXXXXXXXXXXXX" v-model="email" placeholder="Отправить на email" :tokens="emailTokens" />
                  <button class="prize__button" type="submit">{{button}}</button>
                </b-form>
              </div>
              <div class="footnote">
                <b-container>
                  <p>
                    Под билетом на каток подразумевается электронное приглашение на разовое
                    посещение Главного катка страны на ВДНХ в г. Москва, высылается
                    пользователю посредством электронной почты. Приглашение может быть
                    выдано только в результате победы на третьем уровне в игре «Билайн-Каток»
                    и при условии клика на кнопку «Получить» на карточке приза «Билет на
                    каток» в личном кабинете на <a target="_blank" href="https://beeline-katok.ru/">beeline-katok.ru</a> согласно правилам акции.
                    Наличие приза «Билет на каток» можно проверить в личном кабинете на
                    сайте. Приглашение действительно на однократное бесплатное посещение
                    Катка и прокат 1 пары коньков, действительно на 1 (одно) лицо. Срок
                    действия с 22 ноября 2019 по 01 марта 2020 г., кроме 31. 12.2019.
                    Приглашением для прохода на ледовый каток можно воспользоваться один
                    раз за весь период работы ледового катка. Подробнее на <a target="_blank" href="https://katok.vdnh.ru/">katok.vdnh.ru</a>.
                  </p>
                </b-container>
              </div>
            </div>
            <div v-else class="spbPrize prize">
              <div class="promocode">
              <p class="text-center mt-3 mb-0">
                Данный промокод дает скидку 100% <br/> при покупке билета на каток.
              </p>
              <p class="text-center mt-2 mb-3 snos-text">
                Введи промокод на сайте <a target="_blank" href="http://sevcableport.ru/katok">«Cевкабель порт»</a>
                <br/>
                в соответствующем поле при покупке билета.
              </p>
              <div class="line d-flex align-items-start justify-content-center">
                <div class="code">{{code}}</div>
                <div class="copy ml-2" v-clipboard:copy="code">
                  <img src="../assets/copy.svg" alt="copy">
                  <span>скопировать</span>
                </div>
              </div>
            </div>
              <b-row class="justify-content-center pb-5">
              <b-col xs="12" md="6" lg="4">
                <b-form class="mt-1" @submit.prevent="cityFormSubmit">
                  <the-mask  class="text-center samll" mask="XXXXXXXXXXXXXXXXXXXXXXXXXXXX" v-model="email" placeholder="Отправить код на email" :tokens="emailTokens" />
                  <button class="prize__button" type="submit">{{button}}</button>
                </b-form>
              </b-col>
            </b-row>
              <div class="footnote">
                <b-container>
                  <p>
                    Под билетом на каток подразумевается промокод предоставляющий скидку 100% на покупку билета для посещения ледового катка «Каток у моря» в «Севкабель Порт» в г. Санкт-Петербурге. Промокод может быть выдан только в результате победы на третьем уровне в игре «Билайн-Каток» и при условии клика на кнопку «Получить» на карточке приза «Билет на каток» в личном кабинете на
                    <a href="https://beeline-katok.ru/" target="_blank">beeline-katok.ru</a> согласно правилам акции. Срок действия промокода с 21.12.2019 по 08.03.2020 или до момента официального закрытия сезона 2019-2020 г. ледового катка «Каток у моря». Наличие приза «Билет на каток» можно проверить в личном кабинете на сайте. Промокодом для получения скидки можно воспользоваться один раз за весь период работы ледового катка для покупки только одного билета в период с 21.12.2019 г. по 31.01.2020 г. при предъявлении промокода на кассе катка; в период с 01.02.2020 г. по 08.03.2020 г. только при онлайн-покупке билета на каток на сайте
                    <a href="http://sevcableport.ru/katok" target="_blank">http://sevcableport.ru/katok</a> . Скидка не суммируется с другими скидками и действует только при онлайн-покупке билета на каток на сайте
                    <a href="http://sevcableport.ru/katok" target="_blank">http://sevcableport.ru/katok</a> . Скидка действует только на входной билет и не включает дополнительные услуги, например прокат, заточку коньков.
                    <br/>
                    Акция действительна с 21.12.2019 г. по 08.03.2020 г. Организатор акции ООО «К-40», 199106, Санкт-Петербург, Кожевенная линия, дом. 40, помещение 21. ОГРН 1177847175076. Участник акции может получить только один промокод.
                  </p>
                </b-container>
              </div>
            </div>
        </div>
      </VueSlideToggle>
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
    export default {
        name: "TiketForm",
        data(){
          return{
            message:'',
            show:false,
            isDisabled:true,
            button:'Отправить',
            open:false,
            serverRes:'',
            codeOneChanging:false,
            codeOneOk:false,
            codeOneBad:false,
            spbDisabled:false,
            mskDisabled:false,
            city:'',
            code:'',
            email:'',
            promocode:'',
            emailTokens:{
                X:{
                    pattern: /[0-9a-zA-Z_@./-]/
                },
            },
            codeTokens:{
                X:{
                    pattern: /[0-9a-zA-Z-]/
                },
            },
          }
        },
        methods:{
            cityClick: function (city) {
                this.open = true;
                this.city = city;
                if(city === 'moscow'){
                    this.spbDisabled = true;
                }else{
                    this.mskDisabled = true;
                }
                this.$http.post(this.$api +'codes/tickets/'+ this.promocode +'/'+ this.city +'').
                    then(response => {
                        if(city === 'moscow'){

                        }else{

                            this.code = response.body.code;
                        }
                })
                    .catch(err => {
                        console.log(err);
                    })
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
                    this.$http.post(this.$api +'codes/tickets/'+ this.promocode +'').
                    then(response => {
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
                            this.serverRes = err.bodyText;
                        }
                    });
                }
            },
            cityFormSubmit: function () {
                this.$http.post(this.$api +'codes/tickets/resend/'+ this.promocode +'',
                    {'email':this.email}
                  ).
                  then(response => {
                      if(response){
                          this.message = 'Отправлено!';
                          this.show = true;
                          this.codeOneOk = false;
                          this.email = '';
                          this.promocode = '';
                          this.spbDisabled = false;
                          this.mskDisabled = false;
                          this.isDisabled = true;
                          this.open = false;
                      }
                })
                  .catch(err => {
                      if(err.status ===  500){
                          this.message = 'Ошибка при отправке';
                          this.show = true;
                      }
                  })
            },
        }
    }
</script>

<style scoped lang="scss">
  .snow__bg{
    width: 100%;
    padding-bottom: 100px;
    background: url("../assets/snow.png")repeat;
    position: relative;
    z-index: 2;
    @media screen and (max-width:768px){
     height: 370px;
    }
  }
  .snow__bg2{
    position: relative;
    background: url("../assets/snow2.png") no-repeat top center;
    background-size: cover;
    padding: 100px 0 0;
    .tree2{
      position: absolute;
      right: 5%;
      top: 5%;
      @media screen and (max-width:768px){
       display: none;
      }
    }
  }
  .blue__snow{
    margin-top: -50px;
    position: relative;
    z-index: 5;
    padding-bottom: 100px;
    background: url("../assets/blue.png")no-repeat top center;
    background-size: cover;
    .item{
      width: 270px;
      height: 160px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      cursor: pointer;
      background: url("../assets/cityBG.svg");
      @media screen and (max-width:768px){
        margin-top: 25px;
      }
      p{
        font-size: 16px;
        margin-top: 10px;
      }
      img{
        height: 100px;
        width: auto;
        margin-top: -15px;
      }
    }
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
  .mskPrize{
    .tiket{
      width: 400px;
      height: 240px;
      margin: 20px auto 50px;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      background: url("../assets/cityBG.svg")no-repeat center;
      background-size: cover;
      @media screen and (max-width:768px){
        width: 320px;
        height: 180px;
      }
    }
  }
  .prize__button{
    color: #ffb611;
    background: #000;
    border: none;
    outline: none;
    font-size: 22px;
    padding: 0 20px;
    margin: 10px auto;
    display: block;
    height: 50px;
    border-radius: 40px;
    text-align: center;
  }
  .spbPrize{
    .prize__button{
      color: #000;
      background: #ffb611;
    }
  }
  .promocode{
    font-family: Arial;
    font-weight: normal;
    font-size: 18px;
    .code{
      font-weight: bold;
      font-size: 24px;
    }
    .copy{
      cursor: pointer;
      span{
        font-size: 10px;
        color: #868686;
      }
    }
  }
  .snos-text{
    a{
      color: #000;
      text-decoration: underline;
    }
  }
  .body{
    @media screen and (max-width:768px){
      br{
        display: none;
      }
    }
  }
  .btn-game {
    height: 79px;
    background: url("../assets/btn-game-280.png")no-repeat center;
    background-size: cover;
    width: 280px;
    display: block;
    margin: 25px auto;
  }
</style>
