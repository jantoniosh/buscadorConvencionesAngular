import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { LinksMenu } from '../../interfaces/links-menu';

@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {

    @Output() onBuscar: EventEmitter<string> = new EventEmitter();

    titulo = new FormControl('');
    busqueda: boolean = false;
    menu: boolean = false;

    links: LinksMenu[] = [
        {
            texto: "Belém do Pará",
            liga: "/belem-do-para"
        },
        {
            texto: "CEDAW",
            liga: "/cedaw"
        },
        {
            texto: "Fichas",
            liga: "/categoria/ficha"
        },
        {
            texto: "Podcasts",
            liga: "/categoria/podcast"
        },
        {
            texto: "Infografías",
            liga: "/categoria/infografia"
        }
    ]

    constructor() { }

    ngOnInit(): void {
    }

    buscar() {
        this.onBuscar.emit(this.titulo.value);
    }

    reset() {
        this.busqueda = false;
    }

    mostrarMenu() {
        this.menu = !this.menu;
        const bodyElement = document.body;
        if (bodyElement) {
            if (this.menu) {
                bodyElement.classList.add("menuactive");
            }
            else {
                bodyElement.classList.remove("menuactive");
            }
        }
    }
}
