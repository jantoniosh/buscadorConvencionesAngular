import { Component, Input } from '@angular/core';
import { Seccion } from '../../interfaces/seccion.interface';

@Component({
    selector: 'app-mostrar-materiales',
    templateUrl: './mostrar-materiales.component.html'
})
export class MostrarMaterialesComponent {

    coverImg: string = "assets/images/materialuno.jpg";
    descargarSrc: string = "assets/images/descargar.png";
    descargarAlt: string = "descargar";
    compartirSrc: string = "assets/images/compartir.png";
    compartirAlt: string = "compartir";
    verSrc: string = "assets/images/ver.png";
    verAlt: string = "compartir";

    hayError: boolean = false;
    termino: string = "";

    @Input() seccion: Seccion = {
        titulo: '',
        detalle: false,
        color: '',
        noElementos: 0,
        boton: false,
        entradas: []
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
        if (convencion == "Belém do Pará") {
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
        else if (cat == "ficha") {
            return "/categoria/ficha";
        }
        else if (cat == "infografía") {
            return "/categoria/infografia";
        }
        return "";
    }

    aumentar() {
        this.seccion.noElementos += 4;
    }
}
