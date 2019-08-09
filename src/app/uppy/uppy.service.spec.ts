/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { UppyService } from './uppy.service';

describe('Service: Uppy', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UppyService]
    });
  });

  it('should ...', inject([UppyService], (service: UppyService) => {
    expect(service).toBeTruthy();
  }));
});
