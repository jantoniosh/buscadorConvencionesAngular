import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-descripcion-convencion',
  templateUrl: './descripcion-convencion.component.html'
})
export class DescripcionConvencionComponent implements OnInit {

  descargarSrc: string = "assets/images/descargar.png";
  descargarAlt: string = "descargar";
  compartirSrc: string = "assets/images/compartir.png";
  compartirAlt: string = "compartir";

  @Input('clase') clase: string = "";
  @Input('titulo') titulo: string = "";
  @Input('subtitulo') subtitulo: string = "";
  @Input('imagenUrl') imagenUrl: string = "";
  @Input('imagenAlt') imagenAlt: string = "";
  @Input('descripcion') descripcion: string = "";
  @Input('categoria') categoria: string = "";
  @Input('convencion') convencion: string = "";
  @Input('detalle') detalle: boolean = false;

  constructor() { }

  ngOnInit(): void {

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
}
