import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { LinksMenu } from '../../interfaces/links-menu';
import { Entrada } from '../../interfaces/entrada.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-buscar',
    templateUrl: './buscar.component.html'
})
export class BuscarComponent implements OnInit {

    menu: boolean = false;
    sonido = faVolumeUp;
    entradasBelem: Entrada[] = [];
    entradasCedaw: Entrada[] = [];
    entradasPodcast: Entrada[] = [];
    entradasFichero: Entrada[] = [];

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
                    else if ("Infográfico".indexOf(entrada.tipo) === 0) {
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
