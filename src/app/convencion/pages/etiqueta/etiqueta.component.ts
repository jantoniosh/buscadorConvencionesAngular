import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-etiqueta',
    templateUrl: './etiqueta.component.html'
})
export class EtiquetaComponent implements OnInit {

    seccion: Seccion = {
        titulo: 'Resultados',
        detalle: true,
        color: 'Verde',
        noElementos: 4,
        boton: false,
        entradas: []
    };
    slug: string = "";

    constructor(private entradaService: EntradaService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe((data: any) => {
            console.log(data["slug"]);
            const observerEntrada = {
                next: (entradas: Entrada[]) => {
                    this.seccion.titulo = `Etiqueta: #${data["slug"]}`;
                    this.seccion.entradas = entradas;
                },
                error: (err: Error) => {
                    this.seccion.titulo = `Esta etiqueta no existe`;
                    this.seccion.entradas = [];
                }
            }
            this.entradaService.getEtiqueta(data["slug"]).subscribe(observerEntrada);
        }
        )
    }

}
