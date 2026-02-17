import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpaziCulturali } from './spazi-culturali';

describe('SpaziCulturali', () => {
  let component: SpaziCulturali;
  let fixture: ComponentFixture<SpaziCulturali>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpaziCulturali]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpaziCulturali);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
