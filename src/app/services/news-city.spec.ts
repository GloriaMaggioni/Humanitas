import { TestBed } from '@angular/core/testing';

import { NewsCityService } from './news-city.service';

describe('NewsCity', () => {
  let service: NewsCityService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewsCityService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
