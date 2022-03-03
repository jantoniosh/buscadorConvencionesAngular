import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
  selector: 'app-fuentes',
  templateUrl: './fuentes.component.html'
})
export class FuentesComponent implements OnInit {
  seccion: Seccion = {
    titulo: 'Resultados',
    detalle: true,
    color: 'Verde',
    noElementos: 4,
    boton: true,
    entradas: [],
    descripcion: []
};

slug: string = "";

constructor(private entradaService: EntradaService, private route: ActivatedRoute) { }

ngOnInit(): void {
    this.route.params.subscribe((data: any) => {
        console.log(data["slug"]);
        const observerEntrada = {
            next: (entradas: Entrada[]) => {
                this.seccion.titulo = `Fuente: #${data["slug"]}`;
                this.seccion.entradas = entradas;
            },
            error: (err: Error) => {
                this.seccion.titulo = `Esta fuente no existe`;
                this.seccion.entradas = [];
            }
        }
        this.entradaService.getFuente(data["slug"]).subscribe(observerEntrada);
    }
    )
}

}
