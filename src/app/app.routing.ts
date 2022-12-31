import { Routes, RouterModule } from "@angular/router";
import { Component, ModuleWithProviders } from "@angular/core";
import { InicioComponent } from "./components/inicio/inicio.component";
import { LoginComponent } from "./components/login/login.component";

import { AdminGuard } from "./guards/admin.guard";
import { IndexClienteComponent } from "./components/clientes/index-cliente/index-cliente.component";
import { CreateClienteComponent } from "./components/clientes/create-cliente/create-cliente.component";
import { EditClienteComponent } from "./components/edit-cliente/edit-cliente.component";
import { CreateProductoComponent } from "./components/productos/create-producto/create-producto.component";
import { IndexProductoComponent } from "./components/productos/index-producto/index-producto.component";

const appRoute : Routes = [
{ path: '', component: InicioComponent, canActivate: [AdminGuard]},


{path: 'panel', children: [

 {path: 'clientes', component: IndexClienteComponent, canActivate: [AdminGuard]},
 {path: 'clientes/create', component: CreateClienteComponent, canActivate: [AdminGuard]},
 {path: 'clientes/:id', component: EditClienteComponent, canActivate: [AdminGuard]},
 {path: 'productos/create', component: CreateProductoComponent, canActivate: [AdminGuard]},
 {path: 'productos', component: IndexProductoComponent, canActivate: [AdminGuard]},
 

]},

{ path: 'login', component: LoginComponent }
]

export const appRoutingPorviders: any[]=[];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoute);
