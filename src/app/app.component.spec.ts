import { fakeAsync, TestBed, tick } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'Memories' title`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('Memories');
  });

  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Memories');
  });

  it('should show the skeleton for five seconds', fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();

    expect(fixture.nativeElement.querySelector('.skeleton-content')).toBeTruthy();

    tick(4999);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skeleton-content')).toBeTruthy();

    tick(1);
    fixture.detectChanges();
    expect(fixture.nativeElement.querySelector('.skeleton-content')).toBeNull();
  }));
});
