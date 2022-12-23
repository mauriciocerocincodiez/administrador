import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { GLOBAL } from "./GLOBAL";
import { HttpClient, HttpHeaders } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  constructor(
    private _http: HttpClient
  ) { 
  }

  listar_clientes_filtro_admin(tipo: any, filtro: any, token: any){
  
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
    return this._http.get('http://localhost:4201/api/listar_clientes_filtro_admin/'+tipo+'/'+filtro, {headers: headers});
    }
}
