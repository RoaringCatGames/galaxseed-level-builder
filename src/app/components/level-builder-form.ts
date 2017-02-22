import { Component, Input, Output, EventEmitter } from '@angular/core';

import { Level, Spawn } from '../models/level';

@Component({
  selector: 'glb-level-builder-form',  
  template: `    
    
    <form (ngSubmit)="doSubmit(fm.value)" #fm="ngForm">
      
      <fieldset>
        <legend>Core Properties</legend>
        <md-input id="time" name="time" type="text" 
                  value="0" ngModel class="fw"
                  placeholder="Spawn Time (Seconds)" required></md-input>      
            
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
        <md-input id="offPosX" class="fw" type="number" name="x" value="0.0" ngModel placeholder="Offset X" required></md-input>        
        <md-input id="offPosY" class="fw" type="number" name="y" value="0.0" ngModel placeholder="Offset Y" required></md-input>
      </fieldset>

      <fieldset ngModelGroup="velocity">
        <legend>Velocity</legend>        
        <md-input id="velocityX" class="fw" type="number" name="x" value="0.0" ngModel placeholder="Velocity X" required></md-input>        
        <md-input id="velocityY" class="fw" type="number" name="y" value="0.0" ngModel placeholder="Velocity Y" required></md-input>
      </fieldset>
      
      <button md-raised-button class="fw" [disabled]="fm.pristine || !fm.valid" type="submit">Add Spawn</button>

      
    </form>
    <div>
    {{fm.valid}}
    {{fm.value | json}}
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

  constructor(){
  }

  doSubmit(spawnData: Spawn){    
    this.spawnAdded.emit(spawnData);
  }

}