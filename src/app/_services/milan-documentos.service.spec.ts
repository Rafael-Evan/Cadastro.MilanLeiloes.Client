/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MilanDocumentosService } from './milan-documentos.service';

describe('Service: MilanDocumentos', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MilanDocumentosService]
    });
  });

  it('should ...', inject([MilanDocumentosService], (service: MilanDocumentosService) => {
    expect(service).toBeTruthy();
  }));
});
