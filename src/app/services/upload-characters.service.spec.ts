import { TestBed } from '@angular/core/testing';

import { UploadCharactersService } from './upload-characters.service';

describe('UploadCharactersService', () => {
  let service: UploadCharactersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadCharactersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
