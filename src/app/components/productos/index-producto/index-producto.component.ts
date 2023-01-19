import { Component } from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent {

  public token;
  public filtro_titulo = null;
  public producto : any;
  public productos : any;
  public page = 1;

  constructor(
    private _productoServece: ProductoService,
    private _adminService: AdminService
  ) {
    this.token = _adminService.getToken();
  }

  ngOnInit(): void {

    this.filtro_buscar();
    
  }
  
  eliminar(id: any){
    
  }

  filtro_buscar(){
    this._productoServece.listar_producto_admin(this.filtro_titulo, this.token).subscribe(
      Response =>{
       
      console.log(Response);
      this.productos = Response;
      this.producto = Object.values(this.productos.data);
       
      },
      error=>{
        console.log(error);
      }
     )

  }
}
