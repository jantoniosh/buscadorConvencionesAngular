import { Component } from '@angular/core';
import { Entrada } from '../../interfaces/entrada.interface';
import { Seccion } from '../../interfaces/seccion.interface';
import { EntradaService } from '../../services/convencion.service';

@Component({
  selector: 'app-cedaw',
  templateUrl: './cedaw.component.html'
})
export class CedawComponent {
  clase: string = "block-top-content cedaw convencion";
  titulo: string = "CEDAW";
  subtitulo: string = "Convención Interamericana para Prevenir, Sancionar y Erradicar la Violencia contra la Mujer";
  imagenUrl: string = "assets/images/portadados.png";
  imagenAlt: string = "portada dos";
  descripcion: string = `La Convención sobre la Eliminación de Todas las Formas de Discriminación contra la Mujer
  (CETFDCM; en inglés: Convention on the Elimination of all Forms of Discrimination Against Women,
  CEDAW) es un tratado internacional adoptado en 1979 por la Asamblea General de las Naciones
  Unidas.`;
  convencion: string = "CEDAW";

  secciones: Seccion[] = [
    {
      titulo: 'Fichas',
      detalle: false,
      color: 'Verde',
      noElementos: 4,
      boton: true,
      entradas: []
    },
    {
      titulo: 'Podcasts',
      color: 'Morado',
      detalle: false,
      noElementos: 4,
      boton: true,
      entradas: []
    },
    {
      titulo: 'Infografías',
      detalle: false,
      color: 'Azul',
      noElementos: 4,
      boton: true,
      entradas: []
    }
  ];

  constructor(private entradaService: EntradaService) { }

  ngOnInit(): void {
    const observerEntrada0 = {
      next: (entradas: Entrada[]) => {
        this.secciones[0].entradas = entradas;
      },
      error: (err: Error) => {
        this.secciones[0].entradas = [];
      }
    }
    this.entradaService.getEntradas()
      .subscribe(observerEntrada0);

    const observerEntrada1 = {
      next: (entradas: Entrada[]) => {
        this.secciones[1].entradas = entradas;
      },
      error: (err: Error) => {
        this.secciones[1].entradas = [];
      }
    }
    // this.entradaService.buscarPodcasts(this.convencion)
    //   .subscribe(observerEntrada1);

    const observerEntrada2 = {
      next: (entradas: Entrada[]) => {
        this.secciones[2].entradas = entradas;
      },
      error: (err: Error) => {
        this.secciones[2].entradas = [];
      }
    }
    // this.entradaService.buscarInfografias(this.convencion)
    //   .subscribe(observerEntrada2);
  }
}
