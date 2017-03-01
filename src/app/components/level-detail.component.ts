import { Component, Input } from '@angular/core';

import { Level } from '../models/level';

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
      <glb-spawn-detail *ngFor="let spawn of level?.spawns | sort:'time'" [spawn]="spawn"></glb-spawn-detail>      
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
}