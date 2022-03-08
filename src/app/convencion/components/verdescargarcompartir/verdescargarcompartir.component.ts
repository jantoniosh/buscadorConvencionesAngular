import { Component, Input, OnInit } from '@angular/core';
import { faFacebook, faLinkedin, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { environment } from 'src/environments/environment';

@Component({
    selector: 'app-verdescargarcompartir',
    templateUrl: './verdescargarcompartir.component.html'
})
export class VerdescargarcompartirComponent implements OnInit {

    @Input() archivo: string = '';
    @Input() ruta: string = '';
    @Input() tipo: string = '';

    private url: string = environment.urlContenido;
    descargarSrc: string = "assets/images/descargar.png";
    compartirSrc: string = "assets/images/compartir.png";
    verSrc: string = "assets/images/ver.png";
    escucharSrc: string = "assets/images/escuchar.png";
    rutaCompartir: string = '';
    verescucharSrc: string = '';

    hayError: boolean = false;
    termino: string = "";

    faFacebook = faFacebook;
    faTwitter = faTwitter;
    faLinkedin = faLinkedin;

    constructor() { }

    ngOnInit(): void {
        this.rutaCompartir = `${this.url}/${this.ruta}`;
    }

    ngOnChanges(): void {
        this.tipo === "Podcast" ? this.verescucharSrc = this.escucharSrc : this.verescucharSrc = this.verSrc; 
    }

}
