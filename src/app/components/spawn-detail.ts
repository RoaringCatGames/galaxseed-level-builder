import { Component, Input } from '@angular/core';

import { Spawn } from '../models/level';

@Component({
  selector: 'glb-spawn-detail',
  template:`
    <md-grid-list cols="7">    
      <md-grid-tile class="col">{{spawn.spawnTime}}</md-grid-tile >
      <md-grid-tile class="col">{{spawn.enemyType}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.shouldGeneratePowerUp}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.startPosition | json}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.midBezierPoint | json}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.endPoint | json}}</md-grid-tile>
      <md-grid-tile class="col">{{spawn.speed | json}}</md-grid-tile>  
    </md-grid-list>
  `
})
export class SpawnDetailComponent {
  @Input() spawn: Spawn;

}