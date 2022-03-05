import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BelemComponent } from './convencion/pages/belem/belem.component';
import { CategoriaComponent } from './convencion/pages/categoria/categoria.component';
import { CedawComponent } from './convencion/pages/cedaw/cedaw.component';
import { EntradaComponent } from './convencion/pages/entrada/entrada.component';
import { MainComponent } from './convencion/pages/main/main.component';
import { CreditosComponent } from './convencion/pages/creditos/creditos.component';
import { EtiquetaComponent } from './convencion/pages/etiqueta/etiqueta.component';
import { BusquedaComponent } from './convencion/pages/busqueda/busqueda.component';
import { FuentesComponent } from './convencion/pages/fuentes/fuentes.component';
import { LightboxComponent } from './convencion/pages/lightbox/lightbox.component';

const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        pathMatch: 'full'
    },
    {
        path: 'belem-do-para',
        component: BelemComponent
    },
    {
        path: 'cedaw',
        component: CedawComponent
    },
    {
        path: 'categoria/:slug',
        component: CategoriaComponent
    },
    {
        path: 'podcast/:slug',
        component: EntradaComponent
    },
    {
        path: 'articulo/:slug',
        component: EntradaComponent
    },
    {
        path: 'ficha/:slug',
        component: EntradaComponent
    },
    {
        path: 'creditos',
        component: CreditosComponent
    },
    {
        path: 'busqueda',
        component: BusquedaComponent
    },
    {
        path: 'etiqueta/:slug',
        component: EtiquetaComponent
    },
    {
        path: 'fuente/:slug',
        component: FuentesComponent
    },
    {
        path: 'lightbox',
        component: LightboxComponent
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
