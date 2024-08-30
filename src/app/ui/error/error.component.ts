import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  standalone: true,
  imports: [NgClass],
})
export class ErrorComponent {
  @Input() message?: string;
  @Input() action = 'GOT IT';
}
