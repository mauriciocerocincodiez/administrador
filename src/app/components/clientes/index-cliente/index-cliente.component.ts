import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-index-cliente',
  templateUrl: './index-cliente.component.html',
  styleUrls: ['./index-cliente.component.css']
})
export class IndexClienteComponent {

  public clientes : any = {};
  public cliente : Array<any>=[];
  public filtro_apellidos = '';
  public filtro_correo = '';
  public page = 1;
  public token;



  constructor( 
    private _clienteService: ClienteService,
    private _adminService: AdminService
    ){
    this.token = this._adminService.getToken();
    console.log(this.token);
  }



  ngOnInit(): void{
   this.init_data()
  }


 
  filtro(tipo: string){
    if (tipo == 'apellidos'){
      if (this.filtro_apellidos){
      this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_apellidos, this.token).subscribe(
        Response =>{
         
          this.clientes = Response;
          this.cliente = Object.values(this.clientes.data);
        },
        error=>{
          console.log(error);
        }
       )
      
      } 
     } else   if (tipo == 'correo'){
      if (this.filtro_correo){
      this._clienteService.listar_clientes_filtro_admin(tipo, this.filtro_correo,this.token).subscribe(
        Response =>{
         
          this.clientes = Response;
          this.cliente = Object.values(this.clientes.data);
        },
        error=>{
          console.log(error);
        }
       )
      
      } 
     } else {
      this.init_data();
     }
    


   }

   init_data(){


    this._clienteService.listar_clientes_filtro_admin(null , null,this.token).subscribe(
      Response =>{
       
        this.clientes = Response;
        this.cliente = Object.values(this.clientes.data);
       
      },
      error=>{
        console.log(error);
      }
     )
     
  }

}
