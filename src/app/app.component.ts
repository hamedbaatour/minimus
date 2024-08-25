import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import {UiService} from './services/ui/ui.service';
import {FbService} from './services/fb/fb.service';
import {take} from 'rxjs/operators';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { NgClass, AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
    standalone: true,
    imports: [NgClass, RouterLink, RouterLinkActive, RouterOutlet, AsyncPipe]
})
export class AppComponent implements OnInit, OnDestroy {
  ui = inject(UiService);
  fb = inject(FbService);
  router = inject(Router);

  showMenu = false;
  darkModeActive: boolean;
  userEmail = '';
  loggedIn = this.fb.isAuth();
  sub1;

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((value) => {
      this.darkModeActive = value;
    });

    this.fb.userEmail().subscribe((email) => {
      this.userEmail = email;
    });
  }

  toggleMenu() {
    this.showMenu = !this.showMenu;
  }

  modeToggleSwitch() {
    this.ui.darkModeState.next(!this.darkModeActive);
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

  logout() {
    this.toggleMenu();
    this.router.navigateByUrl('/login');
    this.fb.signout();
  }
}
