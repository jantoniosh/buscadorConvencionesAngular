import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Entrada } from '../interfaces/entrada.interface';
import { Etiquetas } from '../interfaces/etiquetas.interface';
import { Fuentes } from '../interfaces/fuentes.interface';
import { Titulos } from '../interfaces/titulos.interface';
@Injectable({
    providedIn: 'root'
})
export class EntradaService {
    private apiUrl: string = 'https://localhost:7290';

    get httpParams() {
        return new HttpParams().set('fields', 'convencion');
    }

    constructor(private http: HttpClient) { }


    getTitulos(): Observable<Titulos[]> {
        const url = `${this.apiUrl}/titulo/GetTitulos`;
        return this.http.get<Titulos[]>(url);
    }

    getTitulosAuto(titulo: string): Observable<Titulos[]> {
        const url = `${this.apiUrl}/titulo/GetTitulo?Titulo=${titulo}`;
        return this.http.get<Titulos[]>(url);
    }

    getEntrada(slug: string): Observable<Entrada> {
        const url = `${this.apiUrl}/GetEntrada?slug=${slug}`;
        return this.http.get<Entrada>(url);
    }

    getEntradas(): Observable<Entrada[]> {
        const url = `${this.apiUrl}/GetEntradas`;
        return this.http.get<Entrada[]>(url);
    }

    getEtiquetas(): Observable<Etiquetas[]> {
        const url = `${this.apiUrl}/GetEtiquetas`;
        return this.http.get<Etiquetas[]>(url);
    }

    getFuentes(): Observable<Fuentes[]> {
        const url = `${this.apiUrl}/GetFuentes`;
        return this.http.get<Fuentes[]>(url);
    }

    getEtiqueta(etiqueta: string): Observable<Entrada[]> {
        const url = `${this.apiUrl}/GetEtiqueta?etiqueta=${etiqueta}`;
        return this.http.get<Entrada[]>(url);
    }

    getBusqueda(texto: string): Observable<Entrada[]> {
        const url = `${this.apiUrl}/GetBusqueda?texto=${texto}`;
        return this.http.get<Entrada[]>(url);
    }
}
