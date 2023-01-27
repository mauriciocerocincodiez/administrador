import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;

@Component({
  selector: 'app-variedad-producto',
  templateUrl: './variedad-producto.component.html',
  styleUrls: ['./variedad-producto.component.css']
})
export class VariedadProductoComponent {
  public producto : any;
  public productos : any;
  public token;
  public id: any;
  public nueva_variedad = '';
  public nombre_variedad = '';




  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ){
    this.token = _adminService.getToken();
  
      this._route.params.subscribe(
        params => {
          this.id = params['id'];
          console.log('id del producto');
          console.log(this.id);
          this._productoService.obtener_inventario_admin(this.id, this.token).subscribe(
            response => {
              
              this.productos = response;
              this.producto = Object.values(this.productos.data);
              console.log('productos');
              console.log(this.producto[0].titulo_variedad );
              this.nombre_variedad = this.producto[0].titulo_variedad;
              
  
            },
            error => {
              console.log(error);
            }
          );
        }
      );
     
  }

  ngOnInit(): void {
  }

  

  agregar_variedades(){
    if(this.nueva_variedad){
      this.producto[0].variedades.push({titulo: this.nueva_variedad});
      this.nueva_variedad = '';
    } else {

      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        color: 'danger',
        class: 'text-danger',
        position: 'topRight',
        message: 'El campo de la variedad debe de ser completada',
      });
    }
  }

 

  eliminar_variedad(indice: number){
    this.producto[0].variedades.splice(indice,1);
  }


  actualizar(){
    if(this.nombre_variedad){
      // se actualiza
      if (this.producto[0].variedades.length >0){
        // actualiza
        this._productoService.actualizar_producto_variedades_admin(this.id,{
          titulo_variedad: this.nombre_variedad,
          variedades: this.producto[0].variedades,
          
        },this.token).subscribe(
          response => {
           // this.producto = response;
           console.log(response);
           iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se actualizaron correctamente las variedades.'
    });
           this._router.navigate(['/panel/productos']);
           
            
          },
          error =>{
            console.log(error);
          }
        );
      }
      else {
        iziToast.show({
          title: 'ERROR',
          titleColor: 'red',
          color: 'danger',
          class: 'text-danger',
          position: 'topRight',
          message: 'Debe de ingresar almenos una variedad',
        });
      }
    } else{
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        color: 'danger',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe de ingresar el nombre de la variedad',
      });
    }
  }
}
