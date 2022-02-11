import { Component, OnInit } from '@angular/core';
import { faWindowClose } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-sidebarmenu',
    templateUrl: './sidebarmenu.component.html'
})
export class SidebarmenuComponent implements OnInit {
    faWindowClose = faWindowClose;
    activo: boolean = false;
    titulo: string= "";
    constructor() { }

    ngOnInit(): void {
        // this.activo = false;
    }

    buscar(termino: string) {
        this.titulo = termino;
        this.activo = true;
    }

    ocultar() {
        this.activo = false;
    }
}
