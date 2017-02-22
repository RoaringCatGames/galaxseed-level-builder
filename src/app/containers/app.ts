import 'rxjs/add/operator/let';
import { Observable } from 'rxjs/Observable';
import { Component, ChangeDetectionStrategy } from '@angular/core';


@Component({
  selector: 'level-builder-app',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {  
  constructor() {    
  }  
}
