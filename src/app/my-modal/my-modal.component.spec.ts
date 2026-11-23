import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalComponent } from './my-modal.component';

describe('MyModalComponent', () => {
  let component: ModalComponent;
  let fixture: ComponentFixture<ModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit accepted before closing when OK is clicked', () => {
    const events: string[] = [];
    component.accepted.subscribe(() => events.push('accepted'));
    component.closed.subscribe(() => events.push('closed'));

    fixture.nativeElement.querySelector('.btn-primary').click();

    expect(events).toEqual(['accepted', 'closed']);
  });

  it('should close without accepting when Cancel is clicked', () => {
    const accepted = jasmine.createSpy('accepted');
    const closed = jasmine.createSpy('closed');
    component.accepted.subscribe(accepted);
    component.closed.subscribe(closed);

    fixture.nativeElement.querySelector('.btn-secondary').click();

    expect(accepted).not.toHaveBeenCalled();
    expect(closed).toHaveBeenCalled();
  });
});
