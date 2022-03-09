import { Component, OnInit } from '@angular/core';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';
import { Entrada } from '../../interfaces/entrada.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {

    menu: boolean = false;
    angleDown = faAngleDown;
    entradasBelem: Entrada[] = [];
    entradasCedaw: Entrada[] = [];
    entradasPodcast: Entrada[] = [];
    entradasFichero: Entrada[] = [];
    urlBocina: string = "assets/images/bocina.svg";
    urlFicha: string = "assets/images/ficha.svg";
    belemMenu: boolean = false;
    cedawMenu: boolean = false;
    casosMenu: boolean = false;
    ficheroMenu: boolean = false;

    constructor(private entradaService: EntradaService) { }

    ngOnInit(): void {
        const observerEntrada = {
            next: (entradas: Entrada[]) => {
                this.entradasBelem = [];
                this.entradasCedaw = [];
                this.entradasPodcast = [];
                this.entradasFichero = [];
                entradas.map(entrada => {
                    if ("Artículo".indexOf(entrada.tipo) === 0) {
                        if (entrada.convencion.includes("BDP")) {
                            this.entradasBelem.push(entrada);
                        }
                        else if (entrada.convencion.includes("CEDAW")) {
                            this.entradasCedaw.push(entrada);
                        }
                    }
                    else if ("Podcast".indexOf(entrada.tipo) === 0) {
                        this.entradasPodcast.push(entrada);
                    }
                    else if ("Ficha".indexOf(entrada.tipo) === 0) {
                        this.entradasFichero.push(entrada);
                    }
                });
            },
            error: (err: Error) => {
                this.entradasBelem = [];
                this.entradasCedaw = [];
                this.entradasPodcast = [];
                this.entradasFichero = [];
            }
        }
        this.entradaService.getEntradas().subscribe(observerEntrada);
    }

    mostrarMenu(): void {
        const bodyElement = document.body;
        if (bodyElement) {
            bodyElement.classList.toggle("menuactive");
        }
        this.belemMenu = false;
        this.cedawMenu = false;
        this.casosMenu = false;
        this.ficheroMenu = false;
    }

    showBelem(): void {
        this.belemMenu = !this.belemMenu;
        this.cedawMenu = false;
        this.casosMenu = false;
        this.ficheroMenu = false;
    }

    showCedaw(): void {
        this.belemMenu = false;
        this.cedawMenu = !this.cedawMenu;
        this.casosMenu = false;
        this.ficheroMenu = false;
    }

    showCasos(): void {
        this.belemMenu = false;
        this.cedawMenu = false;
        this.casosMenu = !this.casosMenu;
        this.ficheroMenu = false;
    }

    showFichero(): void {
        this.belemMenu = false;
        this.cedawMenu = false;
        this.casosMenu = false;
        this.ficheroMenu = !this.ficheroMenu;
    }
}
