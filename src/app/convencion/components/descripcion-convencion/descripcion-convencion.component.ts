import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';
import { DialogImagenComponent } from '../dialog-imagen/dialog-imagen.component';

@Component({
    selector: 'app-descripcion-convencion',
    templateUrl: './descripcion-convencion.component.html'
})
export class DescripcionConvencionComponent {

    private url: string = environment.urlContenido;
    descargarSrc: string = "assets/images/descargar.png";
    compartirSrc: string = "assets/images/compartir.png";
    verSrc: string = "assets/images/ver.png";
    escucharSrc: string = "assets/images/escuchar.png";
    ruta: string = '';

    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faLinkedin = faLinkedin;

    @Input() clase: string = '';
    @Input() titulo: string = "";
    @Input() subtitulo: string = "";
    @Input() imagenUrl: string = "";
    @Input() imagenAlt: string = "";
    @Input() descripciones: string[] = [];
    @Input() categoria: string = "";
    @Input() convencion: string = "";
    @Input() detalle: boolean = false;
    @Input() archivo: string = "";


    constructor(private router: Router, public dialog: MatDialog) {
        this.ruta = router.url;
    }

    mostrarDialog(ruta: string): void {
        this.dialog
            .open(DialogImagenComponent, {
                data: ruta
            })
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
        if (categoria == "Podcast") {
            return "/categoria/podcast";
        }
        else if (categoria == "Artículo") {
            return "/categoria/articulo";
        }
        else if (categoria == "Ficha") {
            return "/categoria/ficha";
        }
        return "";
    }

    getRutaRedes(archivo: string): string {
        return `${this.url}/${archivo}`;
    }

    getLogoVista(): string {
        if (this.categoria == "Podcast") {
            return this.escucharSrc;
        }
        else {
            return this.verSrc
        }
    }

    getFile(ruta: string): string {
        return ruta.replace('thumb', 'images');
    }
}
