import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

import { HeroService } from './hero.service';

describe('HeroService', () => {
  let service: HeroService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(HeroService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpTesting.verify());

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should search heroes using an encoded query parameter', () => {
    service.searchHeroes('Spider Man').subscribe();

    const request = httpTesting.expectOne(
      (candidate) =>
        candidate.url === 'api/heroes' &&
        candidate.params.get('name') === 'Spider Man',
    );
    expect(request.request.method).toBe('GET');
    request.flush([]);
  });

  it('should add a hero with JSON headers', () => {
    service.addHero({ name: 'New Hero' }).subscribe();

    const request = httpTesting.expectOne('api/heroes');
    expect(request.request.method).toBe('POST');
    expect(request.request.body).toEqual({ name: 'New Hero' });
    expect(request.request.headers.get('Content-Type')).toBe('application/json');
    request.flush({ id: 25, name: 'New Hero' });
  });
});
