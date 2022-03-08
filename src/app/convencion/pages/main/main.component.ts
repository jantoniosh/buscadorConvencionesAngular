import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';
import { environment } from 'src/environments/environment';
import { faFacebook, faTwitter, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
    selector: 'app-main',
    templateUrl: './main.component.html'
})
export class MainComponent implements OnInit {

    private url: string = environment.urlContenido;
    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faLinkedin = faLinkedin;
    rutaCEDAW: string = "";
    rutaBDP: string = "";

    portadaBelemSrc: string = "assets/files/bdp/thumb/bdpportadathumb.jpg";
    portadaBelemAlt: string = "portada uno";
    portadaCedawSrc: string = "assets/files/cedaw/thumb/cedawportadathumb.jpg";
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

    fuentes: string[] = [
        '· Recomendaciones generales emitidas por el Comité <span class="versalitas">cedaw</span>',
        '· Resoluciones emitidas por la <span class="versalitas">corteidh</span> con fundamento en la Convención de Belém do pará',
        '· Opiniones Consultivas emitidas por la <span class="versalitas">corteidh</span> vinculadas a la aplicación de la Convención de Belém do pará',
        '· Sentencias y resoluciones de Fondo de la <span class="versalitas">corteidh</span> vinculadas a la aplicación de la Convención de Belém do pará',
        '· Recomendaciones emitidas por la <span class="versalitas">cidh</span> a México con base en la aplicación de la Convención de Belém do pará'
    ];

    fuentesSecundarias: string[] = [
        '· Observaciones finales sobre los informes periódicos presentados por México ante el Comité <span class="versalitas">cedaw</span> (<span class="versalitas">cocedaw</span>)',
        '· Decisiones emitidas por el <span class="versalitas">cocedaw</span> en casos individuales, con base en el Protocolo',
        '· Facultativo de la <span class="versalitas">cedaw</span>y en las recomendacionesemitidas por el Consejo de Derechos Humanos, mediante el Examen Periódico Universal (<span class="versalitas">epu</span>)',
        '· Informes especiales sobre la situación de los derechos humanos de las mujeres publicados por la <span class="versalitas">cidh</span>',
        '· Otros informes temáticos publicados por la <span class="versalitas">cidh</span> relacionados con los derechos humanos de las mujeres',
        '· Observaciones generales de diversos comités de la <span class="versalitas">onu</span> que hayan incluido disposiciones de la <span class="versalitas">cedaw</span>',
        '· Grupo de trabajo de mujeres y niñas de la <span class="versalitas">onu</span>',
        '· Comité de expertas del <span class="versalitas">mesecvi</span>'
    ];


    secciones: Seccion[] = [
        {
            titulo: 'Recomendaciones de la semana',
            detalle: true,
            color: 'Azul',
            noElementos: 4,
            boton: true,
            entradas: [],
            descripcion: ['En este apartado proponemos contenidos para abundar, desde diferentes ángulos, en el conocimiento de las Convenciones CEDAW y Belém do pará: audios, carteles, infografías.',
                'Si deseas profundizar en los recursos que derivan de la investigación en torno a la jurisprudencia internacional sensible al género, te invitamos a visitar esta sección y contribuir a la <em>Justicia para las mujeres</em>.'
            ]
        },
        {
            titulo: 'Fichas Temáticas',
            detalle: true,
            color: 'Verde',
            noElementos: 4,
            boton: true,
            entradas: [],
            descripcion: []
        },
        {
            titulo: 'Podcasts',
            detalle: true,
            color: 'Morado',
            noElementos: 4,
            boton: true,
            entradas: [],
            descripcion: []
        },
    ];

    constructor(private entradaService: EntradaService) { }

    ngOnInit(): void {
        this.rutaCEDAW = `${this.url}/assets/files/cedaw/cedaw.pdf`;
        this.rutaBDP = `${this.url}/assets/files/dbp/belemdopara.pdf`;
        const observerEntrada = {
            next: (entradas: Entrada[]) => {
                this.secciones.map(seccion => {
                    seccion.entradas = [];
                });
                this.secciones[0].entradas = [];
                this.secciones[0].entradas = this.fisherYatesShuffle(entradas);
                entradas.map(entrada => {
                    if (entrada.tipo.includes("Ficha")) {
                        this.secciones[1].entradas.push(entrada);
                    }
                    if (entrada.tipo.includes("Podcast")) {
                        this.secciones[2].entradas.push(entrada);
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

        // const observerFuentes = {
        //     next: (fuentes: Fuentes[]) => {
        //         this.fuentes = [];
        //         this.fuentes = fuentes;
        //     },
        //     error: (err: Error) => {
        //         this.fuentes = [];
        //     }
        // }
        // this.entradaService.getFuentes().subscribe(observerFuentes);
    }

    getLigaEtiqueta(etiqueta: string): string {
        return `/etiqueta/${etiqueta}`
    }

    getLigaFuente(fuente: string): string {
        return `/fuente/${fuente}`
    }

    randombetween(min: number, max: number): number {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    fisherYatesShuffle(arr: Entrada[]): Entrada[] {
        let arrayAux = arr;
        for (let i = arrayAux.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [arrayAux[i], arrayAux[j]] = [arrayAux[j], arrayAux[i]];
        }
        return arrayAux
    }
}
