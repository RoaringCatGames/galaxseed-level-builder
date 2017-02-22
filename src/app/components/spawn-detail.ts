import { Component, Input } from '@angular/core';

import { Spawn } from '../models/level';

@Component({
  selector: 'glb-spawn-detail',
  template:`
    <div>
      <span class="col">{{spawn.time}}</span>
      <span class="col">{{spawn.enemyType}}</span>
      <span class="col">{{spawn.offsetType}}</span>
      <span class="col">{{spawn.offsetPosition | json}}</span>
      <span class="col">{{spawn.velocity | json}}</span>
    </div>
  `
})
export class SpawnDetailComponent {
  @Input() spawn: Spawn;

}