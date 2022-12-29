import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from "@angular/forms";
import { HttpClient, HttpClientModule } from "@angular/common/http";
import { RouterModule } from '@angular/router';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { routing } from "./app.routing";
import { InicioComponent } from './components/inicio/inicio.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginComponent } from './components/login/login.component';
import { AdminService } from './services/admin.service';
import { IndexClienteComponent } from './components/clientes/index-cliente/index-cliente.component';
import { NgxPaginationModule } from "ngx-pagination";
import { CreateClienteComponent } from './components/clientes/create-cliente/create-cliente.component';
import { EditClienteComponent } from './components/edit-cliente/edit-cliente.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    SidebarComponent,
    LoginComponent,
    IndexClienteComponent,
    CreateClienteComponent,
    EditClienteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    RouterModule,
    routing
  ],
  providers: [AdminService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
