import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Perfilvendedor } from './perfilvendedor';

describe('Perfilvendedor', () => {
  let component: Perfilvendedor;
  let fixture: ComponentFixture<Perfilvendedor>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Perfilvendedor]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Perfilvendedor);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
