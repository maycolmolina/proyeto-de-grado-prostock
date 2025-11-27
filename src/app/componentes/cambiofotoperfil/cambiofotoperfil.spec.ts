import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cambiofotoperfil } from './cambiofotoperfil';

describe('Cambiofotoperfil', () => {
  let component: Cambiofotoperfil;
  let fixture: ComponentFixture<Cambiofotoperfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cambiofotoperfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cambiofotoperfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
