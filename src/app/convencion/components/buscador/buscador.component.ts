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

    @ViewChild('etiquetaInput') etiquetaInput: ElementRef<HTMLInputElement> | any;
    etiquetaControl = new FormControl();
    filEtiquetas: Observable<string[]> | any;
    etiquetas: string[] = [];
    allEtiquetas: string[] = [];

    @ViewChild('fuenteInput') fuenteInput: ElementRef<HTMLInputElement> | any;
    fuenteControl = new FormControl();
    filFuentes: Observable<string[]> | any;
    fuentes: string[] = [];
    allFuentes: string[] = [];

    buscador: boolean = false;

    constructor(private entradaService: EntradaService, private router: Router) { }

    ngOnInit(): void {
        this.mostrarBuscador();
        // Petición titulos
        this.peticionTitulos();
        // Petición de Etiquetas
        const observerEtiquetas = {
            next: (etiquetas: Etiquetas[]) => {
                this.allEtiquetas = [];
                etiquetas.map(etiqueta => {
                    this.allEtiquetas.push(etiqueta.etiqueta);
                });
            },
            error: (err: Error) => {
                console.log(err);
                this.allEtiquetas = [];
            }
        }
        this.entradaService.getEtiquetas().subscribe(observerEtiquetas);

        const observerFuentes = {
            next: (fuentes: Fuentes[]) => {
                this.allFuentes = [];
                fuentes.map(fuente => {
                    this.allFuentes.push(fuente.fuente);
                });
            },
            error: (err: Error) => {
                console.log(err);
                this.allFuentes = [];
            }
        }
        this.entradaService.getFuentes().subscribe(observerFuentes);

        this.filTitulos = this.tituloControl.valueChanges.pipe(
            debounceTime(100),
            startWith(''),
            map(val => this._filterTitulo(val))
        );

        this.filEtiquetas = this.etiquetaControl.valueChanges.pipe(
            startWith(''),
            map((etiqueta: string | null) => (etiqueta ? this.filterEtiqueta(etiqueta) : this.allEtiquetas.slice())),
        );

        this.filFuentes = this.fuenteControl.valueChanges.pipe(
            startWith(''),
            map((fuente: string | null) => (fuente ? this.filterFuente(fuente) : this.allFuentes.slice())),
        );
    }

    addEtiqueta(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            if (this.allEtiquetas.indexOf(value) > -1) {
                this.removeItemFromArr(this.allEtiquetas, value);
                this.etiquetas.push(value);
                this.enviar();
            }
        }
        event.chipInput!.clear();
        this.etiquetaControl.setValue(this.etiquetas);
    }

    removeEtiqueta(etiqueta: string): void {
        const index = this.etiquetas.indexOf(etiqueta);
        if (index >= 0) {
            this.etiquetas.splice(index, 1);
        }
        this.allEtiquetas.push(etiqueta);
        this.enviar();
    }

    selectedEtiqueta(event: MatAutocompleteSelectedEvent): void {
        if (this.allEtiquetas.indexOf(event.option.viewValue) > -1) {
            this.removeItemFromArr(this.allEtiquetas, event.option.viewValue);
            this.etiquetas.push(event.option.viewValue);
            this.etiquetaInput.nativeElement.value = '';
            this.etiquetaControl.setValue(null);
            this.enviar();
        }
    }

    addFuente(event: MatChipInputEvent): void {
        const value = (event.value || '').trim();
        if (value) {
            if (this.allFuentes.indexOf(value) > -1) {
                this.fuentes.push(value);
                this.enviar();
            }
        }
        event.chipInput!.clear();
        this.fuenteControl.setValue(this.fuentes);

    }

    removeFuente(fuente: string): void {
        const index = this.fuentes.indexOf(fuente);

        if (index >= 0) {
            this.fuentes.splice(index, 1);
        }
        this.allFuentes.push(fuente);
        this.enviar();
    }

    selectedFuente(event: MatAutocompleteSelectedEvent): void {
        if (this.allFuentes.indexOf(event.option.viewValue) > -1) {
            this.removeItemFromArr(this.allFuentes, event.option.viewValue);
            this.fuentes.push(event.option.viewValue);
            this.fuenteInput.nativeElement.value = '';
            this.fuenteControl.setValue(null);
            this.enviar();
        }
    }

    removeItemFromArr(arr: string[], item: string): void {
        for (var i = 0; i < arr.length; i++) {
            if (arr[i] === item) {
                arr.splice(i, 1);
            }
        }
    }

    enviar(): void {
        const tema: string | any = this.tituloControl.value;
        if (tema !== null) {
            this.router.navigate(['/busqueda'], { queryParams: { tema: tema, etiquetas: this.etiquetas, fuentes: this.fuentes } });
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

    filterEtiqueta(val: string): string[] {
        try {
            const filterValue = val.toLocaleLowerCase();
            return this.allEtiquetas.filter(etiqueta => etiqueta.toLocaleLowerCase().indexOf(filterValue) >= 0);
        }
        catch {
            return ['aaa'];
        }
    }

    filterFuente(val: string | any): string[] | any {
        if (val !== null) {
            const filterValue = val.toLocaleLowerCase();
            return this.allFuentes.filter(fuente => fuente.toLocaleLowerCase().indexOf(filterValue) >= 0);
        }
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
