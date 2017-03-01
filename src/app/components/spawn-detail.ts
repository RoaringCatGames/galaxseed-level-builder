import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Spawn } from '../models/level';

@Component({
  selector: 'glb-spawn-detail',
  template:`
    <md-grid-list cols="8">    
      <md-grid-tile class="col">{{spawn.spawnTime}}</md-grid-tile >
      <md-grid-tile class="col">{{spawn.enemyType}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.shouldGeneratePowerUp}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.startPosition.x | json}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.midBezierPoint | json}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.endPoint | json}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.speed | json}}</md-grid-tile> 
      <md-grid-tile class="col"><button md-button (click)="fireDelete(spawn)">Del</button></md-grid-tile> 
    </md-grid-list>
  `
})
export class SpawnDetailComponent {
  @Input() spawn: Spawn;

  @Output() deleteFired: EventEmitter<Spawn> = new EventEmitter<Spawn>();

  fireDelete(spawn: Spawn){
    console.log("Delete Fired in Spawn Component");
    this.deleteFired.emit(spawn);
  }

}