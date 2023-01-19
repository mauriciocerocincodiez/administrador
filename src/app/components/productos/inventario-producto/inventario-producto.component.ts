import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent {
  public producto : any;
  public productos : any;
  public token;
  public id: any;

  constructor(
    private _adminService: AdminService,
    private _router: Router,
    private _route: ActivatedRoute,
    private _productoServece: ProductoService
  ) {
    this.token = _adminService.getToken();
  }
  
  ngOnInit(): void {
    this._route.params.subscribe(
      params => {
        this.id = params['id'];
        console.log('id del producto');
        console.log(this.id);
        this._productoServece.obtener_inventario_admin(this.id, this.token).subscribe(
          response => {
            
            this.productos = response;
            this.producto = Object.values(this.productos.data);
            console.log('datos');
            console.log(this.producto);

          },
          error => {
            console.log(error);
          }
        );
      }
    );
   }
  






}
