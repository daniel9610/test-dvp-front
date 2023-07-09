import { TestBed } from '@angular/core/testing';

import { ApiGithubService } from './api-github.service';

describe('ApiGithubService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ApiGithubService = TestBed.get(ApiGithubService);
    expect(service).toBeTruthy();
  });
});
