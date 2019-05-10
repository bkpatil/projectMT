import { TestBed } from '@angular/core/testing';

import { DeletePopupService } from './delete-popup.service';

describe('DeletePopupService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DeletePopupService = TestBed.get(DeletePopupService);
    expect(service).toBeTruthy();
  });
});
