import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-belem',
    templateUrl: './belem.component.html'
})
export class BelemComponent implements OnInit {

    clase: string = "block-top-content belem convencion";
    titulo: string = "Belém do Pará";
    subtitulo: string = "Convención Interamericana para Prevenir, Sancionar y Erradicar la Violencia contra la Mujer";
    imagenUrl: string = "assets/images/portadauno.png";
    imagenAlt: string = "portada uno";
    descripcion: string = "La Convención de Belém do Pará, establece por primera vez el derecho de las mujeres a vivir una vida libre de violencia. Este tratado interamericano de derechos humanos ha dado pauta para la adopción de leyes y políticas sobre prevención, erradicación y sanción de la violencia contra las mujeres en los Estados Parte de la Convención."
    convencion: string = "Belém do Pará";

    secciones: Seccion[] = [
        {
            titulo: 'Fichas',
            detalle: false,
            color: 'Verde',
            noElementos: 4,
            boton: true,
            entradas: []
        },
        {
            titulo: 'Podcasts',
            color: 'Morado',
            detalle: false,
            noElementos: 4,
            boton: true,
            entradas: []
        },
        {
            titulo: 'Infografías',
            detalle: false,
            color: 'Azul',
            noElementos: 4,
            boton: true,
            entradas: []
        }
    ];

    constructor(private entradaService: EntradaService) { }

    ngOnInit(): void {
        const observerEntrada0 = {
            next: (entradas: Entrada[]) => {
                this.secciones[0].entradas = entradas;
            },
            error: (err: Error) => {
                this.secciones[0].entradas = [];
            }
        }
        // this.entradaService.buscarFichas(this.convencion)
        //     .subscribe(observerEntrada0);

        const observerEntrada1 = {
            next: (entradas: Entrada[]) => {
                this.secciones[1].entradas = entradas;
            },
            error: (err: Error) => {
                this.secciones[1].entradas = [];
            }
        }
        // this.entradaService.buscarPodcasts(this.convencion)
        //     .subscribe(observerEntrada1);

        const observerEntrada2 = {
            next: (entradas: Entrada[]) => {
                this.secciones[2].entradas = entradas;
            },
            error: (err: Error) => {
                this.secciones[2].entradas = [];
            }
        }
        // this.entradaService.buscarInfografias(this.convencion)
        //     .subscribe(observerEntrada2);
    }

}
