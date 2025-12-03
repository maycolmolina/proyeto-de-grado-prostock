import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IngresarNegocio } from './ingresar-negocio';

describe('IngresarNegocio', () => {
  let component: IngresarNegocio;
  let fixture: ComponentFixture<IngresarNegocio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IngresarNegocio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IngresarNegocio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
