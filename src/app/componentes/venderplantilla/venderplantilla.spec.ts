import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Venderplantilla } from './venderplantilla';

describe('Venderplantilla', () => {
  let component: Venderplantilla;
  let fixture: ComponentFixture<Venderplantilla>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Venderplantilla]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Venderplantilla);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
