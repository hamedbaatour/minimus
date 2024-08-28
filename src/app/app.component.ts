import {Component, inject} from '@angular/core';
import {UiService} from './services/ui/ui.service';
import {FbService} from './services/fb/fb.service';
import {shareReplay} from 'rxjs/operators';
import {Router, RouterLink, RouterLinkActive, RouterOutlet} from '@angular/router';
import {AsyncPipe, NgClass} from '@angular/common';
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: true,
  imports: [NgClass, RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe]
})
export class AppComponent {
  ui = inject(UiService);
  fb = inject(FbService);
  router = inject(Router);

  showMenu = false;
  darkMode$ = this.ui.darkModeState.pipe(takeUntilDestroyed(), shareReplay(1));
  userEmail$ = this.fb.userEmail();
  loggedIn = this.fb.isAuth();

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.ui.darkModeState.value);
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.fb.signout();
  }
}
