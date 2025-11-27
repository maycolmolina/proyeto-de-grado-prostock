import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Marketprincipal } from './marketprincipal';

describe('Marketprincipal', () => {
  let component: Marketprincipal;
  let fixture: ComponentFixture<Marketprincipal>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Marketprincipal]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Marketprincipal);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
