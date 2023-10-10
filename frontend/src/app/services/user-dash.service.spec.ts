import { TestBed } from '@angular/core/testing';

import { UserDashService } from './user-dash.service';

describe('UserDashService', () => {
  let service: UserDashService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDashService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
