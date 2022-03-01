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
            texto: "Artículos",
            liga: "/categoria/articulo"
        },
        {
            texto: "Podcasts",
            liga: "/categoria/podcast"
        },
        {
            texto: "Infográficos",
            liga: "/categoria/infografico"
        }
    ]

    theHtmlString: string = `<em><fa-icon [icon]="sonido"></fa-icon> Casos</em>`;

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
