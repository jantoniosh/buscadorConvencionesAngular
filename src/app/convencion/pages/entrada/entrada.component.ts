import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Entrada } from '../../interfaces/entrada.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
    selector: 'app-entrada',
    templateUrl: './entrada.component.html',
    styleUrls: ['./entrada.component.css']
})
export class EntradaComponent implements OnInit {

    clase: string = "block-top-content cedaw convencion";
    subtitulo: string = "";
    imagenAlt: string = "portada uno";
    descripcion: string = "La Convención de Belém do Pará, establece por primera vez el derecho de las mujeres a vivir una vida libre de violencia. Este tratado interamericano de derechos humanos ha dado pauta para la adopción de leyes y políticas sobre prevención, erradicación y sanción de la violencia contra las mujeres en los Estados Parte de la Convención."

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

    constructor(private entradaService: EntradaService, private router: Router) { }

    ngOnInit(): void {
        this.ruta = this.router.url;
        const observerEntrada = {
            next: (entrada: Entrada) => {
                this.entrada = entrada;
                console.log(this.entrada.etiquetas);
                this.etiquetas = this.entrada.etiquetas.split("|").map(etiqueta => {
                    return etiqueta.replace(/\s/g, '').replace('#', '');
                });
                console.log(this.etiquetas);
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
    }

    getLigaEtiqueta(etiqueta: string) {
        return `/etiqueta/${etiqueta}`
    }
}
