import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, startWith, map } from 'rxjs';
import { EntradaService } from '../../services/convencion.service';
import { Etiquetas } from '../../interfaces/etiquetas.interface';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Titulos } from '../../interfaces/titulos.interface';
import { Router } from '@angular/router';
import { Fuentes } from '../../interfaces/fuentes.interface';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-buscador',
    templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

    faTimes = faTimes;
    faSearch = faSearch;

    separatorKeysCodes: number[] = [ENTER, COMMA];

    titulos: string[] = [];
    tituloControl = new FormControl();
    filTitulos: Observable<string[]> | any;


    buscador: boolean = true;

    constructor(private entradaService: EntradaService, private router: Router) { }

    ngOnInit(): void {
        this.mostrarBuscador();

        this.peticionTitulos();

        this.filTitulos = this.tituloControl.valueChanges.pipe(
            debounceTime(100),
            startWith(''),
            map(val => this._filterTitulo(val))
        );
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            console.log(event);
        }
    }

    enviar(): void {
        const tema: string | any = this.tituloControl.value;
        if (tema !== null) {
            this.router.navigate(['/busqueda'], { queryParams: { tema: tema } });
        }
        else {
            console.log("falta tema");
        }
    }

    peticionTitulos(): void {
        const observerTitulo = {
            next: (titulos: Titulos[]) => {
                this.titulos = [];
                titulos.map(titulo => {
                    this.titulos.push(titulo.titulo);
                });

            },
            error: (err: Error) => {
                this.titulos = [];
            }
        }
        this.entradaService.getTitulos().subscribe(observerTitulo);
    }

    private _filterTitulo(val: string): string[] {
        const formatVal = val.toLocaleLowerCase();
        return this.titulos.filter(titulo => titulo.toLocaleLowerCase().indexOf(formatVal) >= 0);
    }

    mostrarBuscador() {
        this.buscador = !this.buscador;
        const bodyElement = document.body;
        if (bodyElement) {
            if (this.buscador) {
                bodyElement.classList.add("buscadoractive");
            }
            else {
                bodyElement.classList.remove("buscadoractive");
            }
        }
    }

}
