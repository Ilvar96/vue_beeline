<template>
    <div>
      <div class="snow__bg">
        <img class="tree" src="../assets/tree.svg" alt="tree">
        <b-container class="pt-5">
          <b-row class="justify-content-center">
            <b-col xs="12" md="8">
              <h2 class="text-center">Скидка 20%</h2>
              <p class="text-center discont-text">
                На покупку билета на каток
              </p>
            </b-col>
          </b-row>
          <b-row class="justify-content-center mt-3">
            <b-col xs="12" md="6" lg="4">
              <b-form>
                <div class="d-flex align-items-center">
                  <the-mask v-bind:class="{bad:codeOneBad}" @input="inputPhone" class="input text-center" type="tel"  mask="+7(###)###-##-##" v-model="phone" placeholder="Введи номер телефона" />
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
                <div class="text-center mt-3">
                  Скидка доступна только для абонентов Билайн.
                  <br/>
                  Введи номер своего телефона, чтобы мы могли проверить доступность скидки.
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
              <div class="item msk city" @click="cityClick('moscow')" v-scroll-to="'#toggle1'">
                <div class="bg"></div>
<!--                <div class="blur__text">-->
<!--                 Скоро!-->
<!--                </div>-->
                <p class="text-center">Москва</p>
                <img src="../assets/msk.svg" alt="city">
              </div>
            </b-col>
            <b-col xs="12" md="6" lg="4">
              <div class="item city spb" @click="cityClick('saint-petersburg')" v-scroll-to="'#toggle1'">
                <p class="text-center">Санкт-Петербург</p>
                <img src="../assets/spb.png" alt="city">
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-5 pb-5">
            <b-col>
              <h3 class="text-center">Выиграй еще больше призов!</h3>
              <a target="_blank" href="https://beeline-katok.ru/ " class="btn-game "></a>
            </b-col>
          </b-row>
        </b-container>
      </div>
      <VueSlideToggle id="toggle1" class="body pb-5" :open="open" tag="section" :duration="500">

        <div class="snow__bg2">
          <img class="tree2" src="../assets/tree.svg" alt="tree">
          <div v-if="city == 'moscow'" class="prize">
            <h3 class="text-center mt-3">Твой QR-код</h3>
            <p class="text-center mt-3">
              Данный QR-код дает скидку 20% при покупке билета на каток.
              <br/>
              Покажи его в кассе на катке ВДНХ.
              <br/>
              <br/>
              Нажми на QR-код, чтобы скачать или отправить на email.
            </p>
            <div class="mt-5 pb-5 text-center">
              <b-spinner v-if="!qrIsReady" label="Spinning"></b-spinner>
              <img v-else class="qr-image" :src="qrImageSrc" alt="qr" @click="sizeImage">
            </div>
            <div class="legal mt-3">
              <b-container>
                <p>
                  QR-код (куэр-код) на скидку 20% на покупку билета для посещения ледового катка «Главный каток страны» на ВДНХ в Москве. Скидка 20% действует вторник-четверг на сеансы с 11.00 до 15.00 и с 17.00 до 23.00 и в пятницу на сеанс с 11.00 до 15.00. QR-код может быть выдан только абоненту Билайн. Один QR-код дает возможность получения скидки только на один билет. Участник Акции может получить до 16 QR-кодов за период действия Акции. Скидка действует только при покупке билетов в кассах Катка.
                  Скидка не суммируется с другими скидками. Скидка действует только на входной билет основного катка и не включает дополнительные услуги, например, прокат, заточку коньков. Скидка не распространяется на билеты в бизнес – павильон и на детский каток.
                  <br/>
                  Акция действительна с 28.01.2020 г. по 01.03.2020 г. или до момента официального закрытия сезона 2019-2020 г. ледового катка «Главный каток страны» на ВДНХ. Организатор акции, 199106, Акционерное общество «Выставка достижений народного хозяйства», 129223, г. Москва, Проспект Мира, дом 119 ОГРН 1027700008874.
                </p>
              </b-container>
            </div>
          </div>
          <div v-else class="spbPrize prize">
            <div class="promocode">
              <p class="text-center mt-3 mb-0">
                Данный промокод дает скидку 20% <br/> при покупке билета на каток.
              </p>
              <p class="text-center mt-2 mb-3 snos-text">
                Введи промокод на сайте <a target="_blank" href="http://sevcableport.ru/katok">«Cевкабель порт»</a>
                <br/>
                в соответствующем поле или предъяви на кассе при покупке билета.
              </p>
              <div class="line d-flex align-items-start justify-content-center">
                <div class="code">{{code}}</div>
                <div class="copy ml-2" v-clipboard:copy="code">
                  <img src="../assets/copy.svg" alt="copy">
                  <span>скопировать</span>
                </div>
              </div>
            </div>
            <b-row class="justify-content-center">
              <b-col xs="12" md="6" lg="4">
                <b-form class="mt-1" @submit.prevent="cityFormSubmit">
                  <the-mask  class="text-center" mask="XXXXXXXXXXXXXXXXXXXXXXXXXXXX" v-model="email" placeholder="Отправить код на email" :tokens="emailTokens" />
                  <button class="prize__button" type="submit">{{button}}</button>
                </b-form>
              </b-col>
            </b-row>
            <div class="legal mt-3">
              <b-container>
                <p>
                  Промокод на скидку 20% на покупку билета для посещения ледового катка «Каток у моря» в «Севкабель Порт» в г. Санкт-Петербурге. Промокод может быт выдан только абоненту Билайн. Срок действия промокода с 21.12.2019 по 08.03.2020 или до момента официального закрытия сезона 2019-2020 г. ледового катка «Каток у моря». Промокодом для получения скидки можно воспользоваться один раз за весь период работы ледового катка для покупки только одного билета в период с 21.12.2019 г. по 31.01.2020 г. при предъявлении промокода на кассе катка; в период с 01.02.2020 г. по 08.03.2020 г. только при онлайн-покупке билета на каток на сайте
                  <a target="_blank" href="http://sevcableport.ru/katok">http://sevcableport.ru/katok</a>. Скидка не суммируется с другими скидками. Скидка действует только на входной билет и не включает дополнительные услуги, например прокат, заточку коньков.
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
      <b-modal centered size="sm"  v-model="SizeQR" hide-footer>
        <img class="qr-image big pb-0" :src="qrImageSrc" alt="qr">
        <a class="text-center d-block save-btn" target="_blank" :href="qrImageSrc">скачать QR-код</a>
        <form class="mt-3" @submit.prevent="sendQr">
          <input @input="changeQrInput" class="text-center" type="text" v-model="qrInput" placeholder="Введи email">
          <b-button
            type="submit"
            variant="beeline"
            v-bind:class="{disabled:buttonDisabled}"
            class="modal_btn-qr d-block border-0 border-radius"
            @click="SizeQR=false"
          >
            Отправить
          </b-button>
        </form>
      </b-modal>
    </div>
</template>

<script>
    export default {
        name: "DiscontForm",
        data(){
          return{
              message:'',
              button:'Отправить',
              buttonDisabled: true,
              isDisabled:true,
              open:false,
              serverRes:'',
              codeOneChanging:false,
              codeOneOk:false,
              codeOneBad:false,
              spbDisabled:false,
              mskDisabled:false,
              city:'',
              code:'',
              show:false,
              phone:'',
              email:'',
              emailTokens:{
                X:{
                    pattern: /[0-9a-zA-Z_@./-]/
                },
            },
              qrImageSrc:'',
              SizeQR:false,
              qrInput:'',
              cityId:'',
              qrIsReady: false,
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
                this.$http.post(this.$api +'codes/discounts/'+ this.phone +'/'+ this.city +'').
                then(response => {
                  console.log(response)
                    if(city === 'moscow'){
                        this.qrImageSrc = response.data.qr
                        this.cityId = response.data.id
                        this.qrIsReady = true
                    }else{
                        this.code = response.body.code;
                        this.cityId = response.data.id
                    }
                })
                    .catch(err => {
                        console.log(err);
                    })
            },
            inputPhone: function () {
                if(this.phone.length >0){
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
                if(this.phone.length == 10){
                    this.$http.post(this.$api +'codes/discounts/'+ this.phone +'').
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
                this.$http.post(this.$api +'codes/discounts/resend/'+ this.cityId +'',
                    {'email':this.email}
                ).
                then(response => {
                    if(response){
                        this.show = true;
                        this.email='';
                        this.phone = '';
                        this.message = 'Отправлено!';
                        this.spbDisabled = false;
                        this.mskDisabled = false;
                        this.isDisabled = true;
                        this.open = false;
                        this.codeOneOk = false;
                    }
                })
                    .catch(err => {
                        this.message = 'Ошибка при отправке';
                        this.show = true;
                    })
            },
            sizeImage: function () {
              this.SizeQR = true
            },
            changeQrInput: function () {
              if(this.qrInput.length >= 3){
                this.buttonDisabled = false
              }else{
                this.buttonDisabled = true
              }
            },
            sendQr: function () {
              this.$http.post(this.$api +'codes/discounts/resend/'+ this.cityId +'',
                {'email':this.qrInput}
              ).then(response => {
                this.message = response.bodyText;
                this.show = true;
                this.open = false;
                this.phone = '';
                this.isDisabled = true;
                this.codeOneOk = false;
                this.codeOneBad = false;
                this.qrInput = '';

              })
                .catch(err => {
                  console.log(err)
                  this.message = 'Ошибка при отправке';
                  this.show = true;
                })
            }
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
      br{
        display: none;
      }
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
    background: url("../assets/blue.png")no-repeat top center;
    background-size: cover;
    @media screen and (max-width:768px){
      br{
        display: none;
      }
    }
    .item{
      width: 270px;
      height: 160px;
      margin: 0 auto;
      display: flex;
      align-items: center;
      justify-content: flex-start;
      flex-direction: column;
      cursor: pointer;
      position: relative;
      background: url("../assets/cityBG.svg");
      &.disabled{
          pointer-events: none;
        .bg{
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          border-radius: 3px;
          background: rgba(0,0,0,.8);
          z-index: 2;
        }
          .blur__text{
            color: #fff;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
            text-align: center;
            z-index: 3;
          }

      }
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
  .mskPrize{
    width: 400px;
    height: 240px;
    margin: 0 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    cursor: pointer;
    background: url("../assets/cityBG.svg")no-repeat center;
    background-size: cover;
  }
  .prize__button{
    color: #ffb611;
    background: #000;
    border: none;
    outline: none;
    font-size: 22px;
    width: 170px;
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
    padding: 0 5px;
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
  .discont-text{
    font-family: Arial;
    font-size: 20px;
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
  .qr-image{
    width: 150px;
    display: block;
    margin: 0 auto;
    padding: 0 0 50px;
    cursor: pointer;
    &.big{
      width: 250px;
      padding: 0;
      cursor: auto;
    }
  }
  .border-radius{
    border-radius: 50px;
  }
  .save-btn{
    text-decoration: underline;
    color: #000;
  }
  .modal_btn-qr{
    margin: 20px auto 0;
    transition: .3s;
    &:hover{
      box-shadow: 0px 0px 2px 0 #000;
    }
  }
</style>
