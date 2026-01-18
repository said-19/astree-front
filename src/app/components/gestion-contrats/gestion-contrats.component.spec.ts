import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionContratsComponent } from './gestion-contrats.component';

describe('GestionContratsComponent', () => {
  let component: GestionContratsComponent;
  let fixture: ComponentFixture<GestionContratsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GestionContratsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GestionContratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
