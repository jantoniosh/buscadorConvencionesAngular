import { Component, EventEmitter, Output } from '@angular/core';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { LinksMenu } from '../../interfaces/links-menu';

@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html'
})
export class BuscarComponent {
    
    menu: boolean = false;
    sonido = faVolumeUp;

    links: LinksMenu[] = [
        {
            texto: "Inicio",
            liga: "/"
        },
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
