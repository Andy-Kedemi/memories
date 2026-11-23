import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { HeroDetailComponent } from './hero-details.component';
import { Hero } from '../hero';

describe('HeroDetailComponent', () => {
  let component: HeroDetailComponent;
  let fixture: ComponentFixture<HeroDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroDetailComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: { snapshot: { paramMap: { get: () => null } } },
        },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should show hero details in a modal and emit when it closes', () => {
    const hero: Hero = { id: 1, name: 'Windstorm' };
    const closed = jasmine.createSpy('closed');
    component.closed.subscribe(closed);
    fixture.componentRef.setInput('hero', hero);
    fixture.detectChanges();

    expect(fixture.nativeElement.textContent).toContain('WINDSTORM Details');
    expect(fixture.nativeElement.textContent).toContain('Windstorm');

    fixture.nativeElement.querySelector('.close-x').click();

    expect(closed).toHaveBeenCalled();
  });

  it('should apply edits only after confirming', () => {
    const hero: Hero = { id: 1, name: 'Windstorm' };
    fixture.componentRef.setInput('hero', hero);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('#hero-name') as HTMLInputElement;
    input.value = 'Updated Hero';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    expect(hero.name).toBe('Windstorm');

    fixture.nativeElement.querySelector('.btn-primary').click();

    expect(hero.name).toBe('Updated Hero');
  });

  it('should discard edits when canceled', () => {
    const hero: Hero = { id: 1, name: 'Windstorm' };
    fixture.componentRef.setInput('hero', hero);
    fixture.detectChanges();

    const input = fixture.nativeElement.querySelector('#hero-name') as HTMLInputElement;
    input.value = 'Updated Hero';
    input.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.nativeElement.querySelector('.btn-secondary').click();

    expect(hero.name).toBe('Windstorm');
  });
});
