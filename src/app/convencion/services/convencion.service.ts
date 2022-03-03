import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Entrada } from '../interfaces/entrada.interface';
import { Etiquetas } from '../interfaces/etiquetas.interface';
import { Fuentes } from '../interfaces/fuentes.interface';
import { Titulos } from '../interfaces/titulos.interface';
@Injectable({
    providedIn: 'root'
})
export class EntradaService {
    private apiUrl: string = environment.apiUrl;

    get httpParams() {
        return new HttpParams().set('fields', 'convencion');
    }

    constructor(private http: HttpClient) { }


    getTitulos(): Observable<Titulos[]> {
        const url = `${this.apiUrl}/titulo/GetTitulos`;
        return this.http.get<Titulos[]>(url);
    }

    getTitulosAuto(titulo: string): Observable<Titulos[]> {
        const url = `${this.apiUrl}/titulo/GetTitulo?titulo=${titulo}`;
        return this.http.get<Titulos[]>(url);
    }

    getEntradas(): Observable<Entrada[]> {
        const url = `${this.apiUrl}/entrada/GetEntradas`;
        return this.http.get<Entrada[]>(url);
    }

    getEntrada(slug: string): Observable<Entrada[]> {
        const url = `${this.apiUrl}/entrada/GetEntrada?slug=${slug}`;
        return this.http.get<Entrada[]>(url);
    }

    getBusqueda(texto: string): Observable<Entrada[]> {
        const url = `${this.apiUrl}/entrada/GetBusqueda?texto=${texto}`;
        return this.http.get<Entrada[]>(url);
    }

    getEtiqueta(etiqueta: string): Observable<Entrada[]> {
        const url = `${this.apiUrl}/entrada/GetEtiqueta?etiqueta=${etiqueta}`;
        return this.http.get<Entrada[]>(url);
    }

    getFuente(fuente: string): Observable<Entrada[]> {
        const url = `${this.apiUrl}/entrada/GetFuente?fuente=${fuente}`;
        return this.http.get<Entrada[]>(url);
    }

    getEtiquetas(): Observable<Etiquetas[]> {
        const url = `${this.apiUrl}/etiqueta/GetEtiquetas`;
        return this.http.get<Etiquetas[]>(url);
    }

    getFuentes(): Observable<Fuentes[]> {
        const url = `${this.apiUrl}/fuentes/GetFuentes`;
        return this.http.get<Fuentes[]>(url);
    }
}
