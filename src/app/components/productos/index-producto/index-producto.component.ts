import { Component , OnInit} from '@angular/core';
import { AdminService } from 'src/app/services/admin.service';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
import { Workbook } from 'exceljs';
import * as fs from 'file-saver';
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
  public array_productos : Array<any> =[];
  public array_exportable : Array<any> =[];
  public page = 1;
  public url;
  constructor(
    private _productoServece: ProductoService,
    private _adminService: AdminService
  ) {
    this.token = _adminService.getToken();
    this.url = GLOBAL.url;
  }

  ngOnInit(): void {

    this.filtro_buscar();
    
  }
  
  eliminar(id: any){
    
  }

  filtro_buscar(){
    this._productoServece.listar_producto_admin(this.filtro_titulo, this.token).subscribe(
      Response =>{
        this.array_productos = ['1','2']
      console.log(Response);
      this.productos = Response;
      this.producto = Object.values(this.productos.data);
      
      for (let index = 0; index < this.producto.length; index++) {
         
            this.array_productos.push({
              titulo: this.producto[index].titulo,
              stock: this.producto[index].stock,
              precio: this.producto[index].precio,
              categoria: this.producto[index].categoria,
              nventas: this.producto[index].nventas
            } )
      }
      console.log('array para exportar');
      console.log(this.array_productos);
      },
      error=>{
        console.log(error);
      }
     )

  }

  descargar_excel(){
    let workbook = new Workbook();
    let worksheet = workbook.addWorksheet("Reporte de Productos");
    worksheet.addRow(undefined);
    for (let x1 of this.array_productos){
      let x2 =Object.keys(x1);
      let temp = [];
      for(let y of x2){
        temp.push(x1[y]);
      }
      worksheet.addRow(temp);
    }
    let fname='REPO1- ';

    worksheet.columns = [
      {header: 'Producto', key: 'col1', with: 30 },
      {header: 'stock', key: 'col2', with: 30 },
      {header: 'precio', key: 'col3', with: 30 },
      {header: 'categoria', key: 'col3', with: 30 },
      {header: 'No de ventas', key: 'col3', with: 30 }
    ] as any;

    workbook.xlsx.writeBuffer().then((data) =>{
      let blob = new Blob([data], {type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'});
      fs.saveAs(blob, fname+'-'+new Date().valueOf()+'.xlsx');
    });
  }
}
