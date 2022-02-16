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

    // etiquetas: Etiquetas[] = [];

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

    seccion: Seccion = {
        titulo: 'Sugerencias semanales',
        detalle: true,
        color: 'Azul',
        noElementos: 4,
        boton: false,
        entradas: []
    };

    constructor(private entradaService: EntradaService) { }

    ngOnInit(): void {
        const observerEntrada = {
            next: (entradas: Entrada[]) => {
                this.seccion.entradas = entradas;
            },
            error: (err: Error) => {
                this.seccion.entradas = [];
            }
        }
        this.entradaService.getEntradas().subscribe(observerEntrada);

        // const observerEtiquetas = {
        //     next: (etiquetas: Etiquetas[]) => {
        //         console.log(etiquetas);
        //         this.etiquetas = etiquetas;
        //     },
        //     error: (err: Error) => {
        //         this.etiquetas = [];
        //     }
        // }
        // this.entradaService.getEtiquetas().subscribe(observerEtiquetas);
    }

    getLigaEtiqueta(etiqueta: string) {
        return `/etiqueta/${etiqueta}`
    }
}
