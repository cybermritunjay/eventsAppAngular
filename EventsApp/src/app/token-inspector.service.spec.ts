import { TestBed } from '@angular/core/testing';

import { TokenInspectorService } from './token-inspector.service';

describe('TokenInspectorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TokenInspectorService = TestBed.get(TokenInspectorService);
    expect(service).toBeTruthy();
  });
});
