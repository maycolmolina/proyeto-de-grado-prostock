import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponenteCarga } from './componente-carga';

describe('ComponenteCarga', () => {
  let component: ComponenteCarga;
  let fixture: ComponentFixture<ComponenteCarga>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ComponenteCarga]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ComponenteCarga);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
