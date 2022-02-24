import { Component, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-categoria',
    templateUrl: './categoria.component.html'
})
export class CategoriaComponent implements OnInit {

    slug: string | null = "";
    seccion: Seccion = {
        titulo: '',
        detalle: true,
        color: 'Verde',
        noElementos: 4,
        boton: true,
        entradas: []
    };
    tipo: string = "";

    constructor(private entradaService: EntradaService, private route: ActivatedRoute) { }

    ngOnInit(): void {

        this.route.params.subscribe(routeParams => {
            this.slug = routeParams["slug"];
            const observerEntrada = {
                next: (entradas: Entrada[]) => {
                    this.seccion.entradas = [];
                    entradas.map(entrada => {
                        console.log(entrada.tipo, this.tipo, this.tipo.indexOf(entrada.tipo));
                        if (this.tipo.indexOf(entrada.tipo) === 0) {
                            this.seccion.entradas.push(entrada);
                        }
                    });
                    console.log(this.seccion.entradas);
                    this.hideBarra();
                },
                error: (err: Error) => {
                    this.seccion.entradas = [];
                    this.hideBarra();
                }
            }
            if (this.slug !== null) {
                this.onActivate();
                if (this.slug === "podcast") {
                    this.seccion.titulo = "Podcasts";
                    this.tipo = "Podcast";
                }
                else if (this.slug === "ficha") {
                    this.seccion.titulo = "Fichas";
                    this.tipo = "FICHA";
                }
                else if (this.slug === "infografia") {
                    this.seccion.titulo = "Infografícos";
                    this.tipo = "Infográficos ";
                }
                this.entradaService.getEntradas().subscribe(observerEntrada);
            }
        });
    }

    hideBarra() {
        window.scroll(0, 0);
        const bodyElement = document.body;
        bodyElement.classList.remove('menuactive');
    }

    onActivate() {
        window.scroll(0, 0);
        const bodyElement = document.body;
        bodyElement.classList.remove('menuactive');
    }
}