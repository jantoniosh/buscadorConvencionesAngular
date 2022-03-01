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
    descripciones: string[] = [
        `La Convención Interamericana para Prevenir, Sancionar y Erradicar la Violencia en Contra de la Mujer, firmada en Belém do Pará, Brasil, el 9 de junio de 1994, en la Asamblea General de la Organización de los Estados Americanos y entró en vigor el 3 de mayo de 1995 y ha sido ratificada por 32 Estados de la Organización de Estados Americanos (OEA).`,
        `La Convención de Belém do Pará reconoce que la violencia en contra de las mujeres constituye una violación a los derechos humanos, ya que limita el goce y ejercicio de los derechos y las libertades de las mujeres. Distingue tres tipos de violencia: física, sexual y psicológica que padecen las mujeres, tanto en su vida privada como en la pública, ya sea perpetrada y/o tolerada por el Estado. Condena todas las formas de violencia en contra de las mujeres e insta a cada país a impulsar, sin dilación, los cambios legales y las políticas públicas necesarias para prevenirla, sancionarla y erradicarla.`
    ];
    archivo: string = 'assets/files/bdp/belemdopara.pdf';
    convencion: string = "Belém do Pará";

    secciones: Seccion[] = [
        {
            titulo: 'Artículos',
            detalle: false,
            color: 'Verde',
            noElementos: 4,
            boton: true,
            entradas: [],
            descripcion: []
        },
        {
            titulo: 'Podcasts',
            color: 'Morado',
            detalle: false,
            noElementos: 4,
            boton: true,
            entradas: [],
            descripcion: []
        },
        {
            titulo: 'Infografías',
            detalle: false,
            color: 'Azul',
            noElementos: 4,
            boton: true,
            entradas: [],
            descripcion: []
        }
    ];

    constructor(private entradaService: EntradaService) { }

    ngOnInit(): void {
        const observerEntrada = {
            next: (entradas: Entrada[]) => {
                this.secciones.map(seccion => {
                    seccion.entradas = []
                });
                entradas.map(entrada => {
                    if (entrada.convencion.includes("BDP")) {
                        if ("Artículo".indexOf(entrada.tipo) === 0) {
                            this.secciones[0].entradas.push(entrada);
                        }
                        else if ("Podcast".indexOf(entrada.tipo) === 0) {
                            this.secciones[1].entradas.push(entrada);
                        }
                        else if (entrada.tipo.includes("Infográfico")) {
                            this.secciones[2].entradas.push(entrada);
                        }
                    }
                });
            },
            error: (err: Error) => {
                this.secciones[0].entradas = [];
            }
        }
        this.entradaService.getEntradas().subscribe(observerEntrada);
    }

}
