import {Component, OnDestroy, OnInit} from '@angular/core';
import {UiService} from '../../services/ui/ui.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-add-card',
  templateUrl: './add-card.component.html',
  styleUrls: ['./add-card.component.css']
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
