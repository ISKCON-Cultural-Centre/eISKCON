import { Component } from '@angular/core';
import { BASE_URL, API_VERSION } from './shared/base.url';
import { LoopBackConfig } from './shared/sdk';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'eISKCON';
  constructor() {
    LoopBackConfig.setBaseURL(BASE_URL);
    LoopBackConfig.setApiVersion(API_VERSION);
  }
}
