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

    constructor(private entradaService: EntradaService, private router: Router, private route: ActivatedRoute) { }

    ngOnInit(): void {
        this.route.params.subscribe(() => {
            this.ruta = this.router.url;
            const observerEntrada = {
                next: (entrada: Entrada[]) => {
                    this.entrada = entrada[0];
                    this.descripcion = [];
                    this.descripcion.push(this.entrada.cita);
                    this.etiquetas = this.entrada.etiquetas.split("|").map(etiqueta => {
                        return etiqueta.replace(/\s/g, '').replace('#', '');
                    });
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
}
