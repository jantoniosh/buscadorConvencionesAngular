import { Component, Input, OnInit } from '@angular/core';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { faVolumeUp } from '@fortawesome/free-solid-svg-icons';
import { Seccion } from '../../interfaces/seccion.interface';
import { environment } from '../../../../environments/environment.prod';

@Component({
    selector: 'app-mostrar-materiales',
    templateUrl: './mostrar-materiales.component.html'
})
export class MostrarMaterialesComponent {

    private url: string = environment.urlContenido;
    coverImg: string = "assets/images/materialuno.jpg";
    descargarSrc: string = "assets/images/descargar.png";
    descargarAlt: string = "descargar";
    compartirSrc: string = "assets/images/compartir.png";
    compartirAlt: string = "compartir";
    verSrc: string = "assets/images/ver.png";
    verAlt: string = "compartir";

    hayError: boolean = false;
    termino: string = "";

    sonido = faVolumeUp;
    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faLinkedin = faLinkedin;

    @Input() seccion: Seccion = {
        titulo: '',
        detalle: false,
        color: '',
        noElementos: 0,
        boton: false,
        entradas: [],
        descripcion: []
    }

    constructor() { }
    getClassOf() {
        if (this.seccion.color === "Verde") {
            return "block-content multiple materiales home";
        }
        else if (this.seccion.color === "Morado") {
            return "block-content materiales podcast home";
        }
        else if (this.seccion.color === "Azul") {
            return "block-content materiales info home";
        }
        return "";
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

    aumentar() {
        this.seccion.noElementos += 4;
    }
}
