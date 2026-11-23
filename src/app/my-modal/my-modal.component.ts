import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-modal',
  standalone: true,
  templateUrl: './my-modal.component.html',
  styleUrl: './my-modal.component.css',
})
export class ModalComponent {
  @Input() title = '';
  @Output() closed = new EventEmitter<void>();
  @Output() accepted = new EventEmitter<void>();

  close(): void {
    this.closed.emit();
  }

  accept(): void {
    this.accepted.emit();
    this.close();
  }
}
