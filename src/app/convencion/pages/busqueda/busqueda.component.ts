import { Component, OnInit } from '@angular/core';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'app-busqueda',
    templateUrl: './busqueda.component.html'
})
export class BusquedaComponent implements OnInit {

    seccion: Seccion = {
        titulo: 'Resultados',
        detalle: true,
        color: 'Verde',
        noElementos: 4,
        boton: true,
        entradas: [],
        descripcion: []
    };
    titulo: string = "";
    etiquetas: string[] = [];
    fuentes: string[] = [];

    constructor(private entradaService: EntradaService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                this.seccion.entradas = [];
                this.titulo = params["tema"];
                // let etiquetas: string[] = params["etiquetas"];
                // let fuentes: string[] = params["fuentes"];
                const observerEntrada = {
                    next: (entradas: Entrada[]) => {
                        // entradas.map(entrada => {
                        //     let correcto: boolean = true;
                        //     this.etiquetas = [];
                        //     this.fuentes = [];
                        //     if (etiquetas != undefined) {
                        //         etiquetas.map(etiqueta => {
                        //             if (entrada.etiquetas.indexOf(etiqueta) == -1) {
                        //                 correcto = false;
                        //             }
                        //             console.log(correcto);
                        //         });
                        //     }
                        //     if (fuentes != undefined) {
                        //         fuentes.map(fuente => {
                        //             if (entrada.organismos.indexOf(fuente) == -1 || entrada.tipoDisposicion.indexOf(fuente) == -1) {
                        //                 correcto = false;
                        //             }
                        //         });
                        //     }
                        //     if (correcto) {
                        //         this.seccion.entradas.push(entrada);
                        //     }
                        // });
                        this.seccion.entradas = entradas;
                        if (this.seccion.entradas.length > 0) {
                            this.seccion.titulo = `Resultados de: ${this.titulo}`;
                            this.seccion.entradas.map(entrada => {
                                entrada.etiquetas.split("|").map(etiqueta => {
                                    this.etiquetas.push(etiqueta.replace(/\s/g, '').replace('#', ''));
                                });
                                this.etiquetas = this.etiquetas.filter(Boolean);
                                this.etiquetas = [... new Set(this.etiquetas)];
                                entrada.organismos.split(",").map(organismo => {
                                    this.fuentes.push(organismo.replace(/\s/g, ''));
                                });
                                entrada.tipoDisposicion.split(",").map(disposicion => {
                                    this.fuentes.push(disposicion.replace(/\s/g, ''));
                                });
                                this.fuentes = this.fuentes.filter(Boolean);
                                this.fuentes = [... new Set(this.fuentes)];
                            });
                        }
                        else {
                            this.seccion.titulo = `No se encontraron resultados para: ${this.titulo}`;
                        }

                    },
                    error: (err: Error) => {
                        this.seccion.entradas = [];
                        this.seccion.titulo = `No se encontraron resultados para: ${this.titulo}`;
                    }
                }
                this.entradaService.getBusqueda(this.titulo).subscribe(observerEntrada);
            }
            );
    }

    getLigaEtiqueta(etiqueta: string): string {
        return `/etiqueta/${etiqueta}`
    }

    getLigaFuente(fuente: string): string {
        return `/fuente/${fuente}`
    }
}
