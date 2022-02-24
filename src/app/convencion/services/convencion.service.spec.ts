import { TestBed } from '@angular/core/testing';
import { EntradaService } from './convencion.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Titulos } from '../interfaces/titulos.interface';

describe('EntradaService', () => {
    let service: EntradaService;
    let httpController: HttpTestingController;
    let TitulosArray: Titulos[] = [{
        id: 0,
        titulo: "jose"
    },
    {
        id: 1,
        titulo: "antonio"
    }];
    let url = 'http://convencionesapi.mensajito.mx';
        ;
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule]
        });
        service = TestBed.inject(EntradaService);
        httpController = TestBed.inject(HttpTestingController);
    });

    it('debe de llamar a getTitulos y devolver un arreglo de titulos', () => {

        service.getTitulos().subscribe((res) => {
            expect(res).toEqual(TitulosArray)
        });

        const req = httpController.expectOne({
            method: 'GET',
            url: `${url}/titulo/GetTitulos`,
        });

        //4
        req.flush(TitulosArray);
    });
});