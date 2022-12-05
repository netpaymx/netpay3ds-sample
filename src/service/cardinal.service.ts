import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient, HttpHeaders} from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class CardinalService {
  /*
  Ambientes para pruebas y productivo
    envirometn.url_labs = Pruebas en labs
    enviroment.url_154 = Pruebas en el 154
    enviroment.url_191 = Pruebas en el 191
    enviroment.url_prd = Pruebas productivas
  */
  urlEnviroment = environment.url_prd;

  httpOptions = {
    headers: new HttpHeaders(
      {
        /*
          Llaves para cada ambiente de prueba
          envirometn.secretKeyLabs = Pruebas en labs
          enviroment.secretKey154 = Pruebas en el 154
          enviroment.secretKeyPrd = Pruebas productivas
        */
        Authorization: environment.secretKeyPrd,
        'Content-Type': 'application/json; charset=UTF-8',
        'Accept': 'application/json; charset=UTF-8'
      }
    )
  };

  constructor(private httpClient: HttpClient) {}

  /**
   * @method charge()
   * @description: Servicio que nos dara el estatus si la transaccion entro por 3ds ahora version 2
   * @param {any} body Objeto con todos los datos que ocupa el servicio de charges para dar un estatus de 3ds
   * @returns RESOLVE or REJECT for the promise
  */
  charge(body: any) {
    const url = this.urlEnviroment + environment.charges;
    return new Promise((resolve, reject) => {​​
      this.httpClient.post(url,body, this.httpOptions).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }

  /**
   * @method chargeConfirm()
   * @description: Servicio para finalizar la transacción
   * @param {any} transactionTokenId Id de la transaccion que obtenemos del servicio de charges
   * @param {any} processorTransactionId Se obtiene de la respuesta del cardinal.on a veces puede ser null cuando 3ds da estatus 100
   * @returns RESOLVE or REJECT for the promise
  */
  chargeConfirm(transactionTokenId:any , processorTransactionId: any) {
    const url = this.urlEnviroment + environment.charges + '/' + transactionTokenId + '/confirm?processorTransactionId=' + processorTransactionId;
    let body = {}
    return new Promise((resolve, reject) => {​​
      this.httpClient.post(url, body, this.httpOptions).subscribe((response) => {
        resolve(response);
      }, (error) => {
        reject(error);
      });
    });
  }
}
