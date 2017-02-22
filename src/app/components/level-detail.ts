import { Component, Input } from '@angular/core';

import { Level } from '../models/level';

@Component({
  selector: 'glb-level-detail',
  template: `
    <h1>{{level?.name}} - {{level?.id}}</h1>

    <glb-spawn-detail *ngFor="let spawn of level?.spawns | sort:'time'" [spawn]="spawn"></glb-spawn-detail>

  `
})
export class LevelDetailComponent {
  @Input() level: Level;
}