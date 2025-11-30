import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeccoComponent } from './lecco.component';

describe('LeccoComponent', () => {
  let component: LeccoComponent;
  let fixture: ComponentFixture<LeccoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LeccoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LeccoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
