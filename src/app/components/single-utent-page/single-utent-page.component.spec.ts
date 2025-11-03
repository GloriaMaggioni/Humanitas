import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleUtentPageComponent } from './single-utent-page.component';

describe('SingleUtentPageComponent', () => {
  let component: SingleUtentPageComponent;
  let fixture: ComponentFixture<SingleUtentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SingleUtentPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SingleUtentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
