import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
    selector: 'app-add-card',
    templateUrl: './add-card.component.html',
    styleUrls: ['./add-card.component.css'],
    standalone: true,
    imports: [RouterLink, NgClass]
})
export class AddCardComponent implements OnInit, OnDestroy {

  darkMode: boolean;
  sub1: Subscription;

  constructor(public ui: UiService) {
  }

  ngOnInit() {
    this.sub1 = this.ui.darkModeState.subscribe((isDark) => {
      this.darkMode = isDark;
    });
  }

  ngOnDestroy() {
    this.sub1.unsubscribe();
  }

}
