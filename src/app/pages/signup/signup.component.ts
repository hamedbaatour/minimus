import { Component, inject } from '@angular/core';
import { FbService } from '../../services/fb/fb.service';
import { Router, RouterLink } from '@angular/router';
import { first } from 'rxjs/operators';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from '../../ui/error/error.component';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  standalone: true,
  imports: [FormsModule, RouterLink, ErrorComponent],
})
export class SignupComponent {
  fb = inject(FbService);
  router = inject(Router);

  errorMessage?: string;

  signup(e: Event) {
    if (
      e.target instanceof HTMLFormElement &&
      'email' in e.target &&
      'password' in e.target &&
      e.target['email'] instanceof HTMLInputElement &&
      e.target['password'] instanceof HTMLInputElement
    ) {
      this.fb
        .signup(e.target['email'].value, e.target['password'].value)
        .pipe(first())
        .subscribe(
          () => {
            this.router.navigateByUrl('');
          },
          err => {
            this.errorMessage = err;
            setTimeout(() => (this.errorMessage = ''), 2000);
          }
        );
    }
  }
}
