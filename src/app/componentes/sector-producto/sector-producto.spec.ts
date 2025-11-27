import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectorProducto } from './sector-producto';

describe('SectorProducto', () => {
  let component: SectorProducto;
  let fixture: ComponentFixture<SectorProducto>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SectorProducto]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectorProducto);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
