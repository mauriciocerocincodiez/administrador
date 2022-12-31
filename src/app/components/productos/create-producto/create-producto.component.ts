import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast: any;
declare var jQuery: any;
declare var $: any;

@Component({
  selector: 'app-create-producto',
  templateUrl: './create-producto.component.html',
  styleUrls: ['./create-producto.component.css'],
})
export class CreateProductoComponent {
  public producto: any = {};
  public file: any = undefined;
  public imgSelect: any | ArrayBuffer = 'assets/img/01.jpg';
  public token;

  constructor(
    private _productoServece: ProductoService,
    private _adminService: AdminService
  ) {
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {}

  registro(registroForm: NgForm) {
    if (registroForm.valid) {
      console.log(this.producto);

      this._productoServece
        .registro_producto_admin(this.producto, this.file, this.token)
        .subscribe(
          (Response) => {
            console.log(Response);
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
