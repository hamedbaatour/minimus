import { Component, inject } from '@angular/core';
import { UiService } from '../../services/ui/ui.service';
import { RouterLink } from '@angular/router';
import { AsyncPipe, NgClass } from '@angular/common';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css'],
  standalone: true,
  imports: [RouterLink, NgClass, AsyncPipe],
})
export class AddCardComponent {
  ui = inject(UiService);
  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed());
}
