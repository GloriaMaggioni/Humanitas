import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MonzaComponent } from './monza.component';

describe('MonzaComponent', () => {
  let component: MonzaComponent;
  let fixture: ComponentFixture<MonzaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MonzaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MonzaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
