import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
declare var NetPay: any;

@Injectable({
  providedIn: 'root'
})
export class NetpayjsService {
  dfp: any;

  constructor() { }

  initDeviceFingerPrint() {
    /* 
    Esta línea se debe de llamar antes de la generación del device fingerprint
    La generación del device fingerprint debe de estar al momento en que se visualiza el formulario de pago
    */
    NetPay.setSandboxMode(false); 
    this.dfp = NetPay.form.generateDeviceFingerPrint();
  }

  /**
   * @method generateToken()
   * @description: Tokenizacion de la tarjeta, este metodo se ejecuta al dar clic al boton de pago donde inicia la transaccion
   * @param {number} cardNum
   * @param {number} exMonth
   * @param {number} exYear
   * @param {number} cvv
  */
  generateToken(cardNum: number, exMonth: number, exYear: number, cvv: number) {
    let cardInformation = {
      cardNumber: cardNum,
      expMonth: exMonth,
      expYear: exYear,
      cvv2: cvv,
      deviceFingerPrint : this.dfp //Aqui se agrega el valor del device
    };
    NetPay.setApiKey(environment.publicKeyPrd);
    NetPay.token.create(cardInformation, success, error);

    function success(e: any) {
      console.log("Token created successfully");
      console.log(e);
      let data = e.message.data.toString()
      sessionStorage.setItem('data', data)
      sessionStorage.setItem('status', 'success')
    }

    function error(e: any) {
      console.log("Something went wrong!");
      console.log(e);
      sessionStorage.setItem('status', 'error')
    }
  }
}
