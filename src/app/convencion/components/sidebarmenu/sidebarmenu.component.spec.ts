import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarmenuComponent } from './sidebarmenu.component';

describe('SidebarmenuComponent', () => {
    let component: SidebarmenuComponent;
    let fixture: ComponentFixture<SidebarmenuComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SidebarmenuComponent]
        })
            .compileComponents(); FileSystemDirectoryReader
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SidebarmenuComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('debe crearse', () => {
        expect(component).toBeTruthy();
    });
});
