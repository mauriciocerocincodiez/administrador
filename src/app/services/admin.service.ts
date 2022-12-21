import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";




@Injectable({
  providedIn: 'root'
})


export class AdminService {


  constructor(
    private _http: HttpClient
  ) { 
  }

  login_admin(data: any){
  
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.post('http://localhost:4201/api/login_admin', data, {headers: headers});
  }

  getToken(){
  return localStorage.getItem('token');
  }


}

// export class AdminService {
//   enviarMesajeAConsola(mensaje: object){
//     console.log('mostrando datos desde el servicio');
//     console.log(mensaje);
//   }
// }
