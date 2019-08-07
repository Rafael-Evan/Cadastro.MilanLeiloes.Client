/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MilanAuthService } from './milan-auth.service';

describe('Service: MilanAuth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MilanAuthService]
    });
  });

  it('should ...', inject([MilanAuthService], (service: MilanAuthService) => {
    expect(service).toBeTruthy();
  }));
});
