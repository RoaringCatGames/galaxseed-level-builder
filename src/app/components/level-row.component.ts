import { Component, ChangeDetectionStrategy, EventEmitter, Input, Output } from '@angular/core';

import { Level } from '../models/level';

@Component({
  selector: 'glb-level-row',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `    
    <md-card>
      <md-card-title>{{level.name}}</md-card-title>
      Time: {{level.length}}
      ID: {{level.id}}

      <button (click)="onView(level.id)">View JSON</button>
      <button (click)="onEdit(level.id)">Edit Level</button>
    <md-card>
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
  @Output() jsonRequested: EventEmitter<string> = new EventEmitter<string>();
  @Output() editRequested: EventEmitter<string> = new EventEmitter<string>();
  
  onView(id: string) {
    this.jsonRequested.emit(id);
  }

  onEdit(id: string) {
    this.editRequested.emit(id);
  }
}