import {inject, TestBed} from '@angular/core/testing';

import {UiService} from './ui.service';

describe('UiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UiService]
    });
  });

  it('should be created', inject([UiService], (service: UiService) => {
    expect(service).toBeTruthy();
  }));
});
