import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerdescargarcompartirComponent } from './verdescargarcompartir.component';

describe('VerdescargarcompartirComponent', () => {
  let component: VerdescargarcompartirComponent;
  let fixture: ComponentFixture<VerdescargarcompartirComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerdescargarcompartirComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VerdescargarcompartirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
