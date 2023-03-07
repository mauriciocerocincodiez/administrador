import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { JwtHelperService, JwtModule } from "@auth0/angular-jwt";   



@Injectable({
  providedIn: 'root'
})


export class AdminService {

  public url;

  constructor(
    private _http: HttpClient
  ) { 
    this.url = GLOBAL.url;
  }

  login_admin(data: any){
  
  let headers = new HttpHeaders().set('Content-Type', 'application/json');
  return this._http.post(this.url+'login_admin', data, {headers: headers});
  }

  getToken(){
  return localStorage.getItem('token');
  }

  public isAuthenticated(allowRoles: string[]): boolean{

   const token1 = localStorage.getItem('token');
   const token = "'"+token1+"';";

   //'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI2MzlkMzE1NzA0NzNjM2UwNTdhZmU3MDQiLCJub21icmVzIjoid2lsdG9uIiwiYXBlbGxpZG9zIjoic2VybmEiLCJlbWFpbCI6InNlcm5hQGdtYWlsLmNvbSIsImlhdCI6MTY3MTYzNTg4MSwiZXhwIjoxNjcyMjQwNjgxfQ.niiO5Te0SPQIboHb9191sZEWJ-AK2e2ObMdwn7q9fgo';
   

   if (!token){
    return false;

   } 
   
   try {
    
    const helper = new JwtHelperService();
    var decodetoken = helper.decodeToken(token);
   
    if(helper.isTokenExpired(token)){
      localStorage.clear();
      return false;
     }


   if(!decodetoken){
    console.log(' NO ES VALIDO EL TOKEN');
    localStorage.removeItem('token');
    return false;
   }

   } catch (error) {

    localStorage.removeItem('token');
    return false;
    
   }

   


    return allowRoles.includes(decodetoken['rol']);
   

   

  }

}

// export class AdminService {
//   enviarMesajeAConsola(mensaje: object){
//     console.log('mostrando datos desde el servicio');
//     console.log(mensaje);
//   }
// }
