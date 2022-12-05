import { NgxSpinnerService } from 'ngx-spinner';
import { Component } from '@angular/core';
import { CardinalService } from 'src/service/cardinal.service';
import { NetpayjsService } from 'src/service/netpayjs.service';
import { Netpay3dsService } from 'netpay3ds';
declare var NetPay: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})

export class AppComponent {
  cardNumber: any;
  expMonth: any;
  expYear: any;
  cvv: any;
  dfp: any;
  responseToken: any;
  responseStatus: any;
  referenceId: any;
  amount = 7.00;
  tokenCharge: any;
  transactionTokenId: any;

  constructor (private _netpayService: NetpayjsService,
    private _cardinalService: CardinalService,
    private _spinner: NgxSpinnerService,
    private _netpay3ds: Netpay3dsService) {}

  ngOnInit () {
    // Llamado a la generacion del deviceFingerPrint
    this.dfp = this._netpayService.initDeviceFingerPrint();
  }

  /**
   * @method saveData()
   * @description: Metodo de inicio de la transaccion
  */
  saveData() {
    this._spinner.show();
    this.cvv = document.getElementById('cvv');
    this.expMonth = document.getElementById('expmonth');
    this.expYear = document.getElementById('expyear');
    this.cardNumber = document.getElementById('cnumber');

    // ejecutar tokenizacion
    this._netpayService.generateToken(this.cardNumber.value, this.expMonth.value, this.expYear.value, this.cvv.value);

    let _this = this;
    this._netpay3ds.setSandboxMode(false);
    debugger;
    this._netpay3ds.init(function () {
      debugger;
      _this._netpay3ds.config(_this, _this.amount, _this.callback);
    });
    this.responseStatus = sessionStorage.getItem('status');
    this.responseToken = sessionStorage.getItem('data');
    this.tokenCharge = JSON.parse(this.responseToken);
  }

  callback(_this: any, referenceId: string) {
    debugger;
    _this.charges(referenceId);
  }

  charges(referenceId: string) {
    let body = {
      "transactionType": "Auth",
      "description": 'Tortas',
      "source": this.tokenCharge.token,
      "paymentMethod": "card",
      "amount": 7.00,
      "deviceFingerPrint": this.dfp,
      "currency": "MXN",
      "billing": {
        "firstName": "Ismael",
        "lastName": "Garza",
        "email": 'ismaelg9711@hotmail.com',
        "phone": "5555555559",
        "address": {
          "city": "Monterrey",
          "country": "MX",
          "postalCode": "64102",
          "state": "MTY",
          "street1": "Caintra 103",
          "street2": "Barrio Topo chico"
        },
        "merchantReferenceCode": '12345'
      },
      "redirect3dsUri": 'https%3A//netpay.mx',
      "referenceID": referenceId
    }
    this._cardinalService.charge(body).then((response: any) => {
      this.transactionTokenId = response.transactionTokenId;
      let _this = this;
      let canProceed = _this._netpay3ds.canProceed(response.status, response.threeDSecureResponse.responseCode, response.threeDSecureResponse.acsUrl);
      if(canProceed) {
        this._netpay3ds.proceed(_this, response.threeDSecureResponse.acsUrl , response.threeDSecureResponse.paReq, response.threeDSecureResponse.authenticationTransactionID, this.callbackProceed);
      }else{
        this._spinner.hide();
      }
    });
  }

  callbackProceed(_this: any, processorTransactionId: string) {
    _this.confirm(_this,processorTransactionId);
  }

  confirm(_this: any, processorTransactionId: string) {
    this._cardinalService.chargeConfirm(_this.transactionTokenId, processorTransactionId).then((response: any) => {
      if (response.status === 'success') {
        console.log('Status response de confirm con success: ',response.status);
        this._spinner.hide();
      } else {
        console.log('Status response de confirm sin success: ',response.status);
        this._spinner.hide();
      }
    }).catch((error:any) => {
      console.log('Status response de confirm error: ',error.status);
      this._spinner.hide();
    });
  }
}
