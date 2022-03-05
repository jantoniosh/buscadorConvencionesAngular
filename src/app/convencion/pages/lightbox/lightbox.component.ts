import { Component, OnInit } from '@angular/core';
import { EntradaService } from '../../services/convencion.service';
import { Entrada } from '../../interfaces/entrada.interface';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';
import { Album } from '../../interfaces/album';
import { Lightbox } from 'ngx-lightbox';

@Component({
    selector: 'app-lightbox',
    templateUrl: './lightbox.component.html'
})
export class LightboxComponent implements OnInit {

    _album: Album[] = [];

    entradas: Entrada[] = [];
    private url: string = environment.urlContenido;
    descargarSrc: string = "assets/images/descargar.png";
    descargarAlt: string = "descargar";
    compartirSrc: string = "assets/images/compartir.png";
    compartirAlt: string = "compartir";
    verSrc: string = "assets/images/ver.png";
    verAlt: string = "compartir";

    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faLinkedin = faLinkedin;

    constructor(private entradaService: EntradaService, private _lightbox: Lightbox) { }

    ngOnInit(): void {
        const observerEntrada = {
            next: (entradas: Entrada[]) => {
                this.entradas = [];
                entradas.map(entrada => {
                    if (entrada.tipo === "Ficha") {
                        this.entradas.push(entrada);
                        this._album.push({
                            src: entrada.archivo,
                            caption: `Imagen: ${entrada.titulo}`,
                            thumb: entrada.archivo
                        })
                    }
                });
                console.log(this.entradas);
            },
            error: (err: Error) => {
                this.entradas = [];
            }
        }
        this.entradaService.getEntradas().subscribe(observerEntrada);
    }

    getRutaConvencion(convencion: string) {
        if (convencion == "BDP") {
            return "/belem-do-para";
        }
        else if (convencion == "CEDAW") {
            return "/cedaw";
        }
        return "";
    }

    getRutaCategoria(categoria: string) {
        let cat: string = categoria.toLowerCase();
        if (cat == "podcast") {
            return "/categoria/podcast";
        }
        else if (cat == "artículo") {
            return "/categoria/articulo";
        }
        else if (cat == "ficha") {
            return "/categoria/ficha";
        }
        return "";
    }

    getRutaRedes(archivo: string) {
        return `${this.url}/${archivo}`;
    }

    open(index: number): void {
        this._lightbox.open(this._album, index);
    }

    close(): void {
        this._lightbox.close();
    }
}
