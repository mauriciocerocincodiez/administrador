import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './GLOBAL';

@Injectable({
  providedIn: 'root',
})
export class ProductoService {

  public url;

  constructor(private _http: HttpClient) {
    this.url = GLOBAL.url;
  }

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
      this.url+'registro_producto_admin',
      fd,
      { headers: headers }
    );
  }

  listar_producto_admin(filtro: any, token: any){
    let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
    return this._http.get(this.url+'listar_producto_admin/'+filtro, {headers: headers});
    }

    obtener_producto_admin(id: any, token: any){
    
      let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
      return this._http.get(this.url+'obtener_producto_admin/'+id, {headers: headers});
      }


      actualizar_producto_admin(id: any, data: any, file: any, token: any) {
        let headers = new HttpHeaders({ 'Authorization': token });
    
        const fd = new FormData();
        fd.append('titulo', data.titulo);
        fd.append('stock', data.cantidad);
        fd.append('precio', data.precio);
        fd.append('categoria', data.categoria);
        fd.append('descripcion', data.descripcion);
        fd.append('portada', file);
    
        return this._http.post(
          this.url+'actualizar_producto_admin/'+id,
          fd,
          { headers: headers }
        );
      }

      obtener_inventario_admin(id: any, token: any){
    
        let headers = new HttpHeaders({'Content-Type' : 'application/json', 'Authorization': token});
        return this._http.get(this.url+'obtener_inventario_admin/'+id, {headers: headers});
        }

        actualizar_producto_variedades_admin(id: any, data: any, token: any) {
          let headers = new HttpHeaders({ 'Authorization': token });
      
          return this._http.put(
            this.url+'actualizar_producto_variedades_admin/'+id,
            data,
            { headers: headers }
          );
        }


        agregar_imagen_galeria_admin(id: any,data: any, token: any) {
          let headers = new HttpHeaders({ 'Authorization': token });
      
          const fd = new FormData();
          fd.append('imagen', data.imagen);
      
          return this._http.put(
            this.url+'agregar_imagen_galeria_admin/'+id,
            fd,
            { headers: headers }
          );
        }

        eliminar_imagen_galeria_admin(id: any, data: any, token: any) {
          let headers = new HttpHeaders({ 'Authorization': token });
      
          return this._http.put(
            this.url+'eliminar_imagen_galeria_admin/'+id,
            data,
            { headers: headers }
          );
        }
}
