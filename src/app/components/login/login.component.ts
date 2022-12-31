import { Component, OnInit } from '@angular/core';
// sin importar el NgForm no funciona el envio del formulario
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
declare var jQuery: any;
declare var $: any;
declare var iziToast: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  public user: any = {};
  public usuario: any = {};
  public token: any = '';

  constructor(private _adminService: AdminService, private _router: Router) {
    this.token = this._adminService.getToken();
  }

  ngOnInit(): void {
    if (this.token) {
      this._router.navigate(['']);
    } else {
      // MANTENER EN EL COMPONENTE
    }
  }

  login(form: NgForm) {
    const email = form.value.email;
    const password = form.value.password;

    let data = {
      email: email,
      password: password,
    };

    let data2 = {};

    this._adminService.login_admin(data).subscribe(
      (response) => {
        this.user = response;

        if (this.user.data == undefined) {
          iziToast.show({
            title: 'ERROR',
            titleColor: 'red',
            color: 'danger',
            class: 'text-danger',
            position: 'topRight',
            message: this.user.message,
          });
        } else {
          // SE CREA LOS DATOS Y EL TOKEN PARA MANTENER LA SESION INICIADA
          this.usuario = this.user.data;
          localStorage.setItem('token', this.user.token);
          localStorage.setItem('_id', this.user.data._id);

          this._router.navigate(['']);
        }
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
