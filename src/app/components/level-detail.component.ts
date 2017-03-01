import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Level, Spawn } from '../models/level';

@Component({
  selector: 'glb-level-detail',
  template: `        
    <div *ngIf="!isJson">
      <md-grid-list cols="7" rowHeight="20px">         
        <md-grid-tile class="col">Spawn Time</md-grid-tile >
        <md-grid-tile class="col">Enemy Type</md-grid-tile>
        <md-grid-tile class="col">Power Up?</md-grid-tile>
        <md-grid-tile class="col">Start Position</md-grid-tile>
        <md-grid-tile class="col">Mid Bezier Point</md-grid-tile>
        <md-grid-tile class="col">End Point</md-grid-tile>
        <md-grid-tile class="col">Speed</md-grid-tile> 
      </md-grid-list>      
      <glb-spawn-detail *ngFor="let spawn of level?.spawns | sort:'time'" 
        (deleteFired)="fireDelete($event)"
        [spawn]="spawn"></glb-spawn-detail>      
    </div>

    <div *ngIf="isJson" class="flex-container">    
      <textarea class="full-json">
        {{level | json}}    
      </textarea>
    </div>
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
export class LevelDetailComponent {
  @Input() level: Level;
  @Input() isJson: boolean = false;

  @Output() spawnDeleted: EventEmitter<Spawn> = new EventEmitter<Spawn>();

  fireDelete(spawn: Spawn){
    console.log("Delete Fired in Detail Component");
    this.spawnDeleted.emit(spawn);
  }
}