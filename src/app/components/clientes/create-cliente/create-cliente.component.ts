import { Component } from '@angular/core';
// siempre hay que importar el NgForm para poder trabajar con el fumulario
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';
declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent {

  public cliente: any = {};
  public token: any = '';
   
  constructor(
    private _clienteService: ClienteService,
    private _adminService: AdminService,
    private _router: Router
  ){
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {

  }

  resgistro(registroForm: NgForm ){
    if(registroForm.valid){

      this._clienteService.registro_cliente_admin(this.cliente,this.token).subscribe(
        response=>{
          iziToast.show({
            title: 'SUCCESS',
            titleColor: '#1DC74C',
            color: '#FFF',
            class: 'text-success',
            position: 'topRight',
            message: 'Se registro correctamente.'
    });

     this.cliente= {
      genero: '',
      nombres: '',
      apallidos: '',
      f_nacimiento: '',
      telefono: '',
      dni: '',
      email: ''
     }

     this._router.navigate(['/panel/clientes']);

        },
        error=>{
          console.log(error);
        }
      )

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
