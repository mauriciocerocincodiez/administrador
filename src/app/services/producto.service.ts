import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GLOBAL } from './GLOBAL';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {
  constructor(private _http: HttpClient) {}

  registro_producto_admin(data: any, file: any, token: any) {
    let headers = new HttpHeaders({ 'Authorization': token });

    const fd = new FormData();
    fd.append('titulo', data.titulo);
    fd.append('stock', data.cantidad);
    fd.append('precio', data.precio);
    fd.append('categoria', data.categoria);
    fd.append('descripcion', data.descripcion);
    fd.append('portada', file);

    return this._http.post(
      'http://localhost:4201/api/registro_producto_admin',
      fd,
      { headers: headers }
    );
  }

  listar_producto_admin(filtro: any, token: any){
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
    return this._http.get('http://localhost:4201/api/listar_producto_admin/'+filtro, {headers: headers});
    }

}
