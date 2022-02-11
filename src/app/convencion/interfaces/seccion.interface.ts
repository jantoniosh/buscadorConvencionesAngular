import { Entrada } from "./entrada.interface";

export interface Seccion {
    titulo: string;
    detalle: boolean;
    color: string;
    noElementos: number;
    boton: boolean;
    entradas: Entrada[];
}