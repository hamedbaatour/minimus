import { Component, OnInit, inject } from '@angular/core';
import {FbService} from '../../services/fb/fb.service';
import {first, tap} from 'rxjs/operators';
import { Router, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ErrorComponent } from '../../ui/error/error.component';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
    standalone: true,
    imports: [FormsModule, RouterLink, ErrorComponent]
})
export class LoginComponent implements OnInit {
  fb = inject(FbService);
  router = inject(Router);

  errorMessage = '';

  ngOnInit() {
  }

  login(e) {
    this.fb.signin(e.target.email.value, e.target.password.value).pipe(first()).subscribe(() => {
      this.router.navigateByUrl('');
    },(err) => {
      this.errorMessage = err;
      setTimeout(() => this.errorMessage = '', 2000);
    });
  }

}
