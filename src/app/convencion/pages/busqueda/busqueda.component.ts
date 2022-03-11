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

    constructor(private entradaService: EntradaService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.queryParams
            .subscribe(params => {
                this.seccion.entradas = [];
                this.titulo = params["tema"];
                const observerEntrada = {
                    next: (entradas: Entrada[]) => {
                        this.seccion.entradas = entradas;
                        if (this.seccion.entradas.length > 0) {
                            this.seccion.titulo = `Resultados de: ${this.titulo}`
                            this.seccion.entradas.map(entrada => {
                                console.log(entrada.etiquetas);
                                entrada.etiquetas.split("#").map(etiqueta => {
                                    console.log(etiqueta);
                                    this.etiquetas.push(etiqueta.replace(/\s/g, '').replace('|', ''));
                                });
                                this.etiquetas = this.etiquetas.filter(Boolean);
                                this.etiquetas = [... new Set(this.etiquetas)];
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
}
