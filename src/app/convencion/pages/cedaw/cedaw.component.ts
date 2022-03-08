import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-cedaw',
    templateUrl: './cedaw.component.html'
})
export class CedawComponent implements OnInit {
    clase: string = "block-top-content cedaw convencion";
    titulo: string = "CEDAW";
    subtitulo: string = "Convención Interamericana para Prevenir, Sancionar y Erradicar la Violencia contra la Mujer";
    imagenUrl: string = "assets/files/cedaw/thumb/cedawportada.jpg";
    imagenAlt: string = "portada dos";
    descripciones: string[] = [`La Convención sobre la Eliminación de todas las formas de Discriminación contra la Mujer es la carta internacional por los derechos de las mujeres, adoptada por unanimidad en la Asamblea General de las Naciones Unidas el 18 de diciembre de 1979.`,
        `Entró en vigor en 1981 y ha sido ratificada por 188 países, por lo que se trata del segundo instrumento internacional más ratificado, después de la Convención sobre los Derechos de la Niñez, por los Estados pertenecientes a la Organización de las Naciones Unidas.`,
        `Su ratificación implica el compromiso de cada país para reconocer todas aquellas expresiones que discriminan a las mujeres y adoptar las medidas necesarias y  urgentes para garantizar la igualdad sustantiva, a través de reformas a marcos jurídicos nacionales, institucionales, de política pública, y decisiones judiciales, que incorporen la perspectiva de género, a fin de acelerar y hacer realidad los cambios sociales y culturales para eliminar los prejuicios y estereotipos con los que se discrimina a las mujeres.`,
        `Su aplicación es supervisada por un Comité integrado por 23 personas independientes y  expertas en derechos de las mujeres de todo el mundo. `
    ];
    archivo: string = 'assets/files/cedaw/cedaw.pdf';
    convencion: string = "CEDAW";

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
            titulo: 'Fichas',
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
                    if (entrada.convencion.includes("CEDAW")) {
                        if ("Artículo".indexOf(entrada.tipo) >= 0) {
                            this.secciones[0].entradas.push(entrada);
                        }
                        else if ("Podcast".indexOf(entrada.tipo) >= 0) {
                            this.secciones[1].entradas.push(entrada);
                        }
                        else if ("Ficha".indexOf(entrada.tipo) >= 0) {
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
