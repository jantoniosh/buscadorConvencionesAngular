import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Entrada } from '../../interfaces/entrada.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-entrada',
    templateUrl: './entrada.component.html'
})
export class EntradaComponent implements OnInit {

    clase: string = "block-top-content cedaw convencion";
    subtitulo: string = "";
    imagenAlt: string = "portada uno";
    descripcion: string[] = [];
    ruta: string | null = "";

    entrada: Entrada = {
        id: 0,
        nArticulo: 0,
        tipo: "",
        convencion: "",
        archivo: "",
        thumbnail: "",
        cita: "",
        titulo: "",
        subtitulo: "",
        subsubtitulo: "",
        texto: "",
        organismos: "",
        tipoDisposicion: "",
        etiquetas: "",
        temas: "",
        url: ""
    };

    etiquetas: string[] = [];
    fuentes: string[] = [];

    constructor(private entradaService: EntradaService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.ruta = this.router.url;
            this.hideBarra();
            const observerEntrada = {
                next: (entrada: Entrada[]) => {
                    this.entrada = entrada[0];
                    this.descripcion = [];
                    this.etiquetas = [];
                    this.fuentes = [];
                    this.descripcion.push(this.entrada.cita);
                    this.etiquetas = this.entrada.etiquetas.split("|").map(etiqueta => {
                        return etiqueta.replace(/\s/g, '').replace('#', '');
                    });
                    this.etiquetas = this.etiquetas.filter(Boolean);
                    
                    this.entrada.organismos.split(",").map(organismo => {
                        this.fuentes.push(organismo.replace(/\s/g, ''));
                    });
                    this.entrada.tipoDisposicion.split(",").map(disposicion => {
                        this.fuentes.push(disposicion.replace(/\s/g, ''));
                    });
                    this.fuentes = this.fuentes.filter(Boolean);
                    
                },
                error: (err: Error) => {
                    this.entrada = {
                        id: 0,
                        nArticulo: 0,
                        tipo: "",
                        convencion: "",
                        archivo: "",
                        thumbnail: "",
                        cita: "",
                        titulo: "",
                        subtitulo: "",
                        subsubtitulo: "",
                        texto: "",
                        organismos: "",
                        tipoDisposicion: "",
                        etiquetas: "",
                        temas: "",
                        url: ""
                    };
                }
            }
            if (this.ruta !== null) {
                this.entradaService.getEntrada(this.ruta).subscribe(observerEntrada);
            }
        });
    }

    getLigaEtiqueta(etiqueta: string) {
        return `/etiqueta/${etiqueta}`
    }

    getLigaFuente(fuente: string): string {
        return `/fuente/${fuente}`
    }

    hideBarra(): void {
        window.scroll(0, 0);
        const bodyElement = document.body;
        bodyElement.classList.remove('menuactive');
    }
}
