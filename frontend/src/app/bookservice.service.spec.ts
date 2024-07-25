import { TestBed } from '@angular/core/testing';

import { BooksService } from './bookservice.service';

describe('BookserviceService', () => {
  let service: BooksService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(BooksService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
