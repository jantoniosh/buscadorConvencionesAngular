import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';
import { Etiquetas } from '../../interfaces/etiquetas.interface';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

    portadaBelemSrc: string = "assets/images/portadauno.png";
    portadaBelemAlt: string = "portada uno";
    portadaCedawSrc: string = "assets/images/portadados.png";
    portadaCedawAlt: string = "portada dos";
    descargarSrc: string = "assets/images/descargar.png";
    descargarAlt: string = "descargar";
    compartirSrc: string = "assets/images/compartir.png";
    compartirAlt: string = "compartir";
    verSrc: string = "assets/images/ver.png";
    verAlt: string = "compartir";

    randomN: number[] = []

    etiquetas: string[] = [
        'Aborto',
        'Accesibilidad',
        'AccionesAfirmativas',
        'AcosoSexual',
        'AdultasMayores',
        'Discriminación',
        'DiscriminacionContraLaMujer',
        'GarantizarIgualdadDeLasMujeres',
        'Igualdad',
        'Justicia',
        'MujeresConDiscapacidad',
        'MujeresRurales',
        'NoDiscriminacion',
        'Prevencion',
        'Progresividad',
        'Proteccion',
        'Reparacion',
        'RolesDeGenero',
        'SaludSexualYReproductiva',
        'SexoYGenero',
        'TrabajosDeCuidados',
        'Violencia'
    ];

    secciones: Seccion[] = [
        {
            titulo: 'Conoce más',
            detalle: true,
            color: 'Azul',
            noElementos: 4,
            boton: false,
            entradas: [],
            descripcion: ['En este apartado proponemos contenidos para abundar, desde diferentes ángulos, en el conocimiento de las Convenciones CEDAW y Belém do Pará: audios, carteles, infografías.',
                'Si deseas profundizar en los recursos que derivan de la investigación en torno a la jurisprudencia internacional sensible al género, te invitamos a visitar esta sección y contribuir a la <em>Justicia para las mujeres</em>.'
            ]
        },
        {
            titulo: 'Infográficos',
            detalle: true,
            color: 'Verde',
            noElementos: 4,
            boton: true,
            entradas: [],
            descripcion: []
        },
    ];

    constructor(private entradaService: EntradaService) { }

    ngOnInit(): void {

        const observerEntrada = {
            next: (entradas: Entrada[]) => {
                this.secciones.map(seccion => {
                    seccion.entradas = [];
                });
                this.secciones[0].entradas = [];
                this.randomN = [];
                for (let i = 0; i < 4; i++) {
                    this.secciones[0].entradas.push(entradas[Math.floor(Math.random() * entradas.length)]);
                }
                entradas.map(entrada => {
                    if (entrada.tipo.includes("Infográficos")) {
                        this.secciones[1].entradas.push(entrada);
                    }
                });
            },
            error: (err: Error) => {
                this.secciones.map(seccion => {
                    seccion.entradas = []
                });
            }
        }
        this.entradaService.getEntradas().subscribe(observerEntrada);
    }

    getLigaEtiqueta(etiqueta: string) {
        return `/etiqueta/${etiqueta}`
    }

    randombetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }
}
