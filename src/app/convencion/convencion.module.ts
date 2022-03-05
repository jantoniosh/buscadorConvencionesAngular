import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ShareButtonsModule } from 'ngx-sharebuttons/buttons';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { MainComponent } from './pages/main/main.component';
import { BelemComponent } from './pages/belem/belem.component';
import { CedawComponent } from './pages/cedaw/cedaw.component';
import { DescripcionConvencionComponent } from './components/descripcion-convencion/descripcion-convencion.component';
import { MostrarMaterialesComponent } from './components/mostrar-materiales/mostrar-materiales.component';
import { ErrorComponent } from './pages/error/error.component';
import { HomeComponent } from './components/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EntradaComponent } from './pages/entrada/entrada.component';
import { BuscarComponent } from './components/buscar/buscar.component';
import { CategoriaComponent } from './pages/categoria/categoria.component';
import { CreditosComponent } from './pages/creditos/creditos.component';
import { SidebarmenuComponent } from './components/sidebarmenu/sidebarmenu.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatSliderModule } from '@angular/material/slider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatChipsModule } from '@angular/material/chips';
import { MatIconModule } from '@angular/material/icon';
import { BuscadorComponent } from './components/buscador/buscador.component';
import { EtiquetaComponent } from './pages/etiqueta/etiqueta.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { FuentesComponent } from './pages/fuentes/fuentes.component';
import { LightboxComponent } from './pages/lightbox/lightbox.component';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    MainComponent,
    BelemComponent,
    CedawComponent,
    DescripcionConvencionComponent,
    MostrarMaterialesComponent,
    ErrorComponent,
    HomeComponent,
    EntradaComponent,
    BuscarComponent,
    CategoriaComponent,
    CreditosComponent,
    SidebarmenuComponent,
    BuscadorComponent,
    EtiquetaComponent,
    BusquedaComponent,
    FuentesComponent,
    LightboxComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    FontAwesomeModule,
    MatSliderModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatChipsModule,
    MatIconModule,
    ShareButtonsModule,
  ],
  exports: [
    HomeComponent
  ]
})
export class ConvencionModule { }
