import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var iziToast: any;

@Component({
  selector: 'app-edit-cliente',
  templateUrl: './edit-cliente.component.html',
  styleUrls: ['./edit-cliente.component.css']
})
export class EditClienteComponent {

 public cliente: any = {};
 public user: any = {};
 public id =0;
 public token;

 constructor(
  private _router: ActivatedRoute,
  private _clienteService: ClienteService,
  private _adminService: AdminService,
  private _route: Router
 
 ){
  this.token = this._adminService.getToken();
 }

 ngOnInit(): void {
  this._router.params.subscribe(
    params => {
      this.id = params['id'];
      console.log('id del cliente');
      console.log(this.id);
      this._clienteService.obtener_cliente_admin(this.id, this.token).subscribe(
        response => {
          
          this.user = response;
          if(this.user.data == undefined){
              this.cliente = undefined;
          } else {
            this.cliente = this.user.data;
          }
          
          
        },
        error =>{
          console.log(error);
        }
      )
    }
  );
 }

 actulizar(updateForm: NgForm){
  if(updateForm.valid){
     this._clienteService.actualizar_cliente_admin(this.id, this.cliente, this.token).subscribe(
      response => {
        iziToast.show({
          title: 'SUCCESS',
          titleColor: '#1DC74C',
          color: '#FFF',
          class: 'text-success',
          position: 'topRight',
          message: 'Se actulizo correctamente.'
  });
  this._route.navigate(['/panel/clientes']);
        
      },
      error => {
        console.log(error);
      }
     );
  }else {
    iziToast.show({
      title: 'ERROR',
      titleColor: 'red',
      color: 'danger',
      class: 'text-danger',
      position: 'topRight',
      message: 'Error en el registro'
})
  }

 }



}
