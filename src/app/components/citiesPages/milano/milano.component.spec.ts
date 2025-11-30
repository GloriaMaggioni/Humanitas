import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MilanoComponent } from './milano.component';

describe('MilanoComponent', () => {
  let component: MilanoComponent;
  let fixture: ComponentFixture<MilanoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MilanoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MilanoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
