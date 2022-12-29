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

    registro_cliente_admin(data: any, token: any){
    
      let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
      return this._http.post('http://localhost:4201/api/registro_cliente_admin',data, {headers: headers});
      }

      obtener_cliente_admin(id: any, token: any){
    
        let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
        return this._http.get('http://localhost:4201/api/obtener_cliente_admin/'+id, {headers: headers});
        }
    
        actualizar_cliente_admin(id: any, data: any, token: any){
    
          let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
          return this._http.put('http://localhost:4201/api/actualizar_cliente_admin/'+id,data, {headers: headers});
          }

           eliminar_cliente_admin(id: any, token: any){
    
            let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
            return this._http.delete('http://localhost:4201/api/eliminar_cliente_admin/'+id, {headers: headers});
            }
        
}
