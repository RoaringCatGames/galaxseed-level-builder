import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

import { Level } from '../models/level';

@Component({
  selector: 'glb-level-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `    
    <md-card>
      <md-card-title>{{level.name}}</md-card-title>
      <md-card-content>
      Time: {{level.length}}
      ID: {{level.id}}
      </md-card-content>
      <md-card-actions layout="row" layout-align="end center">
        <button md-raised-button [routerLink]="['/json', level.id]">View JSON</button>
        <button md-raised-button routerLink="builder" (click)="onEdit(level.id)">Edit Level</button>
      </md-card-actions>
    </md-card>
  `,
  styles:[
    `.flex-container{
      display: flex;
      flex-flow: column;
      height: 500px;
    }`,
    `.full-json{
      width: 100%;      
      flex: 1;
    }`
  ]
})
export class LevelRowComponent {  
  @Input() level: Level;  
  @Output() editRequested: EventEmitter<string> = new EventEmitter<string>();

  onEdit(id: string) {
    this.editRequested.emit(id);
  }
}