import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerActivoComponent } from './ver-activo.component';

describe('VerActivoComponent', () => {
  let component: VerActivoComponent;
  let fixture: ComponentFixture<VerActivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [VerActivoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerActivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
