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
        entradas: [],
        descripcion: []
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
                this.hideBarra();
                if (this.slug === "podcast") {
                    this.seccion.titulo = "Podcasts";
                    this.tipo = "Podcast";
                    this.seccion.descripcion = ['Versus, es una serie de podcasts que hablan sobre <span class="resaltado">casos emblemáticos de justicia para las mujeres</span>, en voz de mujeres expertas y empáticas, que nos ayudan a conocer mejor la jurisprudencia internacional, y que al ampliar la dimensión humana de las convenciones nos permiten profundizar en la perspectiva de género.'];
                }
                else if (this.slug === "articulo") {
                    this.seccion.titulo = "Artículos";
                    this.tipo = "Artículo";
                    this.seccion.descripcion = ['Cada uno de los artículos de las convenciones <span class="versalitas">cedaw</span> y <span class="versalitas">bdp</span> han sido ampliados y comentados bajo la metodología del desempaque de derechos, lo que nos permite no sólo analizar con profundidad el texto de cada Convención, sino <span class="resaltado">acercarnos a mayor detalle a la jurisprudencia, a los instrumentos y a las fuentes</span> que tocan estos temas, así como acceder a citas que nos da recursos y elementos para sustentar nuestros propios casos.'];
                }
                else if (this.slug === "ficha") {
                    this.seccion.titulo = "Fichas";
                    this.tipo = "Ficha";

                    this.seccion.descripcion = ['Los elementos y temas esenciales de derecho que cada una de las Convenciones sobre Justicia para las mujeres, puestos en forma sucinta para su <span class="resaltado">apropiación y difusión</span>. Esta serie de infografías nos permite acceder de manera pedagógica al contenido más relevante de <span class="versalitas">cedaw</span> y <span class="versalitas">bdp</span>.'];
                }
                this.entradaService.getEntradas().subscribe(observerEntrada);
            }
        });
    }

    hideBarra(): void {
        window.scroll(0, 0);
        const bodyElement = document.body;
        bodyElement.classList.remove('menuactive');
    }

    // onActivate() {
    //     window.scroll(0, 0);
    //     const bodyElement = document.body;
    //     bodyElement.classList.remove('menuactive');
    // }
}