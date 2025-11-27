import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProveedoresAu } from './proveedores-au';

describe('ProveedoresAu', () => {
  let component: ProveedoresAu;
  let fixture: ComponentFixture<ProveedoresAu>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProveedoresAu]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProveedoresAu);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
