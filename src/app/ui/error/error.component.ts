import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent implements OnInit {

  @Input() message: string;
  @Input() action = 'GOT IT';

  constructor() {
  }

  ngOnInit() {
  }

}
