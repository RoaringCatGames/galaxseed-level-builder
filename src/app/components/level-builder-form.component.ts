import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter } from '@angular/core';

import { Level, Spawn } from '../models/level';

@Component({
  selector: 'glb-level-builder-form',  
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `    
    <form #lvlfm="ngForm" (ngSubmit)="saveLevel(lvlfm.value)">
      <md-card>
        <md-card-title>{{level.name}}</md-card-title>
        <md-card-subtitle>{{level.id}}</md-card-subtitle>        
        <md-card-content>
          <md-input-container>
            <input mdInput id="name" name="name" [ngModel]="level.name" placeholder="Level Name" >
          </md-input-container>
          <md-input-container>
            <input mdInput id="length" name="length" [ngModel]="level.length" placeholder="Length (Seconds)" >
          </md-input-container>    
        </md-card-content>
        <md-card-actions>
          <button md-raised-button type="submit">Save Level</button>      
        </md-card-actions>
      </md-card>
    </form>

    <form (ngSubmit)="doSubmit(fm.value)" #fm="ngForm">
      
      <fieldset>
        <legend>Core Properties</legend>
        <md-input-container>
          <input mdInput id="time" name="time" type="text" 
                  value="0" ngModel class="fw"
                  placeholder="Spawn Time (Seconds)" required>
        </md-input-container>      
            
        <md-select id="enemyType" class="fw" name="enemyType" ngModel placeholder="Enemy Type" required>
          <md-option value="ASTEROID_FRAG" selected>Frag</md-option>
          <md-option value="ASTEROID_A">Purple Asteroid (Large)</md-option>
          <md-option value="ASTEROID_B">Blue Asteroid (Med)</md-option>
          <md-option value="ASTEROID_C">Brown Asteroid (Small)</md-option>
          <md-option value="COMET">Comet</md-option>
        </md-select>
        

              
        <md-select id="offsetQuad" class="fw" name="offsetType" ngModel placeholder="Offset Type" required>
          <md-option value="QUAD_1" selected>QUAD 1 (Upper Right)</md-option>
          <md-option value="QUAD_2">QUAD 2 (Upper Left)</md-option>
          <md-option value="QUAD_3">QUAD 3 (Bottom Left)</md-option>
          <md-option value="QUAD_4">QUAD 4 (Bottom Right)</md-option>
          <md-option value="CENTER">Screen Center</md-option>
        </md-select> 
      </fieldset>     

      <fieldset ngModelGroup="offsetPosition">
        <legend>Starting Offset Position</legend>        
        <md-input-container>          
          <input mdInput id="offPosX" name="x" type="number" 
                  value="0.0" ngModel class="fw"
                  placeholder="Offset X" required>          
        </md-input-container>        
        <md-input-container>
          <input mdInput id="offPosY" name="y" type="number" 
                  value="0.0" ngModel class="fw"
                  placeholder="Offset Y" required>
        </md-input-container>
      </fieldset>

      <fieldset ngModelGroup="velocity">
        <legend>Velocity</legend>        
        <md-input-container>
          <input mdInput id="velocityX" name="x" type="number"
                  value="0.0" ngModel class="fw" 
                  placeholder="Velocity X" required>
        </md-input-container>        
        <md-input-container> 
          <input mdInput id="velocityY" name="y" type="number" 
                  value="0.0" ngModel class="fw" 
                  placeholder="Velocity Y" required>
        </md-input-container>
      </fieldset>
      
      <button md-raised-button class="fw" [disabled]="fm.pristine || !fm.valid" type="submit">Add Spawn</button>

      
    </form>
    <div>
    {{fm.valid}}
    {{fm.value | json}}
    {{level | json}}
    </div>
  `,
  styles:[
    `.fw{ 
      margin: 0.5em 0;
      width: 100%; 
    }`
  ]
})
export class LevelBuilderFormComponent{
  @Input() level: Level;

  @Output() spawnAdded:EventEmitter<Spawn> = new EventEmitter<Spawn>();
  @Output() levelSaved:EventEmitter<Level> = new EventEmitter<Level>();

  constructor(){
  }

  saveLevel(level: Level){
    console.log("Level Saving", level, Object.assign({}, this.level, level));

    this.levelSaved.emit(Object.assign({}, this.level, level));
  }
  doSubmit(spawnData: Spawn){    
    this.spawnAdded.emit(spawnData);
  }

}