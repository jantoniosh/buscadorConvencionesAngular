import { Component, Input } from '@angular/core';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-descripcion-convencion',
  templateUrl: './descripcion-convencion.component.html'
})
export class DescripcionConvencionComponent {

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

  @Input() clase:string = '';
  @Input() titulo: string = "";
  @Input() subtitulo: string = "";
  @Input() imagenUrl: string = "";
  @Input() imagenAlt: string = "";
  @Input() descripciones: string[] = [];
  @Input() categoria: string = "";
  @Input() convencion: string = "";
  @Input() detalle: boolean = false;
  @Input() archivo: string = "";

  constructor() { }

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
    else if (categoria == "Ficha") {
      return "/categoria/ficha";
    }
    else if (categoria == "Infografía") {
      return "/categoria/infografia";
    }
    return "";
  }

  getRutaRedes(archivo: string) {
    return `${this.url}/${archivo}`;
}
}
