import { Component, OnInit } from '@angular/core';
import { ENTER, COMMA } from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, startWith, map } from 'rxjs';
import { EntradaService } from '../../services/convencion.service';
import { Titulos } from '../../interfaces/titulos.interface';
import { Event, NavigationEnd, Router } from '@angular/router';
import { faQuestionCircle, faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-buscador',
    templateUrl: './buscador.component.html'
})
export class BuscadorComponent implements OnInit {

    faTimes = faTimes;
    faSearch = faSearch;
    faQuestion = faQuestionCircle

    separatorKeysCodes: number[] = [ENTER, COMMA];

    titulos: string[] = [];
    tituloControl = new FormControl();
    filTitulos: Observable<string[]> | any;

    buscador: boolean = true;
    tooltip: boolean = false;

    constructor(private entradaService: EntradaService, private router: Router) { }

    ngOnInit(): void {
        this.mostrarBuscador();

        this.peticionTitulos();

        this.filTitulos = this.tituloControl.valueChanges.pipe(
            debounceTime(100),
            startWith(''),
            map(val => this._filterTitulo(val))
        );

        this.router.events.subscribe((event: Event) => {
            if (event instanceof NavigationEnd) {
                console.log(event.url);
                if (event.url.includes("/busqueda?") == false) {
                    this.tituloControl.setValue('');
                }
            }
        });
    }

    onKeydown(event: KeyboardEvent) {
        if (event.key === "Enter") {
            this.enviar();
        }
    }

    enviar(): void {
        let tema: string | any = this.tituloControl.value;
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

    mostrarBuscador(): void {
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

    showTooltip(): void {
        this.tooltip = !this.tooltip;
    }
}
