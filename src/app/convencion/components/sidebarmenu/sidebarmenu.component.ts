import { Component } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sidebarmenu',
    templateUrl: './sidebarmenu.component.html'
})
export class SidebarmenuComponent {
    faWindowClose = faWindowClose;
    activo: boolean = false;
    titulo: string = "";
    constructor() { }

    buscar(termino: any) {
        this.titulo = termino;
        this.activo = true;
    }

    ocultar() {
        this.activo = false;
    }
}
