import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;

@Component({
  selector: 'app-galeria-producto',
  templateUrl: './galeria-producto.component.html',
  styleUrls: ['./galeria-producto.component.css']
})
export class GaleriaProductoComponent {
  public producto : any;
  public productos : any;
  public token;
  public id: any;
  public file: any = undefined;
  public url;
  public data: any = {};

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _productoService: ProductoService
  ){
    this.token = _adminService.getToken();
    this.url = GLOBAL.url;
  
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
              console.log(this.producto);
              
  
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

  init_data(){

    this._productoService.obtener_inventario_admin(this.id, this.token).subscribe(
      response => {
        
        this.productos = response;
        this.producto = Object.values(this.productos.data);
        console.log('productos');
        console.log(this.producto);
        

      },
      error => {
        console.log(error);
      }
    );

  }

  fileChangeEvent(event: any) {
    var file;
    if (event.target.files && event.target.files[0]) {
      file = <File>event.target.files[0];

      if (file.size <= 4000000) {
        // asd
        if (
          file.type == 'image/png' ||
          file.type == 'image/jpeg' ||
          file.type == 'image/webp' ||
          file.type == 'image/gif' ||
          file.type == 'image/jpeg'
        ) {
          const reader = new FileReader();
          this.file = file;
          console.log(file);
        } else {
          iziToast.show({
            title: 'ERROR',
            titleColor: 'red',
            color: 'danger',
            class: 'text-danger',
            position: 'topRight',
            message: 'El archivo debe de ser una imagen.',
          });

          this.file = undefined;
        }
      } else {
        iziToast.show({
          title: 'ERROR',
          titleColor: 'red',
          color: 'danger',
          class: 'text-danger',
          position: 'topRight',
          message: 'La imagen no debe de pesar mas de 4 mbs.',
        });

        this.file = undefined;
      }
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        color: 'danger',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe de seleccionar una imagen.',
      });
    }
  }

  agregar_imagenes(){
    if(this.file != undefined){
      let data = {
        imagen: this.file
      }
      console.log('funcion agregar imagenes');
      console.log(data);
      this._productoService.agregar_imagen_galeria_admin(this.id, data,this.token).subscribe(
        Response =>{
          this.init_data()
        },
        error =>{
          console.log(error);
        }
      )
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        color: 'danger',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe de seleccionar una imagen.',
      });
    }
  }

  eliminar(_id: any, id_imagen: any){
 
   console.log('id producto');
   console.log(_id);
   console.log('id imagen');
   console.log(id_imagen);

    this.data = {
     _id: id_imagen

    }

    this._productoService.eliminar_imagen_galeria_admin (_id, this.data, this.token).subscribe(
      Response =>{
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Se  elimino correctamente la imagen.'
      });

      this.init_data()
        
      },
      error=>{
        console.log(error);
      }
    );

  }


}
