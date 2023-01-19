import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-update-producto',
  templateUrl: './update-producto.component.html',
  styleUrls: ['./update-producto.component.css']
})
export class UpdateProductoComponent {

  public producto: any = {};
  public productos: any = {};
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public token;
  public id: any;

  constructor(
    private _productoServece: ProductoService,
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute
  ) {
    this.token = _adminService.getToken();
  }




  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        console.log('id del producto');
        console.log(this.id);
        this._productoServece.obtener_producto_admin(this.id, this.token).subscribe(
          response => {
            
            this.productos = response;
            if(this.productos.data == undefined){
                this.producto = undefined;
            } else {
              this.producto = this.productos.data;
              console.log('producto');
              console.log(this.producto);
            }
            
            
          },
          error =>{
            console.log(error);
          }
        )
      }
    );
   }

  actutualizar(actualizarForm: NgForm) {
    if (actualizarForm.valid) {
      console.log(this.producto);

      this._productoServece
        .registro_producto_admin(this.producto, this.file, this.token)
        .subscribe(
          (Response) => {
            
            iziToast.show({
              title: 'SUCCESS',
              titleColor: '#1DC74C',
              color: '#FFF',
              class: 'text-success',
              position: 'topRight',
              message: 'El producto se registro correctamente.'
      });
            this._router.navigate(['/panel/productos']);
          },
          (error) => {
            console.log(error);
          }
        );
    } else {
      iziToast.show({
        title: 'ERROR',
        titleColor: 'red',
        color: 'danger',
        class: 'text-danger',
        position: 'topRight',
        message: 'Debe de llenar todos los campos en el registro',
      });
    }
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
          reader.onload = (e) => (this.imgSelect = reader.result);
          reader.readAsDataURL(file);
          $('#input-portada').text(file.name);
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

          this.imgSelect = 'assets/img/01.jpg';
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

        this.imgSelect = 'assets/img/01.jpg';
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

}
