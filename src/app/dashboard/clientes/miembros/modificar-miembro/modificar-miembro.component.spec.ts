import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModificarMiembroComponent } from './modificar-miembro.component';

describe('ModificarMiembroComponent', () => {
  let component: ModificarMiembroComponent;
  let fixture: ComponentFixture<ModificarMiembroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModificarMiembroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModificarMiembroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
